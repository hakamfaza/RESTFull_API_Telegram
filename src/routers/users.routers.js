const express = require('express');
const { getUsers, getDetailUsers, updateUsers } = require('../controllers/users.controller');

const router = express.Router();

router
  .get('/users', getUsers)
  .get('/users/:id', getDetailUsers)
  .put('/users', updateUsers);

module.exports = router;
