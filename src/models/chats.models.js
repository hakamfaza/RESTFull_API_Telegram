const { v4: uuidV4 } = require('uuid');
const db = require('../config/db');

module.exports = {
  store: (data) => new Promise((resolve, reject) => {
    const id = uuidV4();
    const {
      sender, receiver, message, chatType, isRead, date,
    } = data;
    db.query('INSERT INTO chats (id, sender, receiver, message, chat_type, isRead, date) VALUES ($1, $2, $3, $3, $4, $5, $6, $7)', [id, sender, receiver, message, chatType, isRead, date], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
