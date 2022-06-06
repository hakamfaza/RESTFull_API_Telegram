const express = require('express');
const { deleteMessage } = require('../controllers/chats.controller');

const router = express.Router();

router
  .delete('/chats/:id', deleteMessage);

module.exports = router;
