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

  console.log(videosData)
    res.status(200).json({videosSmallData})
})
    
router.get('/:vidoId', (req, res) => {
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));
  console.log(videosData)
    const {videoId} = req.params.id;
    const featureVideo = videosData.find(video => video.id === videoId);
    if (!featureVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(featureVideo);
  })
  
router.post('/', (req, res) => {
  const newVideoData=req.body;
  console.log('Req.body: ', req.body);
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));

  const newVideoObj = {
    id: uuid(),
    channel:"Guest Channel",
    image:"http://localhost:8080/images/img9.jpg",
    ...newVideoData
  }

  videosData.unshift(newVideoObj);
  videosData.push(newVideoObj);
  
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videosData));
  res.status(201).json(newVideoObj);
  });

module.exports= router;
