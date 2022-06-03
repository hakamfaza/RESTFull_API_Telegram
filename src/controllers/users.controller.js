const usersModels = require('../models/users.models');
const { success, failed } = require('../utils/response');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await usersModels.getUser();
      success(res, {
        code: 200,
        payload: users.rows,
        message: 'Get all users success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internar server error!',
      });
    }
  },
  getDetailUsers: async (req, res) => {
    try {
      const user = await usersModels.getDetailUser(req.params.id);
      success(res, {
        code: 200,
        payload: user.rows[0],
        message: 'Get all users success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internar server error!',
      });
    }
  },
};
