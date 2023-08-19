const { error } = require('./response');

const errors = (err, req, res, next) => {
  console.log('*** [error]', err);

  const message = err.message || 'INTERNAL SERVER ERROR';
  const status = err.statusCode || 500;

  error(req, res, message, status);
  next();
};

module.exports = errors;
