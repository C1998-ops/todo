require("dotenv").config({ path: ".env" });
const http = require("http");
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const { connectdb } = require("./Database/dbConn");
//cors options
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const PORT = process.env.PORT;
const router = require("./routes");
connectdb();
app.use(cors(corsOptions));
//middleware
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers["origin"]);
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(router);
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers["origin"]);
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(".netlify/functions/api", router);
server.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
module.exports.handler = serverless(server);
