const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
<<<<<<< HEAD
const {isGuest, isLoggedIn} = require('../middleware/auth');
=======
const { logInLimiter } = require('../middleware/rateLimiters')
const { isGuest, isLoggedIn } = require('../middleware/auth')
const { validateLogIn, validateSignUp, validateResult } = require('../middleware/validator')
>>>>>>> upstream/main

//render new user page at /users/new
router.get('/new', isGuest, controller.new);

//create new user
<<<<<<< HEAD
router.post('/new', isGuest, controller.newUser);
=======
router.post('/new', isGuest, validateSignUp, validateResult, controller.newUser);
>>>>>>> upstream/main

//get login page at /users/login
router.get('/login', isGuest, controller.login);

//process login request
<<<<<<< HEAD
router.post('/login', isGuest, controller.processLogin);
=======
router.post('/login', logInLimiter, isGuest, controller.processLogin);
>>>>>>> upstream/main

//get profile
router.get('/profile', isLoggedIn, controller.profile);

//logout request
router.use('/logout', isLoggedIn, controller.logout);

module.exports = router;