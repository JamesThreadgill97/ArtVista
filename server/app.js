const { Storage } = require("@google-cloud/storage")
const { format } = require("util")
const Multer = require("multer")
//use this to just type log instead of console.log
const { log } = require("console");

//I dont know what this does, I think it defines the max size an image is allowed to be
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // no larger than 25mb, change as needed.
  },
});

const express = require('express');
const cors = require('cors');

const userRouter = require('./routers/user');
const artRouter = require('./routers/art');
const commentRouter = require('./routers/comment');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());



//gets the cloud storage id so we can actually use it
const cloudStorage = new Storage({
  keyFilename: `${__dirname}/service_account_key.json`,
  projectId: "artvista-405109",
});

//gets the bucket from within the cloud which stores all of our images
const bucketName = "artvista-images";
const bucket = cloudStorage.bucket(bucketName);


//uploads a file + adds it to the database, needs adapting to use inputted details rather than hardcoded
app.post("/upload", multer.single("file"), function (req, res, next) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  //blob is a funny word
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on("error", (err) => {
    next(err);
  });
  blobStream.on("finish", async () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);



    //TODO: Move to appropriate place, fill with correct information
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,
        title: "Test Title",
        description: "Test Description",
        likes: 0,
        tag_id: 2,
        url: publicUrl
      }),
    };
    //posts to the database
    const response = await fetch("http://localhost:3000/art/", options)
    res.status(200).json({ publicUrl });
  });
  blobStream.end(req.file.buffer);
});


app.get('/', (req, res) => {
  res.send('This is the art API');
});

// Routes
app.use('/art', artRouter)
app.use('/users', userRouter);
app.use('/comment', commentRouter)

module.exports = app;
