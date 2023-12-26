const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { header } = require("express-validator");
const fs = require('fs');
const multer = require('multer');

module.exports = new (class extends controller {
  async addImage(req, res) {
    console.log("100",req.body,req.body.data,req.body.image1);
    if (!req.formData) {
      return res.status(400).json({ error: 'هیچ فایلی ارسال نشده است.' });
    }
    // تعیین مسیر ذخیره سازی فایل‌های آپلود شده
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // ذخیره فایل‌ها در پوشه images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // نام فایل همانند نام اصلی آن باقی خواهد ماند
  }
});

// تعیین فیلتر برای نوع فایل‌های قابل قبول (در اینجا تصاویر)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // قبول فایل‌های با پسوند jpeg و png
  } else {
    cb(new Error('فرمت فایل نامعتبر است'), false); // رد کردن فایل‌های با فرمت نامعتبر
  }
};

// تنظیمات multer برای آپلود تصاویر
const upload = multer({ storage: storage, fileFilter: fileFilter });

// دریافت تصویر از طریق آپلودر
  try {
    // اطلاعات تصویر موجود در req.file
    const image = new this.Image({
      imageName: req.file.originalname,
      imagepath: req.file.path
      // دیگر فیلدهای مرتبط با تصویر
    });
    await image.save();
    res.status(200).json({ message: 'تصویر با موفقیت ذخیره شد' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


  }

})();


