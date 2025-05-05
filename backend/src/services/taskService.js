const pool = require('../models/db');
const aiJobService = require('./aiJobService');

exports.getTasks = async ({ brand_id, product_id }) => {
  let sql = 'SELECT * FROM tasks WHERE 1=1';
  let params = [];
  if (brand_id) {
    sql += ' AND brand_id=?';
    params.push(brand_id);
  }
  if (product_id) {
    sql += ' AND product_id=?';
    params.push(product_id);
  }
  sql += ' ORDER BY created_at DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.createTask = async ({ product_id, brand_id, remark }) => {
  if (!product_id || !brand_id) throw new Error('商品ID和品牌ID不能为空');
  await pool.query('INSERT INTO tasks (product_id, brand_id, remark) VALUES (?, ?, ?)', [product_id, brand_id, remark || null]);
  return { message: '任务创建成功' };
};

exports.getTaskById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id=?', [id]);
  if (rows.length === 0) throw new Error('任务不存在');
  return rows[0];
};

exports.updateTaskStatus = async (id, status) => {
  const [result] = await pool.query('UPDATE tasks SET status=? WHERE id=?', [status, id]);
  if (result.affectedRows === 0) throw new Error('任务不存在或未更新');

  // 自动化：审核通过后自动入队AI图生文任务
  if (status === 'approved') {
    // 获取任务详情、图片、模板等，组装AI输入
    const [taskRows] = await pool.query('SELECT * FROM tasks WHERE id=?', [id]);
    const task = taskRows[0];
    // 获取正反面图片
    const [imgRows] = await pool.query("SELECT url FROM images WHERE task_id=? AND type IN ('front','back')", [id]);
    const images = imgRows.map(row => row.url);
    // 获取品牌模板
    const [tplRows] = await pool.query("SELECT * FROM templates WHERE brand_id=? LIMIT 1", [task.brand_id]);
    const template = tplRows[0]?.fixed_text || '';
    // 入队AI任务
    await aiJobService.createJob({
      task_id: id,
      type: 'img2text',
      input: JSON.stringify({ images, template })
    });
  }
  return { message: '任务状态已更新' };
}; 