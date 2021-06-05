const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    userName: String,
    type: Number,
    email: String,
    mobile: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);