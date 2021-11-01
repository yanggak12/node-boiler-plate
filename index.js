// 여기서 시작한다고 보면 된다.
// 먼저 기본적인 express를 만들어보자!

const express = require('express') // express module을 가져온다.
const app = express() // app을 만든다.
const port = 5000 // 5000번 포트 설정

app.get('/', (req, res) => {
    // 해당 포트 localhost에 Hello World! 를 표시한다.
  res.send('Hello World!') 
})

app.listen(port, () => {
    // 5000 포트에 잘 작동하면 콘솔 메시지.
  console.log(`Example app listening at http://localhost:${port}`)
})