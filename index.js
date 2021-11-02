const express = require('express') 
const app = express() 
const port = 5000 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {User} = require('./models/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json
app.use(cookieParser()); // cookie parser for storing jwt.

const mongoose = require('mongoose');
mongoose
.connect(config.mongoURI)
.then(()=>console.log("MongoDB Connected..."))
.catch((err)=>console.log(err));

app.get('/', (req, res) => {
    // 해당 포트 localhost에 Hello World! 를 표시한다.
  res.send('Happy Hacking!!') 
})

app.post('/register', (req, res)=>{
  // 회원가입 메소드 추가
  // 회원가입 할때 필요한 정보들을 클라이언트에서 가져오면 그것들을 DB에 넣어준다.
  const user = new User(req.body);
  user.save((err,doc)=>{
    if(err) return res.json({success:false, err});
    return res.status(200).json({success:true});
  })
})

app.post('/login', (req,res)=>{
  // 요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({email: req.body.email}, (err, user)=>{
    if(!user) return res.json({loginSuccess: false, message: '제공된 이메일에 해당하는 유저가 없습니다.'});
    // 그 이후에 비밀번호가 일치하는지 확인한다.
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch) return res.json({loginSuccess: false, message: '비밀번호가 일치하지 않습니다.'});
      // 비밀번호까지 일치하면 토큰 생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        // 토큰을 저장한다. (쿠키, 로컬스토리지, 세션 등등) 일단 이번엔 쿠키에 한다~
        res
        .cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess:true, userId: user._id});
      })
    })
  })
  
  
  
})

app.listen(port, () => {
    // 5000 포트에 잘 작동하면 콘솔 메시지.
  console.log(`Example app listening at http://localhost:${port}`)
})


