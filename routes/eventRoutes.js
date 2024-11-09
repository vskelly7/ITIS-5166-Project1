// handles all requests associated with events. This module should include all 7 RESTful routes.

const express = require("express");
const eventController = require("../controllers/eventController");
const { fileUpload } = require("../middleware/fileUpload");
const {isLoggedIn, isHost} = require('../middleware/auth');

const router = express.Router();

//GET /events: displays all events to the user
router.get("/", eventController.index);

//GET /events/new: send html form for creating new event
router.get("/new", isLoggedIn, eventController.new);

//POST /events: create a new event
router.post("/", fileUpload, isLoggedIn, eventController.create);

//GET /events/:id: send details of event identified by id
router.get("/:id", eventController.show);

//GET /events/:id/edit: send the html form for editing an existing event
router.get("/:id/edit", isLoggedIn, isHost, eventController.edit);

//PUT /events/:id: update the event identified by id
router.put("/:id", fileUpload, isLoggedIn, isHost, eventController.update);

//DELETE /events/:id: delete the event identified by id
router.delete("/:id", isLoggedIn, isHost, eventController.delete);

module.exports = router;
