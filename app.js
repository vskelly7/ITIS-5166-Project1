const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");

ejs.openDelimiter = "[";
ejs.closeDelimiter = "]";

const app = express();
let port = 3000;
let host = "localhost";

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.render("index.ejs", { title: "home" });
});

app.get("/events", (req, res) => {
	res.render("events.ejs", { title: "events" });
});

app.get("/events/create", (req, res) => {
	res.render("newEvent.ejs", { title: "new event" });
});

app.get("/events/:id", (req, res) => {
	res.render("event.ejs", { title: "event" });
});

app.listen(port, host, () => {
	console.log("The server is running at port", port);
});
