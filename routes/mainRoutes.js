// handles main routes

const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

//GET /about: displays about page to user
router.get("/about", mainController.about);

//GET /: displays contact page to user
router.get("/contact", mainController.contact);

module.exports = router;