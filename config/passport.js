const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); 


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(user)
    let user = await User.findOne({ googleId: profile.id });
        req.session.user = user 

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      });
    }console.log(user)
       req.session.user = user 
    return done(user,req.session.user);
  } catch (err) {
    consolr
    return done(err, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id); // stores MongoDB _id in session
});

passport.deserializeUser(async (id, done) => {
  console.log('🔍 Deserializing user with ID:', id);
  try {
    const user = await User.findById(id);
    console.log(user)
    req.session.user =user
    console.log('✅ Found user:', user);
    respond.send(user)
  } catch (err) {
    console.error('❌ Error in deserializeUser:', err);
    done(err, null);
  }
});
