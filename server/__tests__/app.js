const { log } = require("console");
const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const artRouter = require('./routers/art');
const commentRouter = require('./routers/comment');
const tagRouter = require('./routers/tag')
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('This is the art API');
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Routes
app.use('/art', artRouter);
app.use('/users', userRouter);
app.use('/comment', commentRouter);
app.use('/tag', tagRouter);

module.exports = app;
