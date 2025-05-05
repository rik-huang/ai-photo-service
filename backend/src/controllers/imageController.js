const imageService = require('../services/imageService');

exports.uploadImage = async (req, res) => {
  try {
    const { task_id, type } = req.body;
    if (!req.file) throw new Error('未上传图片');
    const url = `/uploads/${req.file.filename}`;
    const result = await imageService.saveImage({ task_id, type, url });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getImagesByTask = async (req, res) => {
  try {
    const { task_id } = req.query;
    const images = await imageService.getImagesByTask(task_id);
    res.json(images);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirmFinalImage = async (req, res) => {
  try {
    const { image_id } = req.body;
    if (!image_id) throw new Error('缺少图片ID');
    const pool = require('../models/db');
    // 将该图片标记为selected
    await pool.query("UPDATE images SET status='selected' WHERE id=?", [image_id]);
    res.json({ message: '图片已设为最终可用' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSelectedImagesByTask = async (req, res) => {
  try {
    const { task_id } = req.query;
    if (!task_id) throw new Error('任务ID不能为空');
    const pool = require('../models/db');
    const [rows] = await pool.query("SELECT * FROM images WHERE task_id=? AND status='selected'", [task_id]);
    res.json(rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 