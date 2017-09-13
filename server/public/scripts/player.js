const express = require('express');
const request = require('request');

let token='token';

let headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`
};

nextSong = function() {
  let options = {
    url: 'https://api.spotify.com/v1/me/player/next',
    method: 'POST',
    headers: headers
  };

  function callback(error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  request(options, callback);
};

previousSong = function() {
  let options = {
    url: 'https://api.spotify.com/v1/me/player/previous',
    method: 'POST',
    headers: headers
  };

  function callback(error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  request(options, callback);
};

pause = function() {
  let options = {
    url: 'https://api.spotify.com/v1/me/player/pause',
    method: 'PUT',
    headers: headers
  };

  function callback(error, response, body) {
    console.log(response);
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  request(options, callback);
};

play = function() {
  let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      method: 'PUT',
      headers: headers,
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }
  request(options, callback);
};

module.exports.nextSong = nextSong;
module.exports.previousSong = previousSong;
module.exports.pause = pause;
module.exports.play = play;
