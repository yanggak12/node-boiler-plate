const mongoose = require('mongoose');

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
})

const User = mongoose.model('User',userScheme);

module.exports = {User};