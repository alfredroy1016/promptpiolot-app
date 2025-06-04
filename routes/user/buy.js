// routes/buy.js
const express = require('express');
const router = express.Router();
const Prompt = require('../../models/Prompt');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  req.session.returnTo = req.originalUrl;
  return res.redirect('/auth/google');
}

router.get('/buy/:id', ensureAuthenticated, async (req, res) => {
  const promptId = req.params.id;

  try {
    const prompt = await Prompt.findById(promptId);
    if (!prompt) return res.status(404).send('Prompt not found');

    res.render('user/buy', {
      promptId,
      promptFile: prompt.file,
      price: prompt.price,
      razorpayKey: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});




  

module.exports = router;
