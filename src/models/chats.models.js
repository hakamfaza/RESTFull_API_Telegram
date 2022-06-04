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
  list: (sender, receiver) => new Promise((resolve, reject) => {
    db.query('SELECT chats.id, chats.message, userSender.fullname AS sender, userReceiver.fullname AS receiver FROM chats LEFT JOIN users AS userSender ON chats.sender=userSender.id LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id WHERE (sender=$1 AND receiver=$2) OR (sender=$2 AND receiver=$1)', [sender, receiver], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  }),
};
