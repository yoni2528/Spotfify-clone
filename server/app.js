const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const spotifyRouter = require("./routers/spotifyRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("combined"));

app.use("/app/v1/spotify", spotifyRouter);

module.exports = app;
