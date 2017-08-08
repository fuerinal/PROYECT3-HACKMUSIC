const express = require('express');
const refresh = require('spotify-refresh');
refreshtoken = function() {
  var refreshToken = 'BQBAE9bXGwq6lTC1sUMV7SdC0NA4K51dBqonsVKq62skOjIU6vrPEA4HaUoRI9y2lqs8-JTVoKtHCgJL6jdTTbdnbecprF-QDpfY3KLnNyPAdyjWfVZxkzXw9A-jMICUL_cNLciUJm-KSxf5Io1VWM8VZ69Fy_W4IFIMAhztgOjf_xZtPh6kHlyD5_5ne3u8zh2d595VuDNZuMQs13_61KmByUezTDE7ThOZC00ykcIxoqmSe0Cs2aYPp-SQOsabK3Lu94kbBsWq5VwvYWW2W3QZXoWNNVsRQ5Nmul-IiqMBIV3uItWmwzj70QSFdA2kIBEDag';

  var clientId = 'c854cd66fe434ef2ba7201ef796f28c2';
  var clientSecret = '0fd8d3d367aa4a93afecfe9bf55edbd8';
  var redirectUri = 'http://localhost:3000/login/spotify/return';



  refresh(refreshToken, clientID, clientSecret, function(err, res, body) {
    if (err) return;
    body = json.parse(body);
    console.log(JSON.stringify(body));
  });
};

module.exports.refreshtoken = refreshtoken;
