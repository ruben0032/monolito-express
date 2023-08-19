const Array = require('./model');

module.exports = {
  postArray: async ({ firstArray, lastArray, column }) => {
    const newMatriz = await Array.create({ firstArray, lastArray, column });
    return newMatriz.id;
  },
  getArrays: async () => {
    const allMatriz = await Array.findAll({ order: [['createdAt', 'DESC']], limit: 8 });
    return allMatriz;
  },
  getArray: async ({ id }) => {
    const oneMatriz = await Array.findByPk(id);
    return oneMatriz;
  },
};
