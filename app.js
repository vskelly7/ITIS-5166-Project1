const flash = require('connect-flash');
const express = require("express");
const ejs = require("ejs");
const eventRoutes = require("./routes/eventRoutes");
const mainRoutes = require("./routes/mainRoutes");
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const mongoStore = require('connect-mongo');
const morgan = require("morgan");
const session = require('express-session');
const userRoutes = require('./routes/userRoutes')

ejs.openDelimiter = "[";
ejs.closeDelimiter = "]";

//creating app
const app = express();

//configuring app
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");
const mongUri = 'mongodb+srv://vkelly7:nbad123@nbadproject.a6f5w.mongodb.net/nbad-project3?retryWrites=true&w=majority&appName=NBADproject';

//connecting database
mongoose.connect(mongUri,
	{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
//start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
	});
})
.catch(err=>console.log(err.message));

//mounting middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverride('_method'));

app.use(session({
	secret: 'TO REPLACE THIS',
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 60*60*1000},
	store: new mongoStore({mongoUrl: 'mongodb+srv://vkelly7:nbad123@nbadproject.a6f5w.mongodb.net/nbad-project3?retryWrites=true&w=majority&appName=NBADproject'})
}));

app.use(flash());

app.use((req, res, next)=>{
	console.log(req.session);
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//setup routes
app.use("/events", eventRoutes);
app.use('/', mainRoutes)
app.use('/users', userRoutes);

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
