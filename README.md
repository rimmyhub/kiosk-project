# kiosk 개인 프로젝트

## 작업 시작 전

깃 커밋 메세지 작성

## 작업 설치 프로그램

1. .gitmessage 생성과 등록, 그리고 .gitignore를 생성합니다.

2. npm Package 설치

```zsh
   npm init -y
   npm install
   npm install express
   npm install jsonwebtoken
   npm install cookie-parser
```

3. 프리티어 설치 / 실행

```zsh
   npm i prettier -D
   npm run prettify
```

4. 노드몬 포트 설치 / 실행

```zsh
   npm i dotenv
   npm run start
```

5. env 설치

```zsh
npm install dotenv
```

6. 시퀄라이즈 라이브러리 설치

```zsh
npm install sequelize
npm install mysql2
npx sequelize init
```

7. 데이터 베이스 config 구조/ 생성 / 삭제 / 맵핑

```zsh
   npx sequelize init
   npx sequelize db:create
   npx sequelize db:drop
   npx sequelize db:migrate
   npx sequelize-cli
```

8. 비밀번호 해시화

```zsh
npm install bcrypt
```

9. SQLite

```zsh
npm install sqlite3
```

10. nodemailer

```zsh
npm install nodemailer
```

## 지켜야할 점

- 에러처리는 컨트롤러에서 작성

## Rest API

| Content        | Method     | Path                                         |
| -------------- | ---------- | -------------------------------------------- |
| 회원가입       | `[post]`   | '/signup/owners'                             |
| 로그인         | `[post]`   | '/login/owners'                              |
| 개인정보 조회  | `[get]`    | '/owners'                                    |
| 개인정보 수정  | `[put]`    | '/owners'                                    |
| 비밀번호 수정  | `[put]`    | '/owners/password'                           |
| 상품 전체 조회 | `[get]`    | '/items'                                     |
| 특정 상품 조회 | `[get]`    | '/items/:items'                              |
| 상품 등록      | `[post]`   | '/items'                                     |
| 상품 수정      | `[put]`    | '/items/:item_id'                            |
| 상품 삭제      | `[delete]` | '/items/:item_id'                            |
| 상품 발주 등록 | `[post]`   | '/items/:item_id/order-items'                |
| 상품 발주 수정 | `[put]`    | '/items/:item_id/order-items/:order_item_id' |
| 고객 주문 등록 | `[post]`   | '/order-customer'                            |
| 주문 상태 수정 | `[put]`    | '/order-customer/:order-customer_id'         |
| 옵션 등록      | `[post]`   | '/option'                                    |
| 옵션 수정      | `[put]`    | '/option/:option_id'                         |
