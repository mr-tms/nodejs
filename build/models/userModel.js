"use strict";
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
var User = mongoose.model('User', userSchema);
module.exports = User;
