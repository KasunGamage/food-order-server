module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/users/add', users.create);

    // Retrieve all Notes
    app.get('/users/getAll', users.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/findById', users.findOne);

    // Update a Note with noteId
    app.post('/users/update', users.update);

    // Delete a Note with noteId
    app.delete('/users/delete', users.delete);

    // Send verification code
    app.get('/users/verification', users.sendVerificationCode);
}