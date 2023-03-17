const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const morgan = require("morgan");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const catalogueRoutes = require("./routes/catalogue.routes");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Routes

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", postRoutes);
app.use("/", commentRoutes);
app.use("/", catalogueRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

module.exports = app;
