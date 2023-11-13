const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/users');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is the art API');
});

// Routes

app.use('/users', userRouter);

module.exports = app;
