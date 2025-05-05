const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const auth = require('../middlewares/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// 上传图片（需登录）
router.post('/upload', auth, upload.single('file'), imageController.uploadImage);
// 获取任务图片
router.get('/', imageController.getImagesByTask);
// 确认AI换衣图片为最终可用
router.post('/confirm_final', imageController.confirmFinalImage);
// 获取任务下所有最终可用图片
router.get('/selected', imageController.getSelectedImagesByTask);

module.exports = router; 