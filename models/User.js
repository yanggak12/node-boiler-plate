const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userScheme = mongoose.Schema({
    name:{
        type:String,
        maxLength:50
    },
    email:{
        type:String,
        trim:true, // yoon sang@naver.com -> space 없애주는 역할
        unique:1
    },
    password:{
        type:String,
        maxLength:50
    },
    lastname:{
        type:String,
        maxLength:50
    },
    role:{
        type:Number,
        default: 0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
});

userScheme.pre('save',function(next){
    let user = this;
    if(user.isModified('password')){
    // 저장하기 전에 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt, function(err,hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
    }else{
        next();
    }
    
})

const User = mongoose.model('User',userScheme);

module.exports = {User};