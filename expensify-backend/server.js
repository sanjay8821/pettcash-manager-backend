const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
require("dotenv").config();

const transactionRoute = require("./routes/transactionRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const verifyUser = require("./routes/verifyUser");
const isAuthenticated = require("./middlewares/auth");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("welcome to the webpage");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/transaction", isAuthenticated, transactionRoute);
app.use("/api/v1/verifyUser", isAuthenticated, verifyUser);
app.use("/api/v1/category", isAuthenticated, categoryRoute);

connectDb();
app.listen(PORT, () => {
  console.log("server is running port 4000");
});
