const express = require("express");
const connect = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT, ORIGIN } = require("./config/serverConfig");

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, async () => {
  console.log(`Server started at port: ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
