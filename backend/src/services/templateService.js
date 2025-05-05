const pool = require('../models/db');

exports.getTemplates = async ({ brand_id, model_name }) => {
  let sql = 'SELECT * FROM templates WHERE 1=1';
  let params = [];
  if (brand_id) {
    sql += ' AND brand_id=?';
    params.push(brand_id);
  }
  if (model_name) {
    sql += ' AND model_name=?';
    params.push(model_name);
  }
  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.createTemplate = async ({ brand_id, model_name, fixed_text, portrait_text }) => {
  if (!brand_id || !model_name) throw new Error('品牌ID和模特名不能为空');
  await pool.query('INSERT INTO templates (brand_id, model_name, fixed_text, portrait_text) VALUES (?, ?, ?, ?)', [brand_id, model_name, fixed_text || null, portrait_text || null]);
  return { message: '模板创建成功' };
};

exports.updateTemplate = async (id, { fixed_text, portrait_text }) => {
  const [result] = await pool.query('UPDATE templates SET fixed_text=?, portrait_text=? WHERE id=?', [fixed_text || null, portrait_text || null, id]);
  if (result.affectedRows === 0) throw new Error('模板不存在或未更新');
  return { message: '模板已更新' };
}; 