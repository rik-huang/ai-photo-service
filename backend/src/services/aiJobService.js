const pool = require('../models/db');

exports.createJob = async ({ task_id, type, input }) => {
  if (!task_id || !type) throw new Error('参数不完整');
  const [result] = await pool.query('INSERT INTO ai_jobs (task_id, type, input) VALUES (?, ?, ?)', [task_id, type, input || null]);
  return { id: result.insertId };
};

exports.updateJobStatus = async (id, { status, result, error_msg }) => {
  const [res] = await pool.query('UPDATE ai_jobs SET status=?, result=?, error_msg=? WHERE id=?', [status, result || null, error_msg || null, id]);
  if (res.affectedRows === 0) throw new Error('AI任务不存在或未更新');
  return { message: 'AI任务状态已更新' };
};

exports.getJobsByTask = async (task_id) => {
  const [rows] = await pool.query('SELECT * FROM ai_jobs WHERE task_id=?', [task_id]);
  return rows;
};

exports.getJobById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ai_jobs WHERE id=?', [id]);
  if (rows.length === 0) throw new Error('AI任务不存在');
  return rows[0];
}; 