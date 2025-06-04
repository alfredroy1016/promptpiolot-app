const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    console.log('✅ Logged in as:', req.user);
    const redirectUrl = req.session.returnTo || '/prompts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  });

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  
  (req, res) => {
    let user = req.user
    console.log('✅ Logged in as:', req.user);
    const redirectUrl = req.user.req.session.redirectAfterLogin || '/prompts';
    delete req.session.redirectAfterLogin;
    res.redirect(redirectUrl);
  }
);



router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;