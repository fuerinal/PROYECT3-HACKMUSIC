const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CurrentSpotifyPlaylistSchema = new Schema({
  SongName: String,
  ArtistName:String,
  idOrder:Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const CurrentSpotifyPlaylist = mongoose.model('CurrentSpotifyPlaylist', CurrentSpotifyPlaylistSchema);
module.exports = CurrentSpotifyPlaylist;
