const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

// 获取商品列表
router.get('/', productController.getProducts);
// 新增商品（品牌用户或管理员）
router.post('/', auth, (req, res, next) => {
  if (!['brand', 'admin'].includes(req.user.role)) return res.status(403).json({ error: '无权限' });
  next();
}, productController.createProduct);

module.exports = router; 