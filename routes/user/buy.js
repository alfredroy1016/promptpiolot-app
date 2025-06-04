// routes/buy.js
const express = require('express');
const router = express.Router();
const Prompt = require('../../models/Prompt');

function ensureAuthenticated(req, res, next) {
  console.log('auth')
  // if (req.isAuthenticated()) return next();

  req.session.returnTo = req.originalUrl;
  return res.redirect('/auth/google');
}

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const promptId = req.params.id;

  try {
    console.log('fdsf')
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
