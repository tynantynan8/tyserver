const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done) =>{ //seralize function  sec 4.  lec 42
 done(null,user.id);
});
passport.deserializeUser((id,done)=>{ //seralize function  sec 4.  lec 43
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy({
    clientID: keys.googleClientID, 
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken,refreshToken,profile,done) => {
      const existingUser = await User.findOne({googleId: profile.id})
      
        if(existingUser){
          //we already have record of user
          done(null, existingUser);
        } else {
          //we dont have user record with this id, make a new one
         const user= await new User({googleId: profile.id}).save()
         done(null,user);
          
        }
      }
    

  )
);