const express = require('express') 
const app = express() 
const port = 5000 
const bodyParser = require('body-parser');
const {User} = require('./models/User');

app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://yys:4532@ys.gkhum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose
.connect(mongoURL)
.then(()=>console.log("MongoDB Connected..."))
.catch((err)=>console.log(err));

app.get('/', (req, res) => {
    // 해당 포트 localhost에 Hello World! 를 표시한다.
  res.send('Hello World!') 
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

app.listen(port, () => {
    // 5000 포트에 잘 작동하면 콘솔 메시지.
  console.log(`Example app listening at http://localhost:${port}`)
})


