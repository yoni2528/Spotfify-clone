const express = require("express");
const spotifyController = require("../controllers/spotifyController");

const router = express.Router();

router.route("/").get(spotifyController.getToken);

module.exports = router;
