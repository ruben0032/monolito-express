const express = require('express');
const config = require('./config');
const arrayRoutes = require('./api/components/array/route');
const errors = require('./network/errors');
const sequelizeErrors = require('./network/sequelizeErrors');
const notFound = require('./network/notFound');
const { sequelize } = require('./store/connexion');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/ej1', (req, res) => {
  res.sendFile(`${__dirname}/views/ejercicio1.html`);
});

app.get('/ej2', (req, res) => {
  res.sendFile(`${__dirname}/views/ejercicio2.html`);
});

app.get('/ej3', (req, res) => {
  res.sendFile(`${__dirname}/views/ejercicio3.html`);
});

app.get('/ej4', (req, res) => {
  res.sendFile(`${__dirname}/views/ejercicio4.html`);
});

app.use('/api/array', arrayRoutes);

// respuesta por defecto (rutas no existentes)
app.use('*', notFound);

// errores globales (despues de todas las rutas)
app.use(sequelizeErrors);
app.use(errors);

app.listen(config.api.port, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`server on ${config.api.port}`);
  } catch (error) {
    console.log(`error en la conexion: ${error}`);
  }
});
