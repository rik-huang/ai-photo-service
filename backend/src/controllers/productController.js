const productService = require('../services/productService');

exports.getProducts = async (req, res) => {
  try {
    const { brand_id } = req.query;
    const products = await productService.getProducts(brand_id);
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 