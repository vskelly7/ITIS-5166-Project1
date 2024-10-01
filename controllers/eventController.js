const model = require('../models/event');

// GET /events : displays all events to the user
exports.index = (req, res) => { 
    let events = model.find();
    res.render('./events/index.ejs', {events});
};


// GET /stories/new : send HTML form for creating a new story
// exports.new = (req, res) => {
//     res.send('send the new form');
// };

// POSSIBLY MAIN

// POST /stories : create a new stories
// exports.create = (req, res) => {
//     res.send('Created a new story');
// };

// GET /stories/:id : send details of event identified by ID
exports.show = (req, res) => {
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./events/event.ejs', {event, title: 'event'});
    } else {
        res.status(404).send('Cannot find story with id ' + id); 
    }
};

// GET /stories/:id/edit : send html form for editing existing story
exports.edit = (req, res) => {
    res.send('send the edit form');
};

// PUT /stories/:id : update the story identified by id
exports.update = (req, res) => { 
    res.send('update story with id ' + req.params.id);
};

// DELETE /stories/:id : deletes the story identified by id
exports.delete = (req, res) => {
    res.send('delete story with id ' + req.params.id);
};
