const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: ['Student', 'Professor', 'Admin', 'Developer'],
      default: 'Student',
    },
    profilePicture: { type: String, default: '' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const User = mongoose.model('User', UserSchema);

module.exports = { User };