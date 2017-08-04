const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CurrentSpotifySchema = new Schema({
  currentSong: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const CurrentSpotify = mongoose.model('CurrentSpotify', CurrentSpotifySchema);
module.exports = CurrentSpotify;
