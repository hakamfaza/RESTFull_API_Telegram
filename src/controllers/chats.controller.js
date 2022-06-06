const chatsModels = require('../models/chats.models');
const { success, failed } = require('../utils/response');

module.exports = {
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await chatsModels.deleteMessage(id);
      success(res, {
        code: 200,
        payload: response,
        message: 'Success delete message!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal server errror!',
      });
    }
  },
};
