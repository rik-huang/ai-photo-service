const pool = require('../models/db');

exports.getBrands = async () => {
  const [rows] = await pool.query('SELECT id, name, logo_url, created_at FROM brands');
  return rows;
};

exports.createBrand = async ({ name, logo_url }) => {
  if (!name) throw new Error('品牌名称不能为空');
  const [rows] = await pool.query('SELECT id FROM brands WHERE name=?', [name]);
  if (rows.length > 0) throw new Error('品牌已存在');
  await pool.query('INSERT INTO brands (name, logo_url) VALUES (?, ?)', [name, logo_url || null]);
  return { message: '品牌创建成功' };
}; 