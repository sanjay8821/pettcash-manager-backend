const express = require("express");
const router = express.Router();

const { verifyUser } = require("../controlers/verify-user-controller");

router.get("/", verifyUser);

module.exports = router;
