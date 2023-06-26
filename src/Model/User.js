const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
      type: String,
      maxlength: 50,
    }, // 유저의 이름

    email: {
      type: String,
      trim: true, // 중간의 space를 없애줌
      unique: 1, // 같은 이메일을 쓰지 못하게 unique 추가
    }, // 유저의 이메일
    
    password: {
      type: String,
      minlength: 5,
    }, //유저의 비밀번호
    
    lastname: {
      type: String,
      maxlength: 50,
    }, //유저의 lastname
    
    role: {
      type: Number, // 1: admin 0: user
      default: 0,
    }, // 유저의 역할(관리자, 일반유저 ...)
    
    image: String,
    
    token: {
      type: String,
    }, // 유효성 관리
    
    tokenExp: {
      type: Number,
    }, // 토큰의 유효기간 
  });
  
  const User = mongoose.model("User", userSchema); //mongoose.model을 호출 할 때 Schema가 등록
  
  module.exports = { User };