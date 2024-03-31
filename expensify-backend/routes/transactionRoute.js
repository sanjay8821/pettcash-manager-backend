const express = require("express");
const transactionModel = require("../models/transactionModel");
const router = express.Router();

const {
  index,
  create,
  destroy,
  update,
} = require("../controlers/transaction-controller");

router.get("/", index);

router.post("/", create);

router.delete("/:transactionId", destroy);

router.patch("/:transactionId", update);

module.exports = router;
