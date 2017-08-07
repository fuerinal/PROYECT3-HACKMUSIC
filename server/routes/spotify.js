const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const CurrentSpotify = require('../models/CurrentSpotify');


// Our user model
const User = require('../models/User');
const Player = require('../public/scripts/player.js');
const spotifyRoutes = express.Router();

spotifyRoutes.get('/nextSong', (req, res, next) => {
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.nextSong();
  res.status(200).json({
    message: 'Success'
  });
});

spotifyRoutes.get('/previousSong', (req, res, next) => {
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.previousSong();
  res.status(200).json({
    message: 'Success'
  });

});

spotifyRoutes.get('/pause', (req, res, next) => {
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.pause();
  res.status(200).json({
    message: 'Success'
  });
});

spotifyRoutes.get('/play', (req, res, next) => {
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.play();
  res.status(200).json({
    message: 'Success'
  });
});

spotifyRoutes.get('/artistCurrent', (req, res, next) => {

  Player.artistCurrent();

  CurrentSpotify.find({

  }, (err, cs) => {
    if (err) return handleError(err);
    if (cs[0] === undefined) {

      console.log("Array Vacío");
      artistCurrent = "Loading";

    } else {
      let artistCurrent;
      var p1 = new Promise(
        function(resolve, reject) {
          resolve(artistCurrent = cs[0].currentSong);
        });
      // console.log(artistCurrent, "ROUTE CS");
      // console.log(artistCurrent, "ARTIST CURRENT");
      p1.then(values => {
        // console.log(values,"EEEEEEEOooooooo");
        res.status(200).json({
          artistCurrent: artistCurrent
        });
      }).catch(reason => {
        //console.log(reason);
      });

    }
  });

  // console.log("EN LA RUTA DE ARTIS CURRENT",Player.artistCurrentCurrent());

});


spotifyRoutes.get('/playlistCurrent', (req, res, next) => {
  console.log("ENTRA playlistCurrent -> SERVER SPOTIFY");
  let arrayPlaylist;
  let promiseRoute = new Promise((resolve, reject) => {

    resolve(arrayPlaylist = Player.playlistCurrent());
  });
  promiseRoute.then(arrayPlaylist => {
    //console.log("Artist routeeee", arrayPlaylist);
    res.status(200).json({
      arrayPlaylist: arrayPlaylist

    });
  });

  spotifyRoutes.post('/reorder', (req, res, next) => {

    console.log("ENTRA order -> SERVER SPOTIFY");
    let m=Player.reorder(req.body.i);
    console.log(m);
    res.status(200).json({
      message: 'Success'
    });
  });

  spotifyRoutes.post('/setfirst', (req, res, next) => {

    console.log("ENTRA setfirst -> SERVER SPOTIFY");
    Player.setfirst(req.body.index);
    
    res.status(200).json({
      message: 'Success'
    });
  });




  // console.log("EN LA RUTA DE ARTIS CURRENT",Player.artistCurrentCurrent());

});
module.exports = spotifyRoutes;
