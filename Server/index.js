const express = require("express");

const PORT = 3000;
const HOST = "localhost";

const app = express();

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
