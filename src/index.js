const express = require('express');
const app = express();
const port = 4000;
const { User } = require('./Model/User');
//user 모델 불러오기

const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//더이상 body-parser는 사용하지 않기때문에 이걸 추가해야함
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://OhHyukJun:kmh7277@cluster1.ehjoif1.mongodb.net/myFirstDatabase", {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connect ERROR', err)
    });

    mongoose.connection.addListener('disconnected', () => {
      console.log('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다.');
    });
  } catch (err) {
    console.log(err);
  }
}
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
