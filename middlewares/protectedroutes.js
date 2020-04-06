var express = require('express');
var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');
var config = require('../configs/config');

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.llave, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).send({
        mensaje: 'Token no proveída.'
    });
  }
});

module.exports = rutasProtegidas;
