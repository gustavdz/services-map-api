'use strict';

var express = require('express');
var CategoryController =  require('../controllers/CategoryController');

var jwt = require('jsonwebtoken');
var config = require('../configs/config');

//middlewares
var rutasProtegidas = require('../middlewares/protectedroutes');





var router = express.Router();


//Rutas de prueba
router.get('/test', rutasProtegidas , CategoryController.test);

//CRUD
router.post('/save', rutasProtegidas , CategoryController.save);
router.get('/get-categories', rutasProtegidas ,CategoryController.getCategories);
router.get('/get/:id', rutasProtegidas ,CategoryController.showCategory);
router.put('/edit/:id', rutasProtegidas ,CategoryController.update);
router.delete('/delete/:id', rutasProtegidas ,CategoryController.delete);


module.exports = router;
