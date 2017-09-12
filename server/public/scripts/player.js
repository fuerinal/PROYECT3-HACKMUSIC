const express = require('express');
const request = require('request');

let token='BQA7leadIAZZf6sIIenlKZ1oU-lU6vLnIng_Zc7F_MuWXsUMm2_L9QMxcaOwJ_sLtkJSMyt5DaRcp1mmLMChQtWFV_C3DEKEtPbEDFQIABh82KyWHwBe0wY6kGNvb6oeWHmzcIMIW4Z2NGTCIax4ly7zTntZpAn9TFV4_qXEfO3G1gUAXsV8yLb3KZjT6OaHJqCPGl85BAXmnpWMxRsvqq0XVyUdyEw8gEvMxjxoLG4K-rIPvPiA8YJ92Kfv6n9x4Wr78kmanhujKmvDxRCRhO6aCeqDcf2rQWNoyWkowB2g_sYh_R_6WCNc8L1izQqIEpolJw';

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
