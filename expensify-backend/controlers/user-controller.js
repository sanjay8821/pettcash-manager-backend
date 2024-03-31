const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utlis/validator");

const categories = [
  { icon: "Housing", label: "Housing" },
  { icon: "Shoping", label: "Shoping" },
  { icon: "Transportation", label: "Transportation" },
  { icon: "Food", label: "Food" },
  { icon: "Medical/Healthcare", label: "Medical/Healthcare" },
  { icon: "Default", label: "Default" },
];

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ err: "User already exists" });
    }

    if (!validateName(name)) {
      return res.status(400).json({
        err: "Invalid user name: name must be longer than two characters and must not include any numbers or special characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Error: Invalid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
      categories,
    });

    await user.save();

    return res.status(201).json({ message: "Welcome to expenser" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length == 0) {
      return res.status(400).json({ err: "credentials does not match" });
    }

    if (password.length == 0) {
      return res.status(406).json({ err: "credentials does not match" });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ err: "user not exists" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).json({ err: "credentials does not match" });
    }

    const payload = { user: { _id: existingUser._id } };

    const bearerToken = await jwt.sign(payload, process.env.JWT_SECRETE);

    return res
      .status(200)
      .json({ message: "Login  successful", bearerToken, user: existingUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
