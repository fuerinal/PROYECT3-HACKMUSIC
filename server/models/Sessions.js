const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const sessionsSchema = new Schema({
  username: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Session = mongoose.model('Session', sessionsSchema);
module.exports = Session;
