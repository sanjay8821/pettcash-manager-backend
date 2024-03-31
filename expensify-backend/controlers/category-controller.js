const UserModel = require("../models/userModel");
const destroy = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const categories = req.user.categories;
    const updatedCategories = categories.filter(
      (category) => category._id != id
    );
    const user = await UserModel.updateOne(
      { _id: req.user._id },
      { $set: { categories: updatedCategories } }
    );

    return res.status(200).json({ message: "category deleted", user });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { label, icon } = req.body;
    const perev = UserModel.find();
    const user = await UserModel.updateOne(
      { _id: req.user._id },
      { $set: { categories: [...req.user.categories, { label, icon }] } }
    );
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const { label, icon } = req.body;

    const user = await UserModel.updateOne(
      { _id: req.user._id },
      {
        $set: {
          categories: req.user.categories.map((category) => {
            if (category._id == id) {
              return { label, icon };
            }
            return category;
          }),
        },
      }
    );

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { destroy, create, update };
