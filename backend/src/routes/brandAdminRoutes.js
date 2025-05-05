const express = require('express');
const router = express.Router();
const brandAdminController = require('../controllers/brandAdminController');
const auth = require('../middlewares/auth');

// 所有接口需管理员权限
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '无权限' });
  next();
});

router.patch('/:id', brandAdminController.updateBrand);
router.delete('/:id', brandAdminController.deleteBrand);

module.exports = router; 