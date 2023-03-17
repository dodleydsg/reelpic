const dotenv = require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Successfully connected to Database");
  }
);

// Catch errors after initial connection
mongoose.connection.on("error", (err) => {
  console.log(err);
});
// Redis connection

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
