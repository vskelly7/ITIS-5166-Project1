const Event = require('../models/event')

// check if user is guest
exports.isGuest = (req, res, next) => {
  if (!req.session.user) {
    next()
  } else {
    req.flash('error', 'You are logged in already')
    res.redirect('/users/profile')
  }
}

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) {
		next();
	} else {
		req.flash("error", "You need to log in first");
		res.redirect("/users/login");
  }
}

// check if user is author of event
exports.isHost = (req, res, next) => {
  let id = req.params.id
  Event.findById(id)
    .then(event => {
      if (event) {
        if (event.host === req.session.user) {
          next()
        } else {
          let err = new Error('Unauthorized to access the resource')
          err.status = 401
          next(err)
        }
      } else {
       let err = new Error("Cannot find a event with id " + id);
				err.status = 404;
				next(err);
      }
    })
    .catch(err => next(err))
}