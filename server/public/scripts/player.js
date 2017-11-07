const express = require('express');
const request = require('request');

let token='BQAL1-XiKdfR8nxzIe14JwmH06vRHHXtNy8ROXaJah7r3dgPsTCHmEMXVUCTc61RYTJN17yorTRTMDa9QzA50Pf5TX8_Qo4Hbv2v5OwdwJr3Z9eA3U-5I6go5r2cz5Top2oyS8vSCdb-HyluCMHvtVp-7VClFocK_Hxpj_KQciC29A9CLrodZzHaTmiD12vwRBsWPv7vrdakFn0wcV2Rc_RFlr2B_fkQvFZ1u9Fd71IOizKpuD8XNDogmqT4Hgajn_HSFHvloHYLK6VWxNZOyuThtDdUI8UXU3OqX5mSgWKp-ibd6iWFHyfuBNXm7FFiXnPCzA';

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
