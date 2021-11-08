# Boiler Plate

# Node

```
    - express
    - mongoose
    - body-parser
    - bcrypt
    - cookie-parser
    - jsonwebtoken
```

---

## 회원가입

- 스키마 : 해당 컬렉션에 어떤 종류의 값들이 들어가는지 정의
- 모델 : 스키마를 통해 만드는 인스턴스

- POST 메소드로 DB에 회원 정보를 저장함.
  <img width="500" alt="스크린샷 2021-11-02 오전 1 32 25" src="https://user-images.githubusercontent.com/46489446/139707619-8ee7fc3b-2455-4587-a071-8051d6d66804.png">

## 로그인

- 이메일, 비밀번호를 요청받음
- 요청받은 이메일이 일치하면 비밀번호 일치하는지 확인
- 모두 일치하면 jwt 생성 후 쿠키에 저장
  <img width="500" alt="스크린샷 2021-11-02 오후 9 27 18" src="https://user-images.githubusercontent.com/46489446/139846076-b0bb548b-a0fc-49b9-b5d1-5f373f78c768.png">

## 인증

- 쿠키에 있는 토큰을 복호화해서 DB에 있는 id와 동일한지 비교.
- Authentication 과정을 별도 미들웨어로 작업
- 미들웨어 Auth가 완료되지 않으면 다음으로 넘어가지 못함.
- 완료 시 이후 작업 가능

## 로그아웃

- 로그아웃을 하면 인증이 되지 않아야함.
- DB에 저장된 토큰값을 제거한다.
  <img width="500" alt="스크린샷 2021-11-03 오전 2 08 02" src="https://user-images.githubusercontent.com/46489446/139912422-cd56939e-e9aa-4fac-ab22-871c9895df51.png">

---

# React

```
    - create-react-app
    - react-router-dom
    - axios
    - http-proxy-middleware
```

## creact-react-app

- Babel : 자바스크립트 문법이 호환되지 않아도 브라우저에 맞게 변환시켜준다.
- Webpack : 복잡한 여러 확장자를 가진 여러 모듈들을 하나로 모아 번들링한다. (src 디렉토리 내부에만)

## react-router-dom

- 여러 페이지를 연결시킨다.
- SPA

## axios

- 백엔드 서버와의 통신을 위한 라이브러리
- fetch보다 많은 기능 제공(비교적 무거울 수 있다.)

## proxy

- 아이피를 Proxy 서버에서 임의로 바꿀수 있어 접근하는 사람의 IP를 알 수 없다.
- 보내는 데이터도 임의로 바꿀 수 있다.
- 방화벽 기능, 웹 필터 기능, 캐시 데이터 기능, 공유 데이터 제공 기능

- 사용 사례

1. 인터넷 사용 제어
2. 캐시를 이용하여 end지점까지 도달하지 않아도 되므로 빠른 인터넷 제공
3. 더 나은 보안
4. 이용 제한된 사이트 접근 가능
