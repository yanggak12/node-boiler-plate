if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); // 배포하면
}else{
    module.exports = require('./dev'); // 개발단계
}