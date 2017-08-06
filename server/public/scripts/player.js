console.log("ready!");
const request = require('request');
const express = require('express');
const CurrentSpotify = require('../../models/CurrentSpotify');
const CurrentSpotifyPlaylist = require('../../models/CurrentSpotifyPlaylist');



console.log("ENTRA en player PUBLIC");
var headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAbUiBw7b6nwNeYJE1dgW-io4HwLHNIDMFLZKaMtOPN8kLyQChkd7GySa4Ag5tDFW4b0SR6OEwe9LW4GqDPSoVL3ZFPtZMfUZbpxd7WgWDIXTsWdX5nA6oJtpMhTPylcoljHBAnPw_N7LQIbrH3UZY130i5HR4fUJydwNeNUUr6qAOS6-ooNLkk0WGw0d7Ozv-Ael5EvF5-TEJPIeMGJa2cbaxgrD1SizTHADCNahDlxAO9_fwVlgywTKW3NdD1jOYEGUPNLAn9lP6czvbPPLew-x0lPa1BrTQrz_RILxn-05B0FWdJiq4iqfX3rbwFcrssxw'
};
var headersPause = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAbUiBw7b6nwNeYJE1dgW-io4HwLHNIDMFLZKaMtOPN8kLyQChkd7GySa4Ag5tDFW4b0SR6OEwe9LW4GqDPSoVL3ZFPtZMfUZbpxd7WgWDIXTsWdX5nA6oJtpMhTPylcoljHBAnPw_N7LQIbrH3UZY130i5HR4fUJydwNeNUUr6qAOS6-ooNLkk0WGw0d7Ozv-Ael5EvF5-TEJPIeMGJa2cbaxgrD1SizTHADCNahDlxAO9_fwVlgywTKW3NdD1jOYEGUPNLAn9lP6czvbPPLew-x0lPa1BrTQrz_RILxn-05B0FWdJiq4iqfX3rbwFcrssxw',
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


  var options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/player',
    headers: headers
  };

  // var p = new Promise(function(resolve, reject) {
  // p1 = new Promise(function(resolve, reject) {
  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      // console.log(body);
      let object = JSON.parse(body);



      CurrentSpotify.find({
        'currentSong': `${object.item.album.artists[0].name}`
      }, (err, cs) => {
        if (err) return handleError(err);
        if (cs[0] === undefined) {
          CurrentSpotify.remove(function(err, removed) {
            console.log(removed);
          });

          const newCurrentSpotify = CurrentSpotify({
            currentSong: object.item.album.artists[0].name
          }).save();
          // console.log("Cambios",cs);

        } else {
          // console.log("Sin cambios", cs);
        }
      });


      artistCurrentString = object.item.album.artists[0].name;

      // console.log(object.item.album.artists[0].name);

    }
    //   }
    // });

    // var p1 = new Promise((resolve, reject) => {
    //   request(options, function(error, response, body) {
    //     var artistCurrentString;
    //     if (!error && response.statusCode == 200) {
    //       let object = JSON.parse(body);
    //       console.log("OBJETO", object.item.album.artists[0].name);
    //       artistCurrentString = object.item.album.artists[0].name;
    //       resolve(artistCurrentString);
    //     } else {
    //       reject(err => console.log('ERROR reject in requestEmotion promise: ', err));
    //       console.log('ERROR CALLBACK: ', error);
    //     }
    //   });
    // });
    //
    // return p1.then(function(artistCurrentString) {
    //   return artistCurrentString;
    // }, function(err) {
    //   return console.log(err, "RETURN"); // Error: "It broke"
    // });

    // p.then(function() {



    // p1.then(function(value) {
    //     return artistCurrentString;
    //     // console.log("Funciona? Player", this.artistCurrentString);
    //   }
    // 	/* do something with the result */
    // }).catch(function() {
    // 	/* error :( */
    // return artistCurrentString;
  }
  request(options, callback);
};

playlistCurrent = function() {

  var request = require('request');



  var options = {
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    headers: headers
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      let object = JSON.parse(body);
      let arrayName = [];
      let arrayTrack = [];

      for (i = 0; i < object.items.length; i++) {
        console.log(object.items[i].track.name + " - " + object.items[i].track.artists[0].name + " con id ", i);
        arrayName.push(object.items[i].track.name);
      }


      // for (i = 0; i < object.items.length; i++) {
      //
      //   const newCurrentSpotifyPlaylist = CurrentSpotifyPlaylist({
      //     SongName: object.items[i].track.name,
      //     ArtistName: object.items[i].track.artists[0].name,
      //     idOrder:i
      //   }).save();
      // }
      console.log(arrayName);
      CurrentSpotifyPlaylist.find({
          SongName: {
            $exists: true,
            $in: arrayName
          }
        }, {
          SongName: 1,
          _id: 0
        },

        (err, cs) => {
          if (err) return handleError(err);
          existingSongs = cs.map((e) => {
            return e.toString().slice(13, e.toString().length - 3);
          });
          leftMusics = arrayName.filter((e) => {
            return existingSongs.indexOf(e) === -1;
          });
          console.log(leftMusics);
        });
        CurrentSpotifyPlaylist.find({
            SongName: {
              $exists: true,
              $in: arrayName
            }
          }, {
            SongName: 1,
            _id: 0
          },

          (err, cs) => {
            if (err) return handleError(err);
            existingSongs = cs.map((e) => {
              return e.toString().slice(13, e.toString().length - 3);
            });
            leftMusics = arrayName.filter((e) => {
              return existingSongs.indexOf(e) === -1;
            });
            console.log(leftMusics);
          });
    }
  }
  request(options, callback);
};


module.exports.nextSong = nextSong;
module.exports.previousSong = previousSong;
module.exports.pause = pause;
module.exports.play = play;
module.exports.artistCurrent = artistCurrent;
module.exports.playlistCurrent = playlistCurrent;
