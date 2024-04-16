require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const videosRouter=require('./routes/videos');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use("/videos", videosRouter)
app.use(express.static('public'));
app.use(express.json());

app.get('/', (_res,res) => {
    res.json('welcome to my API')
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`)
})
