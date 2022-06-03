module.exports = {
  success: (res, data) => {
    const {
      code, payload, message, pagination = false, token = false,
    } = data;

    const responData = {
      code,
      status: 'success',
      message,
      data: payload,
    };
    if (pagination) {
      responData.pagination = pagination;
    }
    if (token) {
      responData.token = token;
    }
    res.status(code).json(responData);
  },
  failed: (res, data) => {
    const { code, payload, message } = data;
    const responData = {
      code,
      status: 'failed',
      message,
      error: payload,
    };
    res.status(code).json(responData);
  },
};
