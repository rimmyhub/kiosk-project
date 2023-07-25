# kiosk 개인 프로젝트

## 작업 시작 전

깃 커밋 메세지 작성

1. .gitmessage 생성과 등록, 그리고 .gitignore를 생성합니다.

```zsh
source ./src/git_init
```

2. 패키지를 설치합니다.

```zsh
npm install
```

## 작업 설치 프로그램

1. npm Package 설치

```zsh
   npm init -y
   npm install express jsonwebtoken cookie-parser
```

2. 프리티어 설치 / 실행

```zsh
   npm i prettier -D
   npm run prettify
```

3. 노드몬 포트 설치 / 실행

```zsh
   npm i dotenv
   npm run start
```

4. 데이터 베이스 생성 / 삭제 / 맵핑

```zsh
   npx sequelize db:create
   npx sequelize db:drop
   npx sequelize db:migrate
```

## 지켜야할 점

- 에러처리는 컨트롤러에서 작성

## Rest API

| Content              | Method     | Path                                       |
| -------------------- | ---------- | ------------------------------------------ |
| 회원가입(고객)       | `[post]`   | '/signup/clients'                          |
| 회원가입(사장)       | `[post]`   | '/signup/owners'                           |
| 로그인(고객)         | `[post]`   | '/login/client'                            |
| 로그인(사장)         | `[post]`   | '/login/owner'                             |
| 개인정보 조회(사장)  | `[get]`    | '/mypage/owners'                           |
| 개인정보 수정(사장)  | `[put]`    | '/mypage/owners'                           |
| 비밀번호 수정(사장)  | `[put]`    | '/mypage/owners/password'                  |
| 개인정보 조회(고객)  | `[get]`    | '/mypage/clients'                          |
| 개인정보 수정(고객)  | `[put]`    | '/mypage/clients'                          |
| 비밀번호 수정(고객)  | `[put]`    | '/mypage/clients/password'                 |
| 메뉴 조회            | `[get]`    | '/restaurant/:restaurant_id/menu'          |
| 메뉴 등록            | `[post]`   | '/restaurant/:restaurant_id/menu'          |
| 메뉴 수정            | `[put]`    | '/restaurant/:restaurant_id/menu/:menu_id' |
| 메뉴 삭제            | `[delete]` | '/restaurant/:restaurant_id/menu/:menu_id' |
| 주문 하기            | `[post]`   | '/order'                                   |
| 주문 조회(고객/사장) | `[get]`    | '/order/:client_id'                        |
| 주문 받기(사장)      | `[patch]`  | 'order-receive/:order_id'                  |
| 음식점 전체 조회     | `[get]`    | '/restaurant'                              |
| 개별 음식점 조회     | `[get]`    | '/restaurant/:restaurant_id'               |
| 음식점 수정          | `[put]`    | '/restaurant/:restaurant_id'               |
| 음식점 삭제          | `[delete]` | '/restaurant/:restaurant_id'               |
| 리뷰 조회            | `[get]`    | '/review/:restaurant_id'                   |
| 리뷰 작성            | `[post]`   | '/review/:order_id'                        |
| 리뷰 수정            | `[put]`    | '/review/:order_id'                        |
| 리뷰 삭제            | `[delete]` | '/review/:order_id'                        |
