const express = require('express');
const router = express.Router();
const passport = require('passport');

// Middleware to check login
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();


  }
  // Store the intended URL in session
  req.session.redirectAfterLogin = req.originalUrl;
  res.redirect('/auth/google');
}

// routes/user/buy.js
router.get('/:id', ensureAuthenticated, (req, res) => {
  const promptId = req.params.id;
  req.session.productId = promptId;  // <-- Store it here!
  res.redirect(/checkout/${promptId});
});

module.exports = router;