const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

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
  console.log("ENTRA NEXTSONG -> SERVER SPOTIFY");
  Player.artistCurrent();
  console.log("EN LA RUTA DE ARTIS CURRENT",Player.artistCurrent());
  res.status(200).json({
    artist: Player.artistCurrent()
  });
});
module.exports = spotifyRoutes;
