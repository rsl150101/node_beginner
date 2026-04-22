# Node Beginner Project 🚀

이 프로젝트는 Node.js와 Express, MongoDB를 활용하여 구현된 간단한 게시판 및 댓글 시스템 API 서버입니다. 입문자를 위한 기본적인 CRUD 로직과 데이터베이스 연동 구조를 학습하기 위해 설계되었습니다.

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose ODM)
- **Language**: JavaScript (ES6+)

## 📂 Project Structure

```text
node_beginner/
├── controller/        # 비즈니스 로직 및 API 핸들러
│   ├── commentController.js
│   └── postController.js
├── routers/           # API 경로 정의
│   ├── commentRouter.js
│   └── postRouter.js
├── schemas/           # MongoDB 스키마 및 연결 설정
│   ├── index.js       # DB 연결 설정
│   ├── Comment.js     # 댓글 모델
│   └── Post.js        # 게시글 모델
├── app.js             # 애플리케이션 엔트리 포인트
├── .gitignore         # Git 제외 파일 목록
├── package.json       # 프로젝트 의존성 및 스크립트
└── README.md          # 프로젝트 문서
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```

2. 서버를 실행합니다.
   ```bash
   node app.js
   ```

3. 서버가 성공적으로 실행되면 아래 URL에서 접근 가능합니다.
   - `http://localhost:3000`

## 📡 API Endpoints

### Posts (게시글)
- `GET /posts`: 전체 게시글 목록 조회
- `GET /posts/:_postId`: 특정 게시글 상세 조회
- `POST /posts`: 게시글 작성
- `PUT /posts/:_postId`: 게시글 수정 (비밀번호 확인 필요)
- `DELETE /posts/:_postId`: 게시글 삭제 (비밀번호 확인 필요)

### Comments (댓글)
- `GET /comments/:_postId`: 특정 게시글의 댓글 목록 조회
- `POST /comments/:_postId`: 댓글 작성
- `PUT /comments/:_commentId`: 댓글 수정 (비밀번호 확인 필요)
- `DELETE /comments/:_commentId`: 댓글 삭제 (비밀번호 확인 필요)

