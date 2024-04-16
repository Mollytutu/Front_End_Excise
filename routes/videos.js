const express=require("express");
const router= express.Router();
const { v4: uuid } = require('uuid');
const VIDEOS_PATH='./data/videos.json';
const fs=require('fs');
  
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
    res.status(200).json({videosSmallData})
})
    
router.get('/:videoId', (req, res) => {
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));
  console.log(videosData)
    const {videoId} = req.params;
    const featureVideo = videosData.find(video => video.id === videoId);
    if (!featureVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(featureVideo);
  })
  
router.post('/', (req, res) => {
  const videosData = JSON.parse(fs.readFileSync(VIDEOS_PATH));
  const newVideoData=req.body;
  console.log(req.body);
  const newVideoObj = {
    id: uuid(),
    channel:"Guest Channel",
    image:"http://localhost:8080/images/img9.jpg",
    view:1,
    title: 'Default Title',
    description:'What is the default comment',
    likes:1,
    duration :'4:00',
    video:"https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timeStamp:new Date(),
    comments:[
      {
        "id": "ade82e25-6c87-4403-ba35-47bdff93a51c",
        "name": "Maria Aziz",
        "comment": "Your travel diaries are like a passport to wanderlust! Each city comes alive through your lens, making me feel like I'm right there with you. Your storytelling captures the essence of these enchanting places, igniting a desire to explore Europe even more. Can't wait for the next adventure!",
        "likes": 0,
        "timestamp": 1690348662000
      },
      {
        "id": "bf704c76-cba9-462e-ac0a-166315df756c",
        "name": "Taylor Nkoshi",
        "comment": "Your videos are a true escape for the soul. Watching this feels like taking a scenic stroll through the charming streets of Europe. Thank you for bringing the magic of travel to our screens!",
        "likes": 0,
        "timestamp": 1690262262000
      },
      {
        "id": "ec2bec8d-ea2b-458e-9d93-b7f929a8659b",
        "name": "Adnan Al-Farsi",
        "comment": "I appreciate the attention to detail and the way you immerse us in the local culture. Each video is an invitation to dream and plan our own adventures. Keep inspiring us with your incredible travel diaries!",
        "likes": 0,
        "timestamp": 1690175862000
      }
    ],
    ...newVideoData
  }

  videosData.push(newVideoObj);
  
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videosData));
  res.status(201).json(newVideoObj);
  });

module.exports= router;
