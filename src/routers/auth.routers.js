const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

router
  .post('/register', register)
  .post('/login', login);

module.exports = router;
