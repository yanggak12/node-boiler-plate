const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userScheme = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, // yoon sang@naver.com -> space 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    maxLength: 100,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userScheme.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    // 저장하기 전에 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userScheme.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword가 1234567 이라고 가정하고
  // DB에 암호화된 비밀번호가 ~~~ 있다고 칠때,
  // plainPassword도 암호화해서 DB에 저장된 비밀번호와 비교한다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userScheme.methods.generateToken = function (callback) {
  var user = this;
  // jwt token 생성
  console.log(user);
  var token = jwt.sign(user._id.toHexString(), "secretToken"); // 시크릿 키 더한 후 암호화
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userScheme.statics.findByToken = function (token, callback) {
  var user = this;
  // jwt decode
  jwt.verify(token, "secretToken", function (err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인한다.
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model("User", userScheme);

module.exports = { User };
