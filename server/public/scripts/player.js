const express = require('express');
const request = require('request');

let token='BQDarW69adaPajpkQZXOX5-BLpLrRU-6kmY92_i1EX64Cc0w_7Zd689kTbRW2pevfAnYXx2y02PJJkrzZ4L2qVGz2wPFprdkQdpLcS6FElZJHjTFRS1bmLm44bVL-8zPRQE7jzY9j91NnDdgGy1OTMMBhgyDiqvsYD6TxbYuG-UxIWEpa_DO6PZFlX9OTFDVPZY4WeWZNV5IX5lFEFA8JUkx3BPYwVqj2-MrO8HQZ7AgQtBzfryAkvsBXc9RaLWSgaRsV3674xnbXGHWQ9OfyA5Css9EkgfLN7tozCEvWeh1MKxY6z-VpL3qmJ5mN1T_CXxnEQ';

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
