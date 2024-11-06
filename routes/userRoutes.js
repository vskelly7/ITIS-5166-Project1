const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

//render new user page at /users/new
router.get('/new', controller.new);

//create new user
router.post('/new', controller.newUser);

//get login page at /users/login
router.get('/login', controller.login);

//process login request
router.post('/login', controller.processLogin);

//get profile
router.get('/profile', controller.profile);

//logout request
router.use('/logout', controller.logout);

module.exports = router;