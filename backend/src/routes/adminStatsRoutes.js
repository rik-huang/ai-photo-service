const express = require('express');
const router = express.Router();
const adminStatsController = require('../controllers/adminStatsController');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: '无权限' });
  next();
}, adminStatsController.getStats);

module.exports = router; 