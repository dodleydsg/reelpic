const dotenv = require("dotenv").config({ path: "./.env" });
const app = require("./app");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.NODE_ENV === 'development' ? process.env.LOCAL_MONGODB_URI : process.env.ONLINE_MONGODB_URI 

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to Database");
  })
  .catch((error) => {
    throw new Error("Couldn't connect to the database, check your connection");
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
