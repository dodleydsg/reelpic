const dotenv = require("dotenv").config({ path: "./.env" });
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database");
  })
  .catch((error) => {
    throw new Error("Couldn't connect to the databse, check your connection");
  });

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port", process.env.PORT);
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
