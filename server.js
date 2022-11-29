const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const { HOST_DB, PORT = 3000 } = process.env;
mongoose
  .connect(HOST_DB)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });