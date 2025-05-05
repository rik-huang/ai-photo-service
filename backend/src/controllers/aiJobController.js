const aiJobService = require('../services/aiJobService');
const pool = require('../models/db');

exports.createJob = async (req, res) => {
  try {
    const result = await aiJobService.createJob(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const result = await aiJobService.updateJobStatus(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJobsByTask = async (req, res) => {
  try {
    const jobs = await aiJobService.getJobsByTask(req.query.task_id);
    res.json(jobs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await aiJobService.getJobById(req.params.id);
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmImage = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { image_url, clothes_img_url } = req.body;
    // 获取text2img任务，确认类型
    const job = await aiJobService.getJobById(jobId);
    if (job.type !== 'text2img') throw new Error('只能确认text2img任务');
    // 自动入队clothes_swap任务
    await aiJobService.createJob({
      task_id: job.task_id,
      type: 'clothes_swap',
      input: JSON.stringify({ person_img: image_url, clothes_img: clothes_img_url })
    });
    res.json({ message: '已确认图片并入队AI换衣任务' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 