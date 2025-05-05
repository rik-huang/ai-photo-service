const taskService = require('../services/taskService');
const aiJobService = require('../services/aiJobService');

exports.getTasks = async (req, res) => {
  try {
    const { brand_id, product_id } = req.query;
    const tasks = await taskService.getTasks({ brand_id, product_id });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const result = await taskService.createTask(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const result = await taskService.updateTaskStatus(req.params.id, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTaskProgress = async (req, res) => {
  try {
    const task_id = req.params.id;
    // 获取主任务信息
    const task = await exports.getTaskById({ params: { id: task_id } }, { json: v => v });
    // 获取AI任务列表
    const ai_jobs = await aiJobService.getJobsByTask(task_id);
    res.json({ task, ai_jobs });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 