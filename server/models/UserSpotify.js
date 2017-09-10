const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSpotifySchema = new Schema({
  name: String,
  id_Spotify:Number,
  token:String,
  image:String,
  email:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserSpotify = mongoose.model('UserSpotify', userSpotifySchema);

module.exports = UserSpotify;
