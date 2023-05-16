const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
