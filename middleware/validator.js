const { body } = require("express-validator");
const { validationResult } = require("express-validator");

exports.validateId = (req, res, next) => {
	let id = req.params.id;
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		let err = new Error("Invalid story id");
		err.status = 400;
		return next(err);
	}
	next();
};

exports.validateSignUp = [
	body("firstName", "First name cannot be empty.").notEmpty().trim().escape(),
	body("lastName", "Last name cannot be empty.").notEmpty().trim().escape(),
	body("email", "Email must be a valid email address")
		.isEmail()
		.trim()
		.escape()
		.normalizeEmail(),
	body(
		"password",
		"Password must be at least 8 characters and at most 64 characters"
	).isLength({ min: 8, max: 64 }).trim(),
];

exports.validateLogIn = [
	body("email", "Email must be a valid email address")
		.isEmail()
		.trim()
		.escape()
		.normalizeEmail(),
	body(
		"password",
		"Password must be at least 8 characters and at most 64 characters"
	).isLength({ min: 8, max: 64 }).trim(),
];

exports.validateEvent = [
	body("title", "Title cannot be empty").notEmpty().trim().escape(),
	body("location", "Location cannot be empty").notEmpty().trim().escape(),
	body("start", "Start must be a valid Date")
		.notEmpty()
		.trim()
		.isISO8601()
		.isAfter(new Date().toISOString())
		.custom((value) => {
			const inputDate = new Date(value);
			const today = new Date();
			if (inputDate <= today) {
				throw new Error("Start date must be in the future.");
			}
			return true;
		})
		.escape(),
	body("end", "End must be a valid Date")
		.notEmpty()
		.trim()
		.isISO8601()
		.custom((value, { req }) => {
			const endDate = new Date(value);
			const startDate = new Date(req.body.start);
			if (endDate <= startDate) {
				throw new Error("End date must be after start date.");
			}
			return true;
		})
		.escape(),
	body('details', 'Details must be at least 10 characters').trim().isLength({min: 10}).escape()
];

exports.validateRsvp = [
	body("status", "RSVP requires a yes, no or maybe response.")
	.isIn(["YES", "NO", "MAYBE"])
	.trim()
	.escape()
];

exports.validateResult = (req, res, next) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		errors.array().forEach((error) => {
			req.flash("error", error.msg);
		});
		return res.redirect("back");
	} else {
		return next();
	}
};
