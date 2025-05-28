const Prompt = require('../models/Prompt');

exports.getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.render('userPrompts', { prompts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading prompts.");
  }
};
