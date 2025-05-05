const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

// 获取任务列表
router.get('/', taskController.getTasks);
// 新建任务（品牌用户或管理员）
router.post('/', auth, (req, res, next) => {
  if (!['brand', 'admin'].includes(req.user.role)) return res.status(403).json({ error: '无权限' });
  next();
}, taskController.createTask);
// 获取单个任务详情
router.get('/:id', taskController.getTaskById);
// 更新任务状态（品牌用户或管理员）
router.patch('/:id/status', auth, (req, res, next) => {
  if (!['brand', 'admin'].includes(req.user.role)) return res.status(403).json({ error: '无权限' });
  next();
}, taskController.updateTaskStatus);
// 查询任务进度及AI任务链路
router.get('/:id/progress', taskController.getTaskProgress);

module.exports = router; 