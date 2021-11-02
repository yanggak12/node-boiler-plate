# Boiler Plate 
## Node
```
    - express
    - mongoose
    - body-parser
    - bcrypt
    - cookie-parser
    - jsonwebtoken
```
-----
## 회원가입
- 스키마 : 해당 컬렉션에 어떤 종류의 값들이 들어가는지 정의
- 모델 : 스키마를 통해 만드는 인스턴스

- POST 메소드로 DB에 회원 정보를 저장함.
<img width="500" alt="스크린샷 2021-11-02 오전 1 32 25" src="https://user-images.githubusercontent.com/46489446/139707619-8ee7fc3b-2455-4587-a071-8051d6d66804.png">

## 로그인
- 이메일, 비밀번호를 요청받음
- 요청받은 이메일이 일치하면 비밀번호 일치하는지 확인
- 모두 일치하면 jwt 생성 후 쿠키에 저장
