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
router.post('/save', CategoryController.save);
router.get('/get-categories', CategoryController.getCategories);
router.get('/get/:id', CategoryController.showCategory);
router.put('/edit/:id', CategoryController.update);
router.delete('/delete/:id', CategoryController.delete);


module.exports = router;
