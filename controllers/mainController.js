const model = require('../models/story');

// GET /stories/new : send HTML form for creating a new story
exports.new = (req, res) => {
    res.send('send the new form');
};

// POST /stories : create a new stories
exports.create = (req, res) => {
    res.send('Created a new story');
};

// GET /stories/:id : send details of story identified by ID
exports.show = (req, res) => {
    let id = req.params.id;
    let story = model.findById(id);
    if(story) {
        res.render('./story/show', {story});
    } 
    res.status(404).send('Cannot find story with id ' + id);
    
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
