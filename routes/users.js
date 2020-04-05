var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
var jwt = require('jsonwebtoken');
var config = require('../configs/config');

//middlewares
var rutasProtegidas = require('../middlewares/protectedroutes');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/datos', rutasProtegidas, (req, res) => {
 const datos = [
  { id: 1, nombre: "Asfo" },
  { id: 2, nombre: "Denisse" },
  { id: 3, nombre: "Carlos" }
 ];

 res.json(datos);
});

router.post('/autenticar', async (req, res) => {
  if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
    const payload = {
      check:  true,
      username: req.body.usuario
    };

    const token = await jwt.sign(payload, config.llave, {
      expiresIn: 3600
    });

    const tokenData = await jwt.verify(token, config.llave, (err, decoded) => {
      return decoded;
    });

    res.json({
      mensaje: 'Autenticación correcta',
      token: token,
      expiresIn: tokenData.exp,
      username: tokenData.username
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos"})
  }
});

module.exports = router;
