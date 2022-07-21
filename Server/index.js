const express = require("express");
const mongoose = require("mongoose");

const { HOST, PORT, DB } = require("./config");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(authRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
