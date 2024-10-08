const model = require("../models/event");

// GET /events : displays all events to the user
exports.index = (req, res) => {
	let events = model.find();
	res.render("./events/index", { events, title: "events" });
};

// GET /events/new : send HTML form for creating a new event
exports.new = (req, res) => {
	res.render("./events/newEvent", { title: "new event" });
};

// POSSIBLY MAIN

// POST /events : create a new events
/* TODO : 
  create form link to database
	might need to clean form information
	if form valid add entry
*/
exports.create = (req, res) => {
		// res.send("created a new event");
	let event = req.body;
	event.image = '/img/' + req.file.filename;
		model.save(event);
		res.redirect("/events");
};

// GET /events/:id : send details of event identified by ID
exports.show = (req, res, next) => {
	let id = req.params.id;
	let event = model.findById(id);
	if (event) {
		res.render("./events/event.ejs", { event, title: "event" });
	} else {
		let err = new Error('Cannot find a event with id ' + id)
		err.status = 404
		next(err)
	}
};

// GET /events/:id/edit : send html form for editing existing event
/* TODO : 
  populate form with existing information
  put to /events/:id
*/
exports.edit = (req, res) => {
	res.send("send the edit form");
};

// PUT /events/:id : update the event identified by id
/* TODO :
  Update event with matching id in database
	reroute somewhere
		- probably /events
*/
exports.update = (req, res) => {
	res.send("update event with id " + req.params.id);
};

// DELETE /events/:id : deletes the event identified by id
/* TODO :
  remove event from DB
	probably want to put a confirmation somewhere
		- Could make a confirmation pop up on button click inside of event
*/
exports.delete = (req, res) => {
	res.send("delete event with id " + req.params.id);
};
