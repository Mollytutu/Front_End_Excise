require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const idRouter = require('./routes/id')
const videosRouter=require('./routes/videos')
const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ origin: CLIENT_URL }));


app.use("/videos/:id", idRouter);
app.use("/videos", videosRouter)

app.use(express.static('static-assets'));

// Custom middleware to require an api_key for endpoints below
app.use((req, res, next) => {
  if (req.query.api_key !== '') {
    return res.status(401).send('Please provide an api_key as a query parameter');
  }
  next();
});

app.use(express.json());
  

app.get('/', (_res,res) => {
    res.send('welcome to my API')
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`)
})
