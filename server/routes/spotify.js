const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const CurrentSpotify = require('../models/CurrentSpotify');
let m;

// Our user model
const User = require('../models/User');
const Player = require('../public/scripts/player.js');
const Token = require('../public/scripts/refreshtoken.js');
const spotifyRoutes = express.Router();

spotifyRoutes.get('/nextSong', (req, res, next) => {
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.nextSong();
  res.status(200).json({
    message: 'Success'
  });
});

spotifyRoutes.post('/refreshtoken', (req, res, next) => {
  console.log("REFRESH TOKEN-> SERVER SPOTIFY");
  console.log(req.body);
  console.log(res.access_token);

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
});
spotifyRoutes.get('/playlistdata', (req, res, next) => {
  console.log("ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  let arrayPlaylistdata;
  let promiseRoute = new Promise((resolve, reject) => {

    resolve(arrayPlaylistdata = Player.playlistdata());
  });
  promiseRoute.then(arrayPlaylistdata => {
    //console.log("Artist routeeee", arrayPlaylist);
    res.status(200).json({
      arrayPlaylistdata: arrayPlaylistdata

    });
  });
});

spotifyRoutes.post('/reorder', (req, res, next) => {
  console.log("Routereorder->>>",m);

  console.log("ENTRA order -> SERVER SPOTIFY");
  m = Player.reorder(req.body.i);
  res.status(200).json({
    index: m
  });
});

spotifyRoutes.get('/refresh', (req, res, next) => {

  m=Player.sendIndex();
  console.log("Routerefresh->>>",m);

  console.log("ENTRA GET -> SERVER SPOTIFY");
  res.status(200).json({
    index: m
  });
});

spotifyRoutes.post('/setfirst', (req, res, next) => {

  console.log("ENTRA setfirst -> SERVER SPOTIFY");

  // let promiseRoute = new Promise((resolve, reject) => {

  // });

  // promiseRoute.then(m => {
    console.log("RouteSetFist->>>",m);
    //console.log("Artist routeeee", arrayPlaylist);
    let setfirstdata;
    let promiseRoute = new Promise((resolve, reject) => {
      resolve(  setfirstdata = Player.setfirst(req.body.index));
    });
    promiseRoute.then(setfirstdata => {
      console.log(setfirstdata);
      setTimeout(  Player.setlast(), 1000);
      res.status(200).json({
      message:"success"
      });
    });
  // });


});




// console.log("EN LA RUTA DE ARTIS CURRENT",Player.artistCurrentCurrent());


module.exports = spotifyRoutes;
