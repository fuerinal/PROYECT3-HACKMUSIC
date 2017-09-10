const StrategySpotify = require('passport-spotify').Strategy;
const UserSpotify = require('../models/UserSpotify');
module.exports = function(passport) {
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  passport.use(new StrategySpotify({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/spotify/return'
    },
    function(accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log('TOKEN->', accessToken);
      var tokenSpotify=accessToken;
      console.log('Profile->', profile);
      UserSpotify.find({
        'id_Spotify': profile.id
      }, (err, cs) => {
        if (err) return handleError(err);
        if (cs[0] === undefined) {
          //UserSpotify.remove(function(err, removed) {});
          const newUserSpotify = UserSpotify({
            name: profile.displayName,
            id_Spotify:profile.id,
            token:tokenSpotify,
            image:profile.photos[0],
            email:profile.email
          }).save();
        } else {}
      });

      return cb(null, profile);
    }));
};
