module.exports = {
  succes: (req, res, message, status) => {
    const statusMessage = message || '';
    const statusCode = status || 200;

    res.status(statusCode).json({
      error: false,
      status: statusCode,
      body: statusMessage,
    });
  },
  error: (req, res, message, status) => {
    const statusMessage = message || 'INTERNAL SERVER ERROR';
    const statusCode = status || 500;

    res.status(statusCode).json({
      error: true,
      status: statusCode,
      message: statusMessage,
    });
  },
};
