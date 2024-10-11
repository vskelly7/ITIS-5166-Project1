const model = require('../models/event');

exports.about = (req, res) => {
    res.render('about', { title: 'about' });
};

exports.contact = (req, res) => {
    res.render('contact', { title: 'contact' });
};

exports.index = (req, res) => {
	res.render("index", { title: "home"});
}