const express = require('express');
const FormData = require('form-data');
const bodyparser = require('body-parser');
const multer = require('multer');

const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;
const cors = require("cors");
const { default: axios } = require('axios');

app.use(cors());

app.use(express.json());
const apiKey = 'wxu6ecqyxia5ntwyu';
app.use(express.urlencoded({ extended: true }));
app.use("/image", express.static("image")); 
let imageName = ""; 
const storage = multer.diskStorage({
  destination: path.join("./image"),
  filename: function (req, file, cb) {
    imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
}).single("myImage");
app.post("/upload-image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(201)
      .json({ url: "./image/" + imageName }); 34
    }
  });
});



app.post('/enhance',(req, res) => {
const imageurl = req.body.image;
const formData = new FormData();

formData.append('sync', '1');
formData.append('image_file', fs.createReadStream(imageurl));
formData.append('type', 'face');
axios.post('https://techhk.aoscdn.com/api/tasks/visual/scale', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-API-KEY': apiKey
    }
  })
    .then(response => {
      res.send(JSON.stringify(response.data));
    })
    .catch(error => {
      console.error(error);
    });
    
})

app.post('/removal',(req, res)=>{
    const imageurl = req.body.image;
    const formData = new FormData();
    formData.append('sync', '1');
    formData.append('rectangles', JSON.stringify([{"x": 0,"y": 0,"width": 1000,"height": 1000}]));
    formData.append('image_file', fs.createReadStream(imageurl));
    axios.post('https://techhk.aoscdn.com/api/tasks/visual/inpaint', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'X-API-KEY': apiKey
    }
  })
    .then(response => {
      res.send(JSON.stringify(response.data));
    })
    .catch(error => {
      console.error(error);
    });
    


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})