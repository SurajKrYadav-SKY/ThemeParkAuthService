const express = require("express");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  PORT,
  ORIGIN1,
  PROFILE_UPLOAD_DIR,
  ORIGIN2,
} = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const path = require("path");

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [ORIGIN1, ORIGIN2],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/profiles", express.static(PROFILE_UPLOAD_DIR));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
