const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const CurrentSpotify = require('../models/CurrentSpotify');
let m;

// Our user model
const User = require('../models/User');
const Playlist = require('../public/scripts/playlist.js');
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
  console.log("ENTRA PreviousSONG -> SERVER SPOTIFY");
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
  console.log("ENTRA PLAY -> SERVER SPOTIFY");
  Player.play();

  res.status(200).json({
    message: 'Success'
  });

});

spotifyRoutes.get('/artistCurrent', (req, res, next) => {

  Playlist.artistCurrent();

  CurrentSpotify.find({}, (err, cs) => {
    if (err) return handleError(err);
    if (cs[0] === undefined) {
      artistCurrent = "Loading";
    } else {
      let artistCurrent;
      var p1 = new Promise(
        function(resolve, reject) {
          resolve(artistCurrent = cs[0].currentSong);
        });
      p1.then(values => {
        res.status(200).json({
          artistCurrent: artistCurrent
        });
      }).catch(reason => {});
    }
  });

});


spotifyRoutes.get('/playlistCurrent', (req, res, next) => {
  console.log("ENTRA PLAYLISTCURRENT -> SERVER SPOTIFY");
  let arrayPlaylist;
  let promiseRoute = new Promise((resolve, reject) => {
    resolve(arrayPlaylist = Playlist.playlistCurrent());
  });
  promiseRoute.then(arrayPlaylist => {
    res.status(200).json({
      arrayPlaylist: arrayPlaylist

    });
  });

});

spotifyRoutes.get('/playlistdata', (req, res, next) => {
  console.log("ENTRA PLAYLISTDATA -> SERVER SPOTIFY");
  let arrayPlaylistdata;
  let promiseRoute = new Promise((resolve, reject) => {

    resolve(arrayPlaylistdata = Playlist.playlistdata());
  });
  promiseRoute.then(arrayPlaylistdata => {
    //console.log("Artist routeeee", arrayPlaylist);
    res.status(200).json({
      arrayPlaylistdata: arrayPlaylistdata

    });
  });

});

spotifyRoutes.post('/reorder', (req, res, next) => {
  console.log("Routereorder->>>", m);
  console.log("ENTRA REORDER -> SERVER SPOTIFY");
  m = Playlist.reorder(req.body.i);
  res.status(200).json({
    index: m
  });

});

spotifyRoutes.get('/refresh', (req, res, next) => {
  console.log("ENTRA REFRESH -> SERVER SPOTIFY");
  m = Playlist.sendIndex();
  console.log("Routerefresh->>>", m);
  res.status(200).json({
    index: m
  });

});

spotifyRoutes.post('/setfirst', (req, res, next) => {
  console.log("ENTRA setfirst -> SERVER SPOTIFY");
  console.log("RouteSetFist->>>", m);
  let setfirstdata;
  let promiseRoute = new Promise((resolve, reject) => {
    resolve(setfirstdata = Playlist.setfirst(req.body.index));
  });

  promiseRoute.then(setfirstdata => {
    console.log(setfirstdata);
    setTimeout(Playlist.setlast(), 1000);
    res.status(200).json({
      message: "success"
    });
  });

});




// console.log("EN LA RUTA DE ARTIS CURRENT",Playlist.artistCurrentCurrent());


module.exports = spotifyRoutes;
