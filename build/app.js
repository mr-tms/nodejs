"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var userRouter = require('./routes/userRoutes');
var app = express();
app.use(express.json());
app.use('/api/v1/users', userRouter);
module.exports = app;
