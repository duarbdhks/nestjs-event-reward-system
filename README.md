# 이벤트 / 보상 관리 플랫폼

## 📌 개요

이 프로젝트는 운영자/관리자가 손쉽게 이벤트를 생성하고, 유저는 조건을 만족했을 때 직접 보상을 요청할 수 있는 **이벤트 / 보상 관리 시스템**입니다.  
실무에서 사용 가능한 구조와 보안, 역할 구분 등을 고려한 **NestJS 기반 MSA 구조**로 설계되었습니다.

---

## 🧱 아키텍처 구성

### 아키텍처 설명

* 모노레포를 이용한 MSA 구조
* UseCase 패턴을 적용하여 SRP (단일 책임 원칙) 준수 및 유지보수, 테스트 용이성 증가

### 서비스 구조 (MSA 기반)

<details>
<summary>Mermaid 코드 보기</summary> 

```mermaid
flowchart TD
    subgraph Client
        A[사용자 / API Tester]
    end

    subgraph Gateway Server
        B[Gateway<br>- NestJS 10.4.17<br>Node.js 18.20.8<br>- 인증<br>- 권한 검사<br>- 라우팅]
    end

    subgraph Auth Server
        C[Auth<br>NestJS 10.4.17<br>Node.js 18.20.8<br>- 로그인/회원가입<br>- 역할 관리<br>- JWT 발급]
    end

    subgraph Event Server
        D[Event<br>NestJS 10.4.17<br>Node.js 18.20.8<br>- 이벤트/보상 관리<br>- 조건 검증<br>- 요청 처리]
    end

    subgraph Database
        E[(MongoDB)]
    end

    A --> B
    B --> C
    B --> D
    C --> E
    D --> E
```

</details>

* **Gateway Server**

    * API 진입점
    * JWT 인증 및 역할(Role) 검사
    * 요청 라우팅 처리

* **Auth Server**

    * 유저 등록/로그인
    * JWT 발급 및 검증
    * 역할 관리: `USER`, `OPERATOR`, `AUDITOR`, `ADMIN`

* **Event Server**

    * 이벤트/보상 등록 및 조회
    * 유저 보상 요청 처리
    * 보상 지급 상태 저장 및 이력 관리

### 프로젝트 구조

```
nestjs-event-reward-system/
├── apps/
│   ├── gateway/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── routes/
│   │   │       └── proxy.module.ts
│   │   ├── tsconfig.app.json
│   │   └── Dockerfile
│   │
│   ├── auth/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── use-case
│   │   │   │   │   ├── login.use-case.ts
│   │   │   │   │   ├── register.use-case.ts
│   │   │   │   │   └── user-profile.use-case.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── user/
│   │   │   │   ├── user.module.ts
│   │   │       ├── user.entity.ts
│   │   │       └── user.repository.ts
│   │   ├── tsconfig.app.json
│   │   └── Dockerfile
│   │
│   └── event/
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── event/
│       │   │   ├── event.module.ts
│   │   │   │   ├── use-case
│   │   │   │   │   ├── create-event.use-case.ts
│   │   │   │   │   ├── find-event.use-case.ts
│   │   │   │   │   └── find-events.use-case.ts
│       │   │   ├── event.entity.ts
│       │   │   ├── event.repository.ts
│       │   │   ├── event.controller.ts
│       │   ├── reward/
│       │   │   ├── reward.module.ts
│       │   │   ├── reward.entity.ts
│       │   │   ├── reward.repository.ts
│       │   │   ├── reward.controller.ts
│       │   └── reward-request/
│       │   │   ├── reward-request.module.ts
│       │       ├── reward-request.entity.ts
│       │       ├── reward-request.repository.ts
│       │       ├── reward-request.controller.ts
│   │   ├── tsconfig.app.json
│       └── Dockerfile
│
├── libs/
│   ├── common/
│   │   ├── decorator/
│   │   ├── dto/
│   │   ├── filter/
│   │   ├── guard/
│   │   ├── interceptor/
│   │   └── util/
│   └── tsconfig.app.json
│
├── docker-compose.yml
├── .env
├── README.md
└── tsconfig.json
```

### 구조 설명

