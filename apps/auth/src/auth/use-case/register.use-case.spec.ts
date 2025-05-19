import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../user/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { RegisterUseCase } from './register.use-case';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;

  const mockUserRepository = {
    findByUsername: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const registerDto: RegisterDto = {
      username: 'testuser',
      password: 'password123',
    };

    const mockCreatedUser = {
      _id: 'user123',
      username: 'testuser',
      password: 'hashedPassword',
      role: 'USER',
      toObject: () => ({
        _id: 'user123',
        username: 'testuser',
        password: 'hashedPassword',
        role: 'USER',
      }),
    };

    it('[success] 새로운 사용자 등록 성공', async () => {
      // Arrange
      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockCreatedUser);

      // Act
      const result = await useCase.execute(registerDto);

      // Assert
      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith(registerDto.username);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        username: registerDto.username,
        password: expect.any(String),
        role: 'USER',
      });
      expect(result).toEqual({
        _id: 'user123',
        username: 'testuser',
        role: 'USER',
      });
    });

    it('[error] 이미 존재하는 사용자명인 경우, ConflictException 발생', async () => {
      // Arrange
      mockUserRepository.findByUsername.mockResolvedValue(mockCreatedUser);

      // Act & Assert
      await expect(useCase.execute(registerDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('[success] 비밀번호가 해시되어 저장되는지 확인', async () => {
      // Arrange
      mockUserRepository.findByUsername.mockResolvedValue(null);
      mockUserRepository.create.mockImplementation(user =>
        Promise.resolve({
          ...user,
          toObject: () => ({
            _id: 'user123',
            username: user.username,
            password: user.password,
            role: 'USER',
          }),
        }),
      );

      // Act
      await useCase.execute(registerDto);

      // Assert
      const createCall = mockUserRepository.create.mock.calls[0][0];
      expect(createCall.password).not.toBe(registerDto.password);
      expect(createCall.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt 해시 패턴
    });
  });
});
