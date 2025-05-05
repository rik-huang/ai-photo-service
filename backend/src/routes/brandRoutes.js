const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const auth = require('../middlewares/auth');

// 获取品牌列表
router.get('/', brandController.getBrands);
// 新增品牌（仅管理员）
router.post('/', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '无权限' });
  next();
}, brandController.createBrand);

module.exports = router; 