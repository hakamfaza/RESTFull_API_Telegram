const express = require('express');
const {
  getUsers, getDetailUsers, updateUsers, updatePhoto, deleteUsers,
} = require('../controllers/users.controller');
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .get('/users', jwtAuth, getUsers)
  .get('/users/:id', jwtAuth, getDetailUsers)
  .put('/users', jwtAuth, updateUsers)
  .put('/photo', jwtAuth, upload, updatePhoto)
  .delete('/users', jwtAuth, deleteUsers);

module.exports = router;
