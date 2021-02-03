"use strict";
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var app = require('./app');
dotenv.config({ path: './.env' });
mongoose.connect(process.env.DB_LOCALHOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(function () { return console.log('DB connection successful.'); });
var port = process.env.PORT || 8081;
app.listen(port, function () {
    console.log("App listening on port " + port);
});
