const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const eventRoutes = require("./routes/eventRoutes");

ejs.openDelimiter = "[";
ejs.closeDelimiter = "]";

const app = express();
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.render("index", { title: "home" });
});

app.use("/events", eventRoutes);

app.listen(port, host, () => {
	console.log("The server is running at port", port);
});
