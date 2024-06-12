

const express = require('express');
const app = express();
const path = require("path");
const bodypaser = require("body-parser");


app.use(bodypaser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userRouter = require('./Routes/User');

app.use('/user', userRouter);

module.exports = app;