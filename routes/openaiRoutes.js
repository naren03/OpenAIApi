const express = require("express");

const router = express.Router();

const {
	generateResponse,
	generateImage,
} = require("../controllers/openaiController");

// Route to generate text
router.post("/generateResponse", generateResponse);

// Route to generate image
router.post("/generateImage", generateImage);

module.exports = router;
