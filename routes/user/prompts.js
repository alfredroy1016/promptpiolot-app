const express = require('express');
const router = express.Router();
const Prompt = require('../../models/Prompt');

// GET /prompts – User view
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find({}); // optionally add filtering
    res.render('user/prompts', { prompts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
