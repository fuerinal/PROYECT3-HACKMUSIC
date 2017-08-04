console.log("ready!");
const request = require('request');
const express = require('express');
const CurrentSpotify = require('../../models/CurrentSpotify');
const CurrentSpotifyPlaylist = require('../../models/CurrentSpotifyPlaylist');



console.log("ENTRA en player PUBLIC");
var headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAsRR2_Og_TwwetSbq8f5l059VII7CvFhDwztInzZ8o4t02DN27gPIymxLkkfzeQoEHMNuVXSIuMQvqLu9RhrCjrl6hW3kzWMnOH8CSvPK7hGgCVVXz0KBuJ9r4GZySh1_r9w_sDff6cl2FV7kguaGuXKnCFlDElBsQSHfWU6A65lKcvbxrEqbvZnZZyNffAJ_RMfvOem2z14YMx6QnKaUDah9Qp1Lm3V13lLZjx1S7w0QXJ9DsbvbsgP1dyxZArKLctRe9qXYMwfMIajC0lVX_wiFa4Q2ydfstHm2QVDnRAfcHlRmTX8XZgE6VX0KOD9yN6w'
};
var headersPause = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAsRR2_Og_TwwetSbq8f5l059VII7CvFhDwztInzZ8o4t02DN27gPIymxLkkfzeQoEHMNuVXSIuMQvqLu9RhrCjrl6hW3kzWMnOH8CSvPK7hGgCVVXz0KBuJ9r4GZySh1_r9w_sDff6cl2FV7kguaGuXKnCFlDElBsQSHfWU6A65lKcvbxrEqbvZnZZyNffAJ_RMfvOem2z14YMx6QnKaUDah9Qp1Lm3V13lLZjx1S7w0QXJ9DsbvbsgP1dyxZArKLctRe9qXYMwfMIajC0lVX_wiFa4Q2ydfstHm2QVDnRAfcHlRmTX8XZgE6VX0KOD9yN6w',
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
      let array=[];

      for (i = 0; i < object.items.length; i++) {
        console.log(object.items[i].track.name + " - " + object.items[i].track.artists[0].name + " con id ", i);
        array.push(object.items[i].track.name);
      }
      CurrentSpotifyPlaylist.find(
        {SongName: { $in: array }},

      // function functionName() {
      //   //'currentSong': `${object.items[i].track.name}`
      //   let obj={};
      //
      //   for (i = 0; i < object.items.length; i++) {
      //     console.log(object.items[i].track.name + " - " + object.items[i].track.artists[0].name + " con id ", i);
      //     obj.SongName=object.items[i].track.name;
      //   }
      //
      //
      // },

       (err, cs) => {
        if (err) return handleError(err);
        if (cs[0] === undefined) {
          console.log("undeffffffined bien");


      // for (i = 0; i < object.items.length; i++) {
      //
      //   const newCurrentSpotifyPlaylist = CurrentSpotifyPlaylist({
      //     SongName: object.items[i].track.name,
      //     ArtistName: object.items[i].track.artists[0].name,
      //     idOrder:i
      //   }).save();
      // }


      } else {
        console.log("Cambios",cs);
        // console.log("Sin cambios", cs);
      }
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
