const express = require('express');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

const timestamp = require('time-stamp')

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`)
  next();
};

server.use(logger);
server.use(helmet());
server.use(express.json());

server.use('/users', userRouter);
server.use('/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server; 