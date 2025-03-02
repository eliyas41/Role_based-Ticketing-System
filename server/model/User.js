// user Schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
}, {
  timestamps: true,
});

// Compile the schema to model
const User = mongoose.model('User', UserSchema);

export default User;