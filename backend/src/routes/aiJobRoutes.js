const express = require('express');
const router = express.Router();
const aiJobController = require('../controllers/aiJobController');

// 创建AI任务
router.post('/', aiJobController.createJob);
// 更新AI任务状态
router.patch('/:id', aiJobController.updateJobStatus);
// 获取某任务下所有AI任务
router.get('/', aiJobController.getJobsByTask);
// 获取单个AI任务
router.get('/:id', aiJobController.getJobById);
// 确认text2img图片并入队clothes_swap任务
router.post('/:id/confirm_image', aiJobController.confirmImage);

module.exports = router; 