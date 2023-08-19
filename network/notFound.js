const { error } = require('./response');

const notFound = (req, res, next) => {
  const message = `No se encontro la ruta ${req.originalUrl}`;
  const status = 404;

  error(req, res, message, status);
  next();
};

module.exports = notFound;
