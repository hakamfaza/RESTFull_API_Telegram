const express = require('express');
const { getUsers, getDetailUsers } = require('../controllers/users.controller');

const router = express.Router();

router
  .get('/users', getUsers)
  .get('/users/:id', getDetailUsers);

module.exports = router;
