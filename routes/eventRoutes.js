// handles all requests associated with events. This module should include all 7 RESTful routes.

const express = require("express");
const eventController = require("../controllers/eventController");
const { fileUpload } = require("../middleware/fileUpload");
<<<<<<< HEAD
const {isLoggedIn, isHost} = require('../middleware/auth');
=======
const { validateId, validateEvent, validateResult } = require('../middleware/validator')
const { isHost, isLoggedIn} = require('../middleware/auth')
>>>>>>> upstream/main

const router = express.Router();

//GET /events: displays all events to the user
router.get("/", eventController.index);

//GET /events/new: send html form for creating new event
router.get("/new", isLoggedIn, eventController.new);

//POST /events: create a new event
<<<<<<< HEAD
router.post("/", fileUpload, isLoggedIn, eventController.create);
=======
router.post("/", isLoggedIn, fileUpload, eventController.create);
>>>>>>> upstream/main

//GET /events/:id: send details of event identified by id
router.get("/:id", validateId, eventController.show);

//GET /events/:id/edit: send the html form for editing an existing event
<<<<<<< HEAD
router.get("/:id/edit", isLoggedIn, isHost, eventController.edit);

//PUT /events/:id: update the event identified by id
router.put("/:id", fileUpload, isLoggedIn, isHost, eventController.update);

//DELETE /events/:id: delete the event identified by id
router.delete("/:id", isLoggedIn, isHost, eventController.delete);
=======
router.get("/:id/edit", isLoggedIn, validateId, isHost, eventController.edit);

//PUT /events/:id: update the event identified by id
router.put(
	"/:id",
	isLoggedIn,
	validateId,
	isHost,
	fileUpload,
	eventController.update
);

//DELETE /events/:id: delete the event identified by id
router.delete("/:id", isLoggedIn, validateId, isHost, eventController.delete);

router.post("/:id/rsvp", isLoggedIn, validateId, eventController.rsvp)
>>>>>>> upstream/main

module.exports = router;
