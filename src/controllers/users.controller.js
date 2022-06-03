const usersModels = require('../models/users.models');
const { success, failed } = require('../utils/response');
const deleteFile = require('../utils/deleteFile');

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
      const { id } = req.APP_DATA.tokenDecoded;

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
  updatePhoto: async (req, res) => {
    try {
      const { id } = req.APP_DATA.tokenDecoded;

      const user = await usersModels.getDetailUser(id);
      if (!user.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        failed(res, {
          code: 400,
          payload: 'User not found!',
          message: 'Update photo failed!',
        });
        return;
      }

      if (req.file) {
        if (user.rows[0].photo) {
          deleteFile(`public/${user.rows[0].photo}`);
        }
      }

      const data = {
        id,
        photo: req.file.filename,
      };

      const response = await usersModels.updatePhoto(data);
      if (!response.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }

        failed(res, {
          code: 400,
          payload: 'You don\'t update this photo!',
          message: 'Update photo failed!',
        });
        return;
      }

      success(res, {
        code: 200,
        payload: response,
        message: 'Update photo success!',
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
