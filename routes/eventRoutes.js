// handles all requests associated with events. This module should include all 7 RESTful routes.

const express = require("express");
const controller = require('../controllers/eventController');

const router = express.Router();

//GET /events: displays all events to the user

router.get("/", (req, res) => {
	res.render("events/index.ejs", { title: "events" });
});

//GET /events/new: send html form for creating new event

router.get("/new", (req, res) => {
    res.render("events/newEvent", { title: "new event" });
});

//POST /events: create a new event
/* TODO : 
  create form link
*/
// router.post("/", (req, res) => {
//  	res.send("Created a new event");
// });


//GET /events/:id: send details of event identified by id

router.get('/:id', controller.show);

//GET /events/:id/edit: send the html form for editing an existing event
/* TODO : 
  create form and populate with existing information
  link after
*/
router.get('/:id', controller.show);

//PUT /events/:id: update the event identified by id
/* TODO :
  Update event with matching id
*/
router.put("/:id", (req, res) => {
	res.send("update event with id ", req.params.id);
});

//DELETE /events/:id: delete the event identified by id
/* TODO :
  remove event from listing/DB
*/
router.delete("/:id", (req, res) => {
	res.send("update event with id ", req.params.id);
});

module.exports = router;