const model = require("../models/event");
const Rsvp = require("../models/rsvp");
const path = require("path");
const fs = require("fs");
const { DateTime } = require("luxon");

let categories = model.schema.path("category").enumValues;
function deleteImage(event) {
	fs.unlink(path.join(__dirname, "../public/", event.image), (err) => {
		if (err) {
			console.error("Failed to delete file:", err);
		}
	});
}

// GET /events : displays all events to the user
exports.index = (req, res, next) => {
	model
		.find()
		.then((events) =>
			res.render("./events/index", { events, title: "events", categories })
		)
		.catch((err) => next(err));
};

// GET /events/new : send HTML form for creating a new event
exports.new = (req, res) => {
	res.render("./events/newEvent", { title: "new event", categories });
};

// POST /events : create a new events
exports.create = (req, res, next) => {
	let event = new model(req.body);
	event.host = req.session.user;
	event.image = "/img/" + req.file.filename;
	console.log(event);
	event
		.save(event)
		.then(res.redirect("/events"))
		.catch((err) => {
			if (err.name === "ValidationError") {
				err.status = 400;
			}
			next(err);
		});
};

// GET /events/:id : send details of event identified by ID
exports.show = (req, res, next) => {
	let id = req.params.id;
	Promise.all([
		model.findById(id).populate("host", "firstName lastName").lean(),
		Rsvp.countDocuments({ event: id, status: 'YES' }),
	])
		.then(([event, count]) => {
			if (event) {
				let formatted = {
					...event,
					start: DateTime.fromJSDate(new Date(event.start)).toLocaleString(
						DateTime.DATETIME_SHORT
					),
					end: DateTime.fromJSDate(new Date(event.end)).toLocaleString(
						DateTime.DATETIME_SHORT
					),
				};
				res.render("./events/event", {
					event: formatted,
					title: "event",
					rsvps: count,
				});
			} else {
				let err = new Error("Cannot find event with id " + id);
				err.status = 404;
				next(err);
			}
		})
		.catch((err) => next(err));
};

//GET /events/:id/edit : send html form for editing existing story
exports.edit = (req, res, next) => {
	let id = req.params.id;
	model
		.findById(id)
		.lean()
		.then((event) => {
			if (event) {
				let newEvent = {
					...event,
					start: DateTime.fromJSDate(new Date(event.start))
						.toISO()
						.slice(0, 19),
					end: DateTime.fromJSDate(new Date(event.end)).toISO().slice(0, 19),
				};
				console.log(newEvent);
				res.render("./events/edit", {
					event: newEvent,
					title: "event",
					categories,
				});
			} else {
				let err = new Error("Cannot find an event with id " + id);
				err.status = 404;
				next(err);
			}
		})
		.catch((err) => next(err));
};

// PUT /events/:id : update the story identified by id
exports.update = (req, res, next) => {
	let event = req.body;
	event.image = "/img/" + req.file.filename;
	console.log(event);
	let id = req.params.id;

	model
		.findByIdAndUpdate(id, event, {
			useFindAndModify: false,
			runValidators: true,
		})
		.then((event) => {
			if (event) {
				deleteImage(event);
				req.flash("success", "Event successfully updated");
				res.redirect("/events/" + id);
			} else {
				let err = new Error("Cannot find event with id " + id);
				err.status = 404;
				next(err);
			}
		})
		.catch((err) => {
			if (err.name === "ValidationError") err.status = 400;
			next(err);
		});
};

// DELETE /events/:id : deletes the event identified by id
exports.delete = (req, res, next) => {
	let id = req.params.id;

	model
		.findByIdAndDelete(id, { useFindAndModify: false })
		.then((event) => {
			if (event) {
				deleteImage(event);
				req.flash("success", "Event successfully deleted");
				res.redirect("/events");
			} else {
				let err = new Error("Cannot find event with id " + id);
				err.status = 404;
				next(err);
			}
		})
		.catch((err) => next(err));
};

exports.rsvp = (req, res, next) => {
	let id = req.params.id;
	let user = req.session.user;
	let status = req.body.status;
	model.findById(id)
		.then(event => {
			if (event.host._id.toString() === user.toString()) {
				let err = new Error("Hosts cannot RSVP to their own event.")
				err.status = 401;
				return next(err);
			}
	Rsvp.findOneAndUpdate(
		{ event: id, user: user },
		{ status: status },
		{ upsert: true, new: true }
	)
		.then((rsvp) => {
			if (rsvp) {
				req.flash("success", "RSVP completed succesfully");
				res.redirect("/users/profile");
			} else {req.flash("error", "There was an issue with your RSVP.");
				res.redirect("back")};
		})
		
		.catch((err) => {
			req.flash("error", "There was an issue with your RSVP");
			next(err)});
	})
		.catch((err) => next(err));
};
