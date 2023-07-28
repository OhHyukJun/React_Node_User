const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
  
 
  userSchema.pre("save", async function (next) {
    let user = this; 
    if (user.isModified("password")) {
      try {
        // 비밀번호를 암호화한다.
        const salt = await bcrypt.genSalt(saltRounds);
        //salt를 생성하기 위한 코드
        const hash = await bcrypt.hash(user.password, salt);
        //salt가 생성되면 hash를 사용
        user.password = hash;
        //비밀번호 암호화
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });

  userSchema.methods.generateToken = async function(){
    const user = this; //로그인을 하면
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    //id를 toHexString으로 암호화하여 토큰 발급
    user.token = token;

    try {
      await user.save(); 
      return token; //토큰을 db에 저장 
    }catch (err){
      throw err;
    }
  };
  
  const User = mongoose.model("User", userSchema); //mongoose.model을 호출 할 때 Schema가 등록
  
  module.exports = { User };