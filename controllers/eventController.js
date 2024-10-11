const model = require("../models/event");
const { DateTime } = require("luxon");

// GET /events : displays all events to the user
exports.index = (req, res) => {
	let events = model.find();
	res.render("./events/index", { events, title: 'events' });
};

// GET /events/new : send HTML form for creating a new event
exports.new = (req, res) => {
	res.render("./events/newEvent", { title: "new event" });
};

// POST /events : create a new events
exports.create = (req, res) => {
	let event = req.body;
	event.image = '/img/' + req.file.filename;
		model.save(event);
		res.redirect("/events");
};

// GET /events/:id : send details of event identified by ID
exports.show = (req, res, next) => {
	let id = req.params.id;
	let event = model.findById(id);
	let formatted = {...event, start: DateTime.fromISO(event.start).toLocaleString(DateTime.DATETIME_SHORT), end: DateTime.fromISO(event.end).toLocaleString(DateTime.DATETIME_SHORT)}
	if (event) {
		res.render("./events/event", { event: formatted, title: "event" });
	} else {
		let err = new Error('Cannot find event with id ' + id)
		err.status = 404
		next(err)
	}
};

//GET /events/:id/edit : send html form for editing existing story
exports.edit = (req, res, next) => {
	let id = req.params.id;
	let event = model.findById(id);
	if (event) {
		console.log(event.start + ' ' + event.end)
		let newEvent = {...event, start: event.start.toString().slice(0, 16), end: event.end.toString().slice(0, 16)}
		res.render("./events/edit", { event: newEvent, title: "event" });
	} else {
		let err = new Error('Cannot find event with id ' + id)
		err.status = 404
		next(err)
	}
};

// PUT /events/:id : update the story identified by id
exports.update = (req, res) => { 
  let event = req.body;
	let id = req.params.id;

	if(model.updateById(id, event)) {
		res.redirect('/events/'+id);
	} else {
		let err = new Error('Cannot find event with id ' + id)
		err.status = 404
		next(err)
	}
};

// DELETE /events/:id : deletes the event identified by id
exports.delete = (req, res) => {
	let id = req.params.id;
	if (model.deleteById(id))
		res.redirect('/events');
	else {
		let err = new Error('Cannot find event with id ' + id)
		err.status = 404
		next(err)
	}
};