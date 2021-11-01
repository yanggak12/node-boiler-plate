const express = require('express') 
const app = express() 
const port = 5000 

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

app.listen(port, () => {
    // 5000 포트에 잘 작동하면 콘솔 메시지.
  console.log(`Example app listening at http://localhost:${port}`)
})


