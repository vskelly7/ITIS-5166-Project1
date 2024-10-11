const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const eventRoutes = require("./routes/eventRoutes");
const mainRoutes = require("./routes/mainRoutes");
const methodOverride = require('method-override');

ejs.openDelimiter = "[";
ejs.closeDelimiter = "]";

const app = express();
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
	res.render("index", { title: "home"});
});

app.use("/events", eventRoutes);

app.get("/about", (req, res) => {
	res.render("about", {title: "about"});
});

app.get("/contact", (req,res) => {
	res.render("contact", {title: "contact"});
});

// 404
app.use((req, res, next) => {
	let err = new Error('The server cannot locate ' + req.url)
	err.status = 404
	next(err)
})

// error handler
app.use((err, req, res, next) => { // should be below all other middleware
	console.log(err.stack)
	if (!err.status) {
		err.status = 500;
		err.message = 'Internal server error';
	}

	res.status(err.status)
	res.render('error', {error: err, title: 'error'})
})

app.listen(port, host, () => {
	console.log("The server is running at port", port);
});
