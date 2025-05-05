const express = require('express');
const router = express.Router();
const userAdminController = require('../controllers/userAdminController');
const auth = require('../middlewares/auth');

// 所有接口需管理员权限
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '无权限' });
  next();
});

router.get('/', userAdminController.getUsers);
router.post('/', userAdminController.createUser);
router.patch('/:id', userAdminController.updateUser);
router.delete('/:id', userAdminController.deleteUser);

module.exports = router; 