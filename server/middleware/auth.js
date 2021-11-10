const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;
  // 토큰 decode 후 유저를 찾는다.
  User.findByToken(token, function (err, user) {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next(); // middle ware에서 다음으로 갈 수 있게!
  });
};

module.exports = { auth };
