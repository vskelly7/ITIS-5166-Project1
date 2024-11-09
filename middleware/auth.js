const Event = require('../models/event');

//check if user is a guest -- "if user is guest, continue, otherwise redirect to profile page"
exports.isGuest = (req, res, next) => {
    if(!req.session.user) {  //"if there is no user in the session"
     return next();
    } else {
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {  
        return next();
       } else {
           req.flash('error', 'You need to log in first');
           return res.redirect('/users/login');
       }
};

//check if user if host/creator of the event
exports.isHost = (req, res, next) => {
    let id = req.params.id;
   Event.findById(id)
    .then(event=>{
        if(event) {
            if(event.host == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};