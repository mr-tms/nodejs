"use strict";
var express = require('express');
var _a = require('../controllers/userController'), createUser = _a.createUser, deleteUser = _a.deleteUser, getAllUsers = _a.getAllUsers;
var router = express.Router();
router.route('/').get(getAllUsers).post(createUser);
// router.delete('/deleteUser', deleteUser);
module.exports = router;
