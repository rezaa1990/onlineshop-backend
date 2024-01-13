const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('./controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/reza/Desktop/bootstrap-shop/src/images/panel-img') // مسیر ذخیره فایل آپلود شده
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // نام فایل آپلود شده
    console.log(file)
  }
})

const upload = multer({ storage: storage })

router.post('/addimage', 
upload.array('images'),//میدلور برای آپلود تصویر در مسیر مورد نظر(بالا)
controller.addImage
);


module.exports = router;
