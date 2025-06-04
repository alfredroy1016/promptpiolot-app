const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us', user: req.session.user });
});

router.get('/terms', (req, res) => {
  res.render('terms', { title: 'Terms and Conditions', user: req.session.user });
});

router.get('/shipping', (req, res) => {
  res.render('shipping', { title: 'Shipping Policy', user: req.session.user });
});

router.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Privacy Policy', user: req.session.user });
});

module.exports = router;