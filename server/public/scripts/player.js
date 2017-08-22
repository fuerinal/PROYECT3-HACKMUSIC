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
  'Authorization': 'Bearer BQD2soHQ0NAc-9LR7BYvcW5TYRKL1zVhsA_GhV_E41fqf-kF2BVbHXnJmCUfFaXmAJ4mUF_JeRiuOIPdOjp2YrpNtsYZLMhHWQ1Wfs1b0I6MM7e1MBDPHw0PLYYUCZHIf0wCG2TZuoWFeVlOBTBzr-FAAUWQi5OxqwxfBgJh-r237tcfw_LfG-l8JfmdG7pXlmRwGT1WWx8ge2NForw2bCNCDKwrz9F8DwCuZXwYLsXZXx1h7Vy_kAVf2izXp0qio2wFj0lofq4Qu3VZ4EFYMcOxEL5iQOR3ZYZUFKVspSCujIg9b8Hl9YSlPL6MB5QjyMLfgw'
};

var headersOther = {
  'Accept': 'application/json',
  'Authorization': 'Bearer BQD2soHQ0NAc-9LR7BYvcW5TYRKL1zVhsA_GhV_E41fqf-kF2BVbHXnJmCUfFaXmAJ4mUF_JeRiuOIPdOjp2YrpNtsYZLMhHWQ1Wfs1b0I6MM7e1MBDPHw0PLYYUCZHIf0wCG2TZuoWFeVlOBTBzr-FAAUWQi5OxqwxfBgJh-r237tcfw_LfG-l8JfmdG7pXlmRwGT1WWx8ge2NForw2bCNCDKwrz9F8DwCuZXwYLsXZXx1h7Vy_kAVf2izXp0qio2wFj0lofq4Qu3VZ4EFYMcOxEL5iQOR3ZYZUFKVspSCujIg9b8Hl9YSlPL6MB5QjyMLfgw',
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
  var options = {
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    headers: headersOther
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
  var options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    headers: headers
  };
  let promisePlaylist = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let object = JSON.parse(body);
        let arrayName = [];
        let arrayTrack = [];
        let array;
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
    //console.log(array);
    return array;
  });
};

playlistdata = function() {
  var options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8',
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
  var request = require('request');
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
  return e;
};

setfirst = function(index) {

  console.log("jejejejejejejeje", index);
  console.log("->>>>>>>>>>>>>>", e);
  console.log(index, "setfirst i");
  var dataString = `{"range_start":${index},"range_length":1,"insert_before":0}`;
  var options = {
    url: 'https://api.spotify.com/v1/users/1126614111/playlists/4STLVHeKRhpQkBQ0xkyBL8/tracks',
    method: 'PUT',
    headers: headersOther,
    body: dataString
  };
  if (e >= playlistlenght) {
    e = 1;
  }
  let promiseSetFirstdata = new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        let object ;

        resolve(object= JSON.parse(body));
      } else {
        reject(err => console.log('ERROR reject in promiseSetFirst promise: ', err));
        console.log('ERROR: ', error);
      }
    });
  });
  return promiseSetFirstdata.then(array => {
    return e;
  });
};

setlast = function() {
  var playlistlenghtScope = playlistlenght - 1;
  var request = require('request');
  var dataString = `{"range_start":1,"range_length":1,"insert_before":${playlistlenghtScope}}`;
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
module.exports.playlistdata = playlistdata;
module.exports.reorder = reorder;
module.exports.setfirst = setfirst;
module.exports.setlast = setlast;
