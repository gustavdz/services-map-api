'use strict';

var express = require('express');
var LocalController =  require('../controllers/LocalController');


var router = express.Router();

//middlewares
var rutasProtegidas = require('../middlewares/protectedroutes');


//Rutas de prueba
router.get('/test', LocalController.test);

//CRUD locales
router.post('/save', rutasProtegidas, LocalController.save);
router.get('/get-locals', LocalController.getLocals);
router.get('/get/:id',  LocalController.showLocal);
router.put('/edit/:id', rutasProtegidas ,LocalController.update);
router.delete('/delete/:id', rutasProtegidas ,LocalController.delete);



module.exports = router;
