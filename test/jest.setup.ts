import 'reflect-metadata';

// 전역 테스트 타임아웃 설정
jest.setTimeout(30000);

// 전역 모의(mock) 설정
beforeAll(() => {
  // 테스트 실행 전 전역 설정
});

afterAll(() => {
  // 테스트 실행 후 정리
});

// 각 테스트 전후 실행
beforeEach(() => {
  // 각 테스트 전 설정
});

afterEach(() => {
  // 각 테스트 후 정리
  jest.clearAllMocks();
});
