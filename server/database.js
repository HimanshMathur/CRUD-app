const mongoose = require("mongoose");

const databaseConnection = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/book")
    .then(() => {
      console.log("Database connected successfully");
    })

    .catch((err) => {
      console.log("Error connecting to database", err);
    });
};
module.exports = databaseConnection;
