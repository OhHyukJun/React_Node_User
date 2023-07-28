const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");
const { User } = require('./Model/User');
//user 모델 불러오기
const config = require("./config/key");
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
//더이상 body-parser는 사용하지 않기때문에 이걸 추가해야함
const connect = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err);
  }
};

connect();

app.get('/', (req,res) => {
  res.status(200).json({ success: true, message: "Welcome to the registration page" });
})

app.post('/api/users/register', async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save(); 

    return res.status(200).json({ success: true });
  } catch(err){
    return res.json({ success: false, err });
  }
})

app.post('api/users/login', async (req,res) => {
  try{
    const user = new User.findOne({email: req.body.email});
    
    if(!user){
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 이메일입니다.",
        });
      }
      
      const isMatch = await user.comparePassword(req.body.password);

      if(!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다",
        });
      }

      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);

        res.cookie("x_auth",user.token).status(200).json({
          loginSuccess:true,
          userId: user._id,
        });
      })
  } catch(err){
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
