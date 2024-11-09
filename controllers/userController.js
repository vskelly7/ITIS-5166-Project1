const User = require('../models/user');

//get the new user form
exports.new = (req, res)=> {
    res.render('user/new', {title: 'new user'});
};

//create new user
exports.newUser = (req, res)=>{
    let user = new User(req.body);
    user.email = user.email.toLowerCase()
    user.save()
    .then(()=>res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email address has been used');
            return res.redirect('/users/new');
        }
         next(err);
    });
};

//get login page
exports.login = (req, res)=>{
    res.render('user/login', {title: 'login'});
};

//process login request
exports.processLogin = (req, res)=>{
    //authenticate user's login req
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    //get user matching email
    User.findOne({email: email})
        .then(user=>{
            if(user) {
                //user found in db
                user.comparePassword(password)
                .then(result=>{
                    if(result) {
                        req.session.user = user._id;  //store user id in session
                        req.flash('success', 'You have successfully logged in.');
                        res.redirect('/users/profile', );
                    } else {
                        //console.log("wrong password");
                        req.flash('error', 'Wrong password');
                        res.redirect('/users/login');
                    }
                })
            } else {
                //console.log('wrong email address');
                req.flash('error', 'Wrong email address');
                res.redirect('/users/login');
            }
        })
        .catch()
};

//get profile
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    User.findById(id)
    .then(user=>res.render('user/profile', {title: 'profile',user}))
    .catch(err=>next(err));
};

//logout request
exports.logout = (req, res, next)=> {
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('/');
    });
};
