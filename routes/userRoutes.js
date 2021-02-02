const express = require('express');
const {
  createUser,
  deleteUser,
  getAllUsers,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
// router.delete('/deleteUser', deleteUser);

module.exports = router;
