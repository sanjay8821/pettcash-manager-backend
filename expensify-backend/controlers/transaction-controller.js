const transactionModel = require("../models/transactionModel");

const index = async (req, res) => {
  try {
    const data = await transactionModel.aggregate([
      {
        $match: { user_id: req.user._id },
      },
      {
        $group: {
          _id: { $month: "$date" },
          transactions: {
            $push: {
              amount: "$amount",
              description: "$description",
              date: "$date",
              category_id: "$category_id",
            },
          },
          totalTransaction: { $sum: "$amount" },
        },
      },
    ]);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const create = async (req, res) => {
  const { amount, description, date, category_id } = req.body;

  const transaction = new transactionModel({
    amount,
    description,
    user_id: req.user._id,
    date,
    category_id,
  });

  await transaction.save();

  return res.status(200).json({ transaction });
};

const destroy = async (req, res) => {
  try {
    const id = req.params.transactionId;
    await transactionModel.deleteOne({ date: id });
    return res.status(200).json({ message: "successfully deleted" });
  } catch (error) {
    return res.json({ error });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.transactionId;
    await transactionModel.updateOne({ date: id }, { $set: req.body });
    return res.status(200).json({ message: "successfully updated" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { index, create, destroy, update };
