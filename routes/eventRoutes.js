const express = require("express");

const router = express.Router();

//GET /events: send all events to the user

router.get("/", (req, res) => {
	res.render("events", { title: "events" });
});

//GET /events/new: send html form for creating new event

router.get("/new", (req, res) => {
	res.render("newEvent", { title: "new event" });
});

//POST /events:create a new event
/* TODO : 
  create form 
  link
*/
router.post("/", (req, res) => {
	res.send("created a new event");
});

//GET /events/:id: send details of event identified by id

router.get("/:id", (req, res) => {
	res.render("event", { title: "event" });
});

//GET /events/:id/edit: send the html form for editing an existing event
/* TODO : 
  create form and populate with existing information
  link after
*/
router.get("/:id/edit", (req, res) => {
	res.send("send the edit form");
});

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
