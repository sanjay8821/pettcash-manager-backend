const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
