const express = require('express');
const app = express();
const port = 4000;
const { User } = require('./Model/User');
//user 모델 불러오기
const config = require("./config/key");
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
    
  } catch(err){
    
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