* **apps/**: MSA 구조의 각 서비스 (gateway, auth, event)를 포함
* **libs/common/**: NestJS 에서 공유 가능한 데코레이터, 필터, 가드, 유틸 등의 공용 모듈 집합
* **docker-compose.yml**: 전체 서비스 통합 실행
* **.env**: 공통 환경 변수 파일

### 확장 고려 포인트

* `libs/shared-db/` 디렉터리로 공통 DB 연결 모듈을 만들 수 있음
* `@nestjs/config`을 통한 환경 설정 관리 권장
* 향후 Redis, Kafka 등 인프라 모듈을 `infra/`로 분리해 구성 가능

---

## 🧩 DB 스키마 (MongoDB)

<details>
<summary>Mermaid 코드 보기</summary> 

```mermaid
erDiagram
    USER ||--o{ REWARD_REQUEST: makes
    USER ||--o{ EVENT: creates
    EVENT ||--o{ REWARD: includes
    EVENT ||--o{ REWARD_REQUEST: allows

    USER {
        string _id PK
        string username
        string password
        string role
    }

    EVENT {
        string _id PK
        string title
        string description
        string condition
        date start
        date end
        boolean isActive
        string createdBy FK
    }

    REWARD {
        string _id PK
        string eventId FK
        string type
        string description
        number amount
    }

    REWARD_REQUEST {
        string _id PK
        string userId FK
        string eventId FK
        string status
        date requestedAt
        date resolvedAt
        string resultMessage
    }
```

</details>

### User (Auth Server)

````
{
  _id: ObjectId,
  username: string,
  password: string(hashed),
  role: 'USER' | 'OPERATOR' | 'AUDITOR' | 'ADMIN'
}
````

### Event (Event Server)

```
{
  _id: ObjectId,
  title : string,
  description : string,
  condition : string, // e.g., 'login_3_days'
  duration : {
    start: Date,
    end: Date
  },
  isActive: boolean,
  createdBy: ObjectId(User)
}
```

### Reward

```
{
  _id: ObjectId,
  eventId: ObjectId(Event),
  type: 'POINT' | 'ITEM' | 'COUPON',
  description: string,
  amount: number
}
```

### RewardRequest

```
{
  _id: ObjectId,
  userId: ObjectId(User),
  eventId: ObjectId(Event),
  status: 'PENDING' | 'GRANTED' | 'REJECTED',
  requestedAt: Date,
  resolvedAt?: Date,
  resultMessage?: string
}
```

---

## 📡 REST API 명세

### 공통 사항

* 인증: JWT (`Authorization: Bearer <token>`)
* 응답 형식: `application/json`

### Auth Server

| 메서드  | 경로               | 설명                     |
|------|------------------|------------------------|
| POST | `/auth/register` | 회원가입 (JWT 필요X)         |
| POST | `/auth/login`    | 로그인 및 JWT 발급 (JWT 필요X) |
| GET  | `/auth/profile`  | 로그인 유저 정보 조회           |

---

### Event Server

#### \[이벤트]

| 메서드  | 경로            | 설명        | 권한                  |
|------|---------------|-----------|---------------------|
| POST | `/events`     | 이벤트 생성    | `OPERATOR`, `ADMIN` |
| GET  | `/events`     | 전체 이벤트 조회 | 전체                  |
| GET  | `/events/:id` | 이벤트 상세 조회 | 전체                  |

#### \[보상]

| 메서드  | 경로                     | 설명         | 권한                  |
|------|------------------------|------------|---------------------|
| POST | `/rewards`             | 보상 등록      | `OPERATOR`, `ADMIN` |
| GET  | `/rewards?eventId=xxx` | 이벤트별 보상 조회 | 전체                  |

#### \[보상 요청]

| 메서드  | 경로                     | 설명          | 권한                             |
|------|------------------------|-------------|--------------------------------|
| POST | `/rewards/request`     | 보상 요청       | `USER`                         |
| GET  | `/rewards/request`     | 본인 요청 이력 조회 | `USER`                         |
| GET  | `/rewards/request/all` | 전체 요청 이력 조회 | `AUDITOR`, `OPERATOR`, `ADMIN` |

---

## 🐳 실행 방법 (Docker Compose)

### 저장소 복제 및 서비스 실행

```bash
# 1. 저장소 클론
$ git clone git@github.com:duarbdhks/nestjs-event-reward-system.git
$ cd nestjs-event-reward-system

# 2. 로컬 실행 (development)
$ npm run start:dev
```

### Docker Compose 실행

```bash
# 2. Docker Compose 실행
$ docker-compose up --build
```

각 서버는 다음 포트를 사용합니다:

* Gateway: `3000`
* Auth: `3001`
* Event: `3002`

---

## ✍️ 설계 의도 및 보완점

* 역할 기반 인증은 **NestJS의 Guard**를 통해 구현
* 이벤트 조건은 문자열로 관리하며, 나중에 DSL 파서나 엔진 도입 여지 고려
* MSA 간 인증은 내부 Secret 기반의 JWT 공유 구조로 처리 가능
* 향후 Redis, Kafka 등으로 결합도를 낮추고, 비동기 처리 고려

---

## 🧪 테스트 (선택 사항)

* Jest 기반 단위 테스트 파일 일부 포함 (`*.spec.ts`)
* 서비스 간 분리된 테스트 케이스 작성 권장

---

## 📝 백로그

* **1. 이벤트 조건은 어떻게 처리하나요?**
    * A. 문자열 조건 기반의 하드코딩 검증이며, 향후 룰 엔진 연동을 고려
* **2. 서비스 별 버전관리는 어떻게 하나요?**
    * A. 사실 각 서비스 별 package.json 버전 관리가 필요하며, monorepo 구조에서 각 서비스의 버전을 관리하는 방법을 고려해야 함
    * 예를 들어, Lerna 또는 Nx와 같은 도구를 사용하여 monorepo 에서 각 서비스의 버전을 관리할 수 있음.
