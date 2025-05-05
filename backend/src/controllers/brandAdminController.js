const pool = require('../models/db');

exports.updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, logo_url } = req.body;
    const [result] = await pool.query('UPDATE brands SET name=?, logo_url=? WHERE id=?', [name, logo_url, id]);
    if (result.affectedRows === 0) throw new Error('品牌不存在或未更新');
    res.json({ message: '品牌已更新' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query('DELETE FROM brands WHERE id=?', [id]);
    if (result.affectedRows === 0) throw new Error('品牌不存在或未删除');
    res.json({ message: '品牌已删除' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 