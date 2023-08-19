const { error } = require('./response');

const sequelizeErrors = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeDatabaseError') {
    console.log('*** [error]', err);

    const message = 'ERROR DE CAMPOS';
    const status = 400;
    error(req, res, message, status);
  }
  next();
};

module.exports = sequelizeErrors;
