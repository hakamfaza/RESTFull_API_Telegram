const bcrypt = require('bcrypt');
const { v4: uuidV4 } = require('uuid');
const jwtToken = require('../utils/generateJwtToken');

const authModels = require('../models/auth.models');
const { success, failed } = require('../utils/response');

const salt = 10;

module.exports = {
  register: async (req, res) => {
    try {
      const user = await authModels.login(req.body.email);
      if (user.rowCount) {
        failed(res, {
          code: 400,
          payload: 'Email already exist!',
          message: 'Register failed!',
        });
        return;
      }
      const password = await bcrypt.hash(req.body.password, salt);
      const data = {
        id: uuidV4(),
        ...req.body,
        password,
      };
      const response = await authModels.register(data);

      success(res, {
        code: 200,
        payload: response,
        message: 'Register success!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal server error!',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModels.login(email);
      if (user.rowCount > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);

        if (match) {
          const token = await jwtToken({
            id: user.rows[0].id,
          });
          success(res, {
            code: 200,
            payload: user.rows[0],
            message: 'Login success!',
            token,
          });
          return;
        }
      }
      failed(res, {
        code: 400,
        payload: 'Email or password wrong!',
        message: 'Login failed!',
      });
    } catch (error) {
      failed(res, {
        code: 500,
        payload: error.message,
        message: 'Internal server error!',
      });
    }
  },
};
