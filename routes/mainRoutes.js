// handles main routes

const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

//GET /about: displays about page to user
router.get("/about", mainController.about);

//GET /contact: displays contact page to user
router.get("/contact", mainController.contact);

//GET /: displays the homepage"
router.get("/", mainController.index);

module.exports = router;