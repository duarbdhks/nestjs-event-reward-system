import { LoginDto } from '@auth/auth/dto/login.dto';
import { User } from '@auth/user/user.entity';
import { UserRepository } from '@auth/user/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.use-case';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepository: UserRepository;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    _id: 'user-id',
    username: 'testuser',
    password: 'hashedPassword',
    role: 'user',
  } as User;

  const mockLoginDto: LoginDto = {
    username: 'testuser',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: UserRepository,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return access token when credentials are valid', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'jwt.secret') return 'test-secret';
        if (key === 'jwt.expiresIn') return '1h';
        return null;
      });
      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');

      // Act
      const result = await useCase.execute(mockLoginDto);

      // Assert
      expect(result).toEqual({ access_token: 'test-token' });
      expect(userRepository.findByUsername).toHaveBeenCalledWith(mockLoginDto.username);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { username: mockUser.username, sub: mockUser._id, role: mockUser.role },
        { secret: 'test-secret', expiresIn: '1h' },
      );
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      await expect(useCase.execute(mockLoginDto)).rejects.toThrow('Invalid credentials');
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findByUsername').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(useCase.execute(mockLoginDto)).rejects.toThrow(UnauthorizedException);
      await expect(useCase.execute(mockLoginDto)).rejects.toThrow('Invalid credentials');
    });
  });
});
