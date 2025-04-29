const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userRouter = require('./Routes/User');
const donorRouter = require('./Routes/Donor');
const bloodBankRouter = require('./Routes/BloodBank');
const AuthRouter = require('./Routes/Auth');

app.use('/auth', AuthRouter);
app.use('/bank', bloodBankRouter);
app.use('/user', userRouter);
app.use('/u/donor', donorRouter);
app.use('/u/blood-bank', bloodBankRouter);

module.exports = app;