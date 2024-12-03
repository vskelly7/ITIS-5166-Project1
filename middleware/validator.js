<<<<<<< HEAD
//check if route parameter is valid
exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    } 
    next();
};
=======
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
	).isLength({ min: 8, max: 64 }),
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
	).isLength({ min: 8, max: 64 }),
];

exports.validateEvent = [
	body("title", "Title cannot be empty").notEmpty().trim().escape(),
	body("location", "Location cannot be empty").notEmpty().trim().escape(),
	body("start", "Start must be a valid Date")
		.notEmpty()
		.trim()
		.isISO8601()
		.isAfter(new Date())
		.escape(),
	body("end", "Start must be a valid Date")
		.notEmpty()
		.trim()
		.isISO8601()
		.escape(),
	body('details', 'Details must be at least 10 characters').trim().isLength({min: 10}).escape()
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
>>>>>>> upstream/main
