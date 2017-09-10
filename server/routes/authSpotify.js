const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

// Our user model
const UserSpotify = require('../models/UserSpotify');
const Sessions = require('../models/Sessions');
const Player = require('../public/scripts/player.js');

const authSpotifyRoutes = express.Router();


  authSpotifyRoutes.get('/login/spotify',
    passport.authenticate(
      'spotify',
      {scope: ['user-read-email', 'user-read-private','playlist-modify-public','playlist-modify-private','playlist-read-private','user-library-modify','playlist-read-collaborative','streaming','ugc-image-upload','user-follow-modify','user-follow-read','user-library-read','user-read-birthdate','user-top-read'], showDialog: true}
    ),
    function(req, res){
     res.status(200).json({
       message: 'Success'
     });
  });

authSpotifyRoutes.get('/login/spotify/return',
  passport.authenticate('spotify', {
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.status(200).json({
      message: 'SuccessLoginSpotify',
      user:req.user
    });
  });

module.exports = authSpotifyRoutes;
