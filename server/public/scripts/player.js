console.log("ready!");
const request = require('request');
const express = require('express');
const CurrentSpotify = require('../../models/CurrentSpotify');
const CurrentSpotifyPlaylist = require('../../models/CurrentSpotifyPlaylist');


var playlistlenght;
let e = 1;
console.log("ENTRA en player PUBLIC");
var headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAPEnx9-2tMTP-eVMJpi_IMr3AxjL4O9rf2Wjf49N_c1RX8quQ73EWujItEd1yw9hKm6G4xJ11CE9G6i81DIS0acqKzSF00Z7FDMvIIuHdl_ijhPaBNsCHGIN8ptE1WWKT9HyfCluK6NTySDIz0GajiCt0QBzQOXTknto-MLnBj3U8s6qaT8vGsNbd4bCXvCU5ur8XoHp3CxwHXY7XCJa9pIuVon7y-NZeufQvyrW9lTOeAEhIe-JiM99AYFXuhKirAG1C0aEDRgiacm6EKJ92xmu8EXyYjRhKyGQkgEaGt6Pt2LjES_6a8NFnwWyJgURyiGQ'
};
var headersOther = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQAPEnx9-2tMTP-eVMJpi_IMr3AxjL4O9rf2Wjf49N_c1RX8quQ73EWujItEd1yw9hKm6G4xJ11CE9G6i81DIS0acqKzSF00Z7FDMvIIuHdl_ijhPaBNsCHGIN8ptE1WWKT9HyfCluK6NTySDIz0GajiCt0QBzQOXTknto-MLnBj3U8s6qaT8vGsNbd4bCXvCU5ur8XoHp3CxwHXY7XCJa9pIuVon7y-NZeufQvyrW9lTOeAEhIe-JiM99AYFXuhKirAG1C0aEDRgiacm6EKJ92xmu8EXyYjRhKyGQkgEaGt6Pt2LjES_6a8NFnwWyJgURyiGQ',
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
    headers: headersOther,
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
            //console.log(removed);
          });

          const newCurrentSpotify = CurrentSpotify({
            currentSong: object.item.name + " of " + object.item.album.artists[0].name
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
    //       reject(err => console.log('ERROR reject in promisePlaylist promise: ', err));
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






  var options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    headers: headers
  };

  // var p = new Promise(function(resolve, reject) {
  // p1 = new Promise(function(resolve, reject) {

  let promisePlaylist = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let object = JSON.parse(body);
        let arrayName = [];
        let arrayTrack = [];
        let array;
        //console.log(object.items[0].track.artists[0].name);

        for (i = 0; i < object.items.length; i++) {
          //console.log(object.items[i].track.name + " - " + object.items[i].track.artists[0].name + " con id ", i);
          arrayName.push(object.items[i].track.name + " of " + object.items[i].track.artists[0].name);
        }
        playlistlenght = object.items.length;

        resolve(array = arrayName);
      } else {
        reject(err => console.log('ERROR reject in promisePlaylist promise: ', err));
        console.log('ERROR: ', error);
      }
    });
  });
  return promisePlaylist.then(array => {
    return array;
  });
};
reorder = function(i) {
  var request = require('request');
  console.log("jejejejejejejeje", i);


  console.log(e);
  console.log(playlistlenght);



  var dataString = `{"range_start":${i},"range_length":1,"insert_before":${e}}`;

  var options = {
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    method: 'PUT',
    headers: headersOther,
    body: dataString
  };
  e++;
  if (e == playlistlenght) {
    e = 1;

  }

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);

};
setfirst = function(index) {
  var request = require('request');
  console.log("jejejejejejejeje", index);


  console.log(index, "setfirst i");
  var dataString = `{"range_start":${index},"range_length":1,"insert_before":0}`;

  var options = {
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    method: 'PUT',
    headers: headersOther,
    body: dataString
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
module.exports.artistCurrent = artistCurrent;
module.exports.playlistCurrent = playlistCurrent;
module.exports.reorder = reorder;
module.exports.setfirst = setfirst;
