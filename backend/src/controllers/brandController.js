const brandService = require('../services/brandService');

exports.getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    res.json(brands);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const result = await brandService.createBrand(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 