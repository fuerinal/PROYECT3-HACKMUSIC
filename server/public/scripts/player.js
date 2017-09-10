const express = require('express');
const request = require('request');

let token='BQAxsKiE0sZuKY-5XLmRWeVPeO3U2bNhxAhao6YTJQ_e4Mz9H3CWpgnezVH4l4BqR9EpSTLemvHknke6OSCDhmmwWTD4RBez-W05E2r0MFj3LLw5OgcIHhFWfQKfmuniYRlg2F9LCi2kPmB-CGjnu_doepJqLbUSbmQTOFa1xF7FPUmiyisjtpi6liokmlB55DHH8aS4LWfdO3e278T9q1Pw85U4m9XPIh__k0lXZlFu-_IW9re4XpIta-em5pK5FX-1MrcX1RJEq6RxjzWQnl7LCygjajDH6C83f4ICeP6DQ-mZgo9mtP9YeoVJDxKHnV63vw';

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
