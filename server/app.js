const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/users');
const artRouter = require('./routers/art');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is the art API');
});

// Routes
app.use('/art', artRouter)
app.use('/users', userRouter);

module.exports = app;
