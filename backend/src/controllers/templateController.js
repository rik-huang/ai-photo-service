const templateService = require('../services/templateService');

exports.getTemplates = async (req, res) => {
  try {
    const { brand_id, model_name } = req.query;
    const templates = await templateService.getTemplates({ brand_id, model_name });
    res.json(templates);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createTemplate = async (req, res) => {
  try {
    const result = await templateService.createTemplate(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTemplate = async (req, res) => {
  try {
    const result = await templateService.updateTemplate(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 