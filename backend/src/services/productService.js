const pool = require('../models/db');

exports.getProducts = async (brand_id) => {
  let sql = 'SELECT id, brand_id, name, description, created_at FROM products';
  let params = [];
  if (brand_id) {
    sql += ' WHERE brand_id=?';
    params.push(brand_id);
  }
  const [rows] = await pool.query(sql, params);
  return rows;
};

exports.createProduct = async ({ brand_id, name, description }) => {
  if (!brand_id || !name) throw new Error('品牌ID和商品名称不能为空');
  await pool.query('INSERT INTO products (brand_id, name, description) VALUES (?, ?, ?)', [brand_id, name, description || null]);
  return { message: '商品创建成功' };
}; 