'use strict';

var express = require('express');
var LocalController =  require('../controllers/LocalController');


var router = express.Router();


//Rutas de prueba
router.get('/test', LocalController.test);

//CRUD locales
router.post('/save', LocalController.save);
router.get('/get-locals', LocalController.getLocals);
router.get('/get/:id', LocalController.showLocal);
router.put('/edit/:id', LocalController.update);
router.delete('/delete/:id', LocalController.delete);



module.exports = router;
