const express=require("express");
const router= express.Router();
const { v4: uuid } = require('uuid');
const VIDEOS_PATH='./data/videos.json';
const fs=require('fs')
  
router.get("/", (req,res)=>{
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));

  const videosSmallData = videosData.map(video => {
    return{
      id:video.id,
      title:video.title,
      channel:video.channel,
      image:video.image
    }
  })
    res.json(200).json({videosSmallData})
})
    
router.get('/id', (req, res) => {
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));
    const {id} = req.params.id;
    const featureVideo = videosData.find(video => video.id === id);
    if (!featureVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.send(200).json(featureVideo);
  })
  
router.post('/', (req, res) => {
  const newVideoData=req.body;
  console.log('Req.body: ', req.body);
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));

  const newVideoObj = {
    id: uuid(),
    Channel:"Guest Channel",
    image:"http://localhost:8080/images/img9.jpg",
    ...newVideoData
  }

  console.log(newVideoObj)

  videosData.unshift(newVideoObj);
  videosData.push(newVideoObj);
  
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videosData));
  res.status(201).json(newVideoObj);
  });
module.exports= router;
