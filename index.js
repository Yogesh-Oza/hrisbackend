const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const corsSetup = require("./middlewares/corsSetup");
const databaseConfiguration = require("./middlewares/databaseConfiguration");
const publicRoutes = require("./routes/publicRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

// view engine setup
app.use(cors(corsSetup));
app.use(databaseConfiguration);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/public", publicRoutes);
app.use("/api/private", protectedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

console.log("newcode");
