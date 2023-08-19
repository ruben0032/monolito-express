const response = require('../../../network/response');
const tryCatchFn = require('../../../utils/tryCatchFn');
const arraySequelize = require('./sequelize');

module.exports = {
  getArrays: tryCatchFn(async (req, res) => {
    const listArrays = await arraySequelize.getArrays();
    response.succes(req, res, listArrays, 201);
  }),
  postArray: tryCatchFn(async (req, res) => {
    const {
      firstArray,
      lastArray,
      column,
    } = req.body;
    if (typeof column === 'string') {
      response.error(req, res, 'columna no valida', 400);
    }
    const idArray = await arraySequelize.postArray({
      firstArray,
      lastArray,
      column,
    });
    response.succes(req, res, { id: idArray, message: `matriz ingresada exitosamente con id: ${idArray}` }, 201);
  }),
  getArray: tryCatchFn(async (req, res) => {
    const { id } = req.headers;
    const array = await arraySequelize.getArray({ id });
    if (!array) {
      response.error(req, res, 'ID no valido', 400);
    }
    response.succes(req, res, array, 201);
  }),
};
