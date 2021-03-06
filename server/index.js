const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const config = require("./config/key");
const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser()); // cookie parser for storing jwt.

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // 해당 포트 localhost에 Hello World! 를 표시한다.
  res.send("Happy Hacking!!");
});

app.post("/api/user/register", (req, res) => {
  // 회원가입 메소드 추가
  // 회원가입 할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/user/login", (req, res) => {
  // 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    // 그 이후에 비밀번호가 일치하는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });
      // 비밀번호까지 일치하면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장한다. (쿠키, 로컬스토리지, 세션 등등) 일단 이번엔 쿠키에 한다~
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/user/auth", auth, (req, res) => {
  // auth는 middleware
  // 이 아래까지 실행된다는 뜻은 authentication이 true라는 뜻!
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role 1 이면 admin
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  // 로그아웃 하려는 유저를 DB에서 찾아서 그 유저의 토큰을 쿠키에서 지워준다.
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.get("/api/hello", (req, res) => {
  res.send("response OK Hello World !! ");
});

const port = 5000;

app.listen(port, () => {
  // 5000 포트에 잘 작동하면 콘솔 메시지.
  console.log(`Example app listening at http://localhost:${port}`);
});
