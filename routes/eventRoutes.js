// handles all requests associated with events. This module should include all 7 RESTful routes.

const express = require("express");
const eventController = require("../controllers/eventController");
const { fileUpload } = require("../middleware/fileUpload");
const { validateId } = require('../middleware/validator')

const router = express.Router();

//GET /events: displays all events to the user
router.get("/", eventController.index);

//GET /events/new: send html form for creating new event
router.get("/new", eventController.new);

//POST /events: create a new event
router.post("/", fileUpload, eventController.create);

//GET /events/:id: send details of event identified by id
router.get("/:id", validateId, eventController.show);

//GET /events/:id/edit: send the html form for editing an existing event
router.get("/:id/edit", validateId, eventController.edit);

//PUT /events/:id: update the event identified by id
router.put("/:id", validateId, fileUpload, eventController.update);

//DELETE /events/:id: delete the event identified by id
router.delete("/:id", validateId, eventController.delete);

module.exports = router;
