const express=require("express");
const router= express.Router();
const { v4: uuid } = require('uuid');
const VIDEOS_PATH= "../data/data.jason";
const fs=require('fs')

const readVideos = () => {
    const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));
    return videosData;
  }

route.get('/videos/:id', (req, res) => {
    const id = req.params.id;
    const video = videos.find(video => video.id === id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.send(video);
  })
  
router.get("/", (req,res)=>{
res.send(videos)
})

// POST /albums/
router.post('/', (req, res) => {
    // JSON data sent in the request body is available through req.body
    console.log('Req.body: ', req.body);
  
    // Read current albums
    const videosData = readVideos();
  
    // Create a new album object
    const newVideoObj = {
      id: uuid(),
      title: req.body.title,
      xxxx: req.body.artist,
      image: req.body.image
    }
  
    // Push to albums array
    albumsData.unshift(newVideobj);
  
    // Update my JSON with new array
    fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videosData));
  
    res.status(201).json(newVideoObj);
  });
module.exports= router;
