const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  description: String,
  user_id: mongoose.Types.ObjectId,
  category_id: mongoose.Types.ObjectId,
  date: { type: Date, default: new Date() },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = new mongoose.model("Transaction", transactionSchema);
