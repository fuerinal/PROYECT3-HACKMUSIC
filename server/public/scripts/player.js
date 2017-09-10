console.log("ready!");
const request = require('request');
const express = require('express');
const CurrentSpotify = require('../../models/CurrentSpotify');
const CurrentSpotifyPlaylist = require('../../models/CurrentSpotifyPlaylist');


let playlistlenght;
let token='BQCYR-ry7piis6D77WtwW2mewDzocMZHuwLg227jNM_PjbjqzPxBeKXlUVMJk8nXDkktSZAiXItgvBS19kdVNI_Z6UFihuU9dQxY9N6y0Ex9aHIUepT6hWg67VGndgoNrcfTBaUIfqgIQU6Ohejxs5cKH7q8Pfwrww-lf5XqPL74jj_SMb_RAVQDsOTt1bBmnOHo3tiAgBRSNIZcbAxGXeGrE3hzX3dykTHw_yO5wolrBFXb-q9_UxcZBaGbUEjuArtsfNeiWskZ18h6L42KDsPod_tejqE8rl5ylGRiyV4Q5OcnX_ACBsZw1ij0qS_M87qxsQ';
let e = 1;
let playlist="4STLVHeKRhpQkBQ0xkyBL8";

console.log("ENTRA en player PUBLIC");

let headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`
};

let headersOther = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
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
artistCurrent = function() {
  let options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/player',
    headers: headers
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      let object = JSON.parse(body);
      CurrentSpotify.find({
        'currentSong': `${object.item.album.artists[0].name}`
      }, (err, cs) => {
        if (err) return handleError(err);
        if (cs[0] === undefined) {
          CurrentSpotify.remove(function(err, removed) {});
          const newCurrentSpotify = CurrentSpotify({
            currentSong: object.item.name + " of " + object.item.album.artists[0].name
          }).save();
        } else {}
      });
      artistCurrentString = object.item.album.artists[0].name;
    }
  }
  request(options, callback);
};

playlistCurrent = function() {
  let options = {
    method: 'GET',
    url: `https://api.spotify.com/v1/users/1126614111/playlists/${playlist}/tracks`,
    headers: headers
  };
  let promisePlaylist = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let object = JSON.parse(body);
        let arrayName = [];
        let arrayTemp = [];
        let array;
        playlistlenght = object.items.length;
        for (i = 0; i < object.items.length; i++) {
          //console.log(object.items[i].track.name + " - " + object.items[i].track.artists[0].name + " con id ", i);
          arrayName.push(object.items[i].track.name + " of " + object.items[i].track.artists[0].name);
        }
        let arrayImage = [];

        for (i = 0; i < object.items.length; i++) {
          arrayImage.push(object.items[i].track.album.images[1].url);
        }
        arrayTemp.push(arrayName);
        arrayTemp.push(arrayImage);

        resolve(array = arrayTemp);
      } else {
        reject(err => console.log('ERROR reject in promisePlaylist promise: ', err));
        console.log('ERROR: ', error);
      }
    });
  });
  return promisePlaylist.then(array => {
    //console.log(array);
    return array;
  });
};


playlistdata = function() {
  let options = {
    method: 'GET',
    url: `https://api.spotify.com/v1/users/1126614111/playlists/${playlist}`,
    headers: headers
  };
  let promisePlaylistdata = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let object = JSON.parse(body);
        let array;
        let arraytemp = [];
        arraytemp.push(object.name);
        arraytemp.push(object.images[0].url);
        arraytemp.push(object.owner.display_name);
        resolve(array = arraytemp);
      } else {
        reject(err => console.log('ERROR reject in promisePlaylistdata promise: ', err));
        console.log('ERROR: ', error);
      }
    });
  });
  return promisePlaylistdata.then(array => {
    return array;
  });
};

reorder = function(i) {
  let request = require('request');
  let dataString = `{"range_start":${i},"range_length":1,"insert_before":${e}}`;
  let options = {
    url: `https://api.spotify.com/v1/users/1126614111/playlists/${playlist}/tracks`,
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
  return e;
};

setfirst = function(index) {

  console.log("jejejejejejejeje", index);
  console.log("->>>>>>>>>>>>>>", e);
  console.log(index, "setfirst i");
  let dataString = `{"range_start":${index},"range_length":1,"insert_before":0}`;
  let options = {
    url: `https://api.spotify.com/v1/users/1126614111/playlists/${playlist}/tracks`,
    method: 'PUT',
    headers: headersOther,
    body: dataString
  };
  e--;
  if (e <=0) {
    e = 1;
  }
  if (e >= playlistlenght) {
    e = 1;
  }



    let promisePlaylistdata = new Promise((resolve, reject) => {
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          let message;

          console.log(body);
          resolve(message=body);
        } else {
          reject(err => console.log('ERROR reject in promisePlaylistdata promise: ', err));
          console.log('ERROR: ', error);
        }
      });
    });
    return promisePlaylistdata.then(message => {
      return message;
    });
};

setlast = function() {
  let playlistlenghtScope = playlistlenght - 1;
  let dataString = `{"range_start":1,"range_length":1,"insert_before":${playlistlenghtScope}}`;
  let options = {
  url: `https://api.spotify.com/v1/users/1126614111/playlists/${playlist}/tracks`,
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
sendIndex = function() {
  return e;
};


module.exports.nextSong = nextSong;
module.exports.previousSong = previousSong;
module.exports.pause = pause;
module.exports.play = play;
module.exports.artistCurrent = artistCurrent;
module.exports.playlistCurrent = playlistCurrent;
module.exports.playlistdata = playlistdata;
module.exports.reorder = reorder;
module.exports.setfirst = setfirst;
module.exports.setlast = setlast;
module.exports.sendIndex = sendIndex;
