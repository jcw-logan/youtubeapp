const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");


  let storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, "uploads/"); //파일 저장 위치 저장
        },
        filename: (req, file, cb) =>{
            cb(null, `${Date.now()}_${file.originalname}`);
        }, //파일 이름저장
        fileFilter : (req, file, cb) => { //파일 저장 형식 지정 mp4 만 가능하다.
            const ext = path.extname(file.originalname)
            if (ext !=='.mp4'){
                return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
            }
            ch(null, true)
        }
    });
    
    const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {

    // 비디오를 서버에 저장한다.
   upload(req, res, err => {
       if(err){
           return res.json({ success: false, err})
       }
       return res.json({ success:true, url: res.req.file.path, fileName : res.req.file.filename})
   })
})

module.exports = router;
