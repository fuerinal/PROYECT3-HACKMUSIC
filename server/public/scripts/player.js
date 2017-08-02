console.log("ready!");
const request = require('request');

console.log("ENTRA en player PUBLIC");
var headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQCGJi9KCYZNop5oW_82yv-KBj58FsI-4ub03kb1KoLOXAF_lRPXiM0drxPe8OiJm8ZKIQukvD4IZud-onkKGFby5Tijc_fUMD36ffjJbXmKFgrjMLqqnxVD0mc6JuxW9-zKKYN5Ccm82j4UdcqwIel8QBbojh_oHl-cZTlLM_dOK9E5X5JCJ2_URWafnlnSn4fPJPIsV1CN0FJeiByc5J0Z1_qXx4kGPSbvVRDrUYTOeD2MfBk-Z5EcahRzEpOqdUApIAMBlphIhkNItWYwDO2P7H4JJ72crzGkZszNgocF6tv7cC-DXYxnEBHfUsX78P3J1A'
};
var headersPause = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQCGJi9KCYZNop5oW_82yv-KBj58FsI-4ub03kb1KoLOXAF_lRPXiM0drxPe8OiJm8ZKIQukvD4IZud-onkKGFby5Tijc_fUMD36ffjJbXmKFgrjMLqqnxVD0mc6JuxW9-zKKYN5Ccm82j4UdcqwIel8QBbojh_oHl-cZTlLM_dOK9E5X5JCJ2_URWafnlnSn4fPJPIsV1CN0FJeiByc5J0Z1_qXx4kGPSbvVRDrUYTOeD2MfBk-Z5EcahRzEpOqdUApIAMBlphIhkNItWYwDO2P7H4JJ72crzGkZszNgocF6tv7cC-DXYxnEBHfUsX78P3J1A',
  'Content-Type': 'application/json'
};
nextSong = function() {
  var options = {
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
  var options = {
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
  var options = {
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

  var dataString = '{"context_uri":"spotify:album:5ht7ItJgpBH7W6vJ5BqpPr","offset":{"position":5}}';

  var options = {
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    headers: headersPause,
    body: dataString
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
};
artistCurrent = function() {
  var request = require('request');
  var artistCurrentString;

  var options = {
    url: 'https://api.spotify.com/v1/me/player',
    headers: headers
  };

  // var p = new Promise(function(resolve, reject) {
    function callback(error, response, body) {

      if (!error && response.statusCode == 200) {
        // console.log(body);
        let object = JSON.parse(body);
        console.log("OBJETO", object.item.album.artists[0].name);
        artistCurrentString = object.item.album.artists[0].name;
      }
    }

  // });
  request(options, callback);
  // p.then(function() {
    console.log("Funcionaaa", this.artistCurrentString);
// 	/* do something with the result */
// }).catch(function() {
// 	/* error :( */
// });

  return artistCurrentString;
};


module.exports.nextSong = nextSong;
module.exports.previousSong = previousSong;
module.exports.pause = pause;
module.exports.play = play;
module.exports.artistCurrent = artistCurrent;
// module.exports.artistCurrent.artistCurrentString = artistCurrentString;
