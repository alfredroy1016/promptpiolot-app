const Prompt = require('../../models/Prompt');

exports.getDashboard = (req, res) => {
    res.render('admin/dashboard');
};

exports.getPrompts = async (req, res) => {
    const prompts = await Prompt.find();
    res.render('admin/prompts', { prompts });
};

exports.getPromptslist = async (req, res) => {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.render('admin/promptlist', { prompts });
};



exports.uploadPrompt = async (req, res) => {
  try {
    const prompt = new Prompt({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      difficulty: req.body.difficulty,
      useCase: req.body.useCase,
      content: req.body.content,
      price:req.body.price,
      tags: JSON.parse(req.body.tags || '[]'),
      file: req.file ? req.file.filename : null
    });
    console.log("upload");
    
    await prompt.save();
     res.redirect('/admin/prompts/promptlist');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading prompt');
  }
};

