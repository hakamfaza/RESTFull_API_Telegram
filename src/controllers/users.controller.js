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
  updateUsers: async (req, res) => {
    try {
      const id = '0c6026e3-3a12-4ba6-8246-d98af5c50126';

      const data = {
        id,
        ...req.body,
      };
      const response = await usersModels.updateUsers(data);
      if (response.rowCount > 0) {
        success(res, {
          code: 200,
          payload: response,
          message: 'Update users success!',
        });
        return;
      }

      failed(res, {
        code: 400,
        payload: 'You don\'t have access to update this users!',
        message: 'Update users failed!',
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
