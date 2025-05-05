const pool = require('../models/db');

exports.saveImage = async ({ task_id, type, url }) => {
  if (!task_id || !type || !url) throw new Error('参数不完整');
  await pool.query('INSERT INTO images (task_id, type, url) VALUES (?, ?, ?)', [task_id, type, url]);
  return { message: '图片上传成功', url };
};

exports.getImagesByTask = async (task_id) => {
  if (!task_id) throw new Error('任务ID不能为空');
  const [rows] = await pool.query('SELECT * FROM images WHERE task_id=?', [task_id]);
  return rows;
}; 