const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 7,
      max: 25,
    },
    password: {
      type: String,
      required: true,
      min: 7,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  // TODO: Save the time when user created or updated Account
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

// export default User;
