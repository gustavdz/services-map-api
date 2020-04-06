var Local = require ('../models/Local');
var Category = require('../models/Category');
var validator = require ('validator');

var Localcontroller = {

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy un test de mi controlador de locales"
        });
    },




    //metodo para crear un local

    save: (req, res) => {
        //recojo parametros
        var params = req.body;

        console.log(params);
        //validar datos
        try{
            //dara true la variable cuando no este vacio
            var validate_name = !validator.isEmpty(params.name);
           var validate_category = !validator.isEmpty(params.category);
            var validate_lat = !validator.isEmpty(params.lat);
            var validate_lng = !validator.isEmpty(params.lng);
            var validate_label = !validator.isEmpty(params.label);


        }catch(err){
            return res.status(404).send({
                status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if(validate_name && validate_category && validate_lat && validate_lng && validate_label){
            //Crear objeto a guardar
            var local = new Local();
            local.name = params.name;
            if(params.description){
                local.description = params.description
            } else {
                local.description = null;
            }
            local.category = params.category;
            local.lat = params.lat;
            local.lng = params.lng;
            local.label = params.label;
            local.save();

            //populate test
            Category.populate(local, {path: "category"},function(err, local){
                return res.status(200).send({
                    status: "Success",
                    local: local
                });
            });


          /*  //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                local: local
            });
            */

        }

    },// fin metodo save

    getLocals : (req,res) =>{

        var query = Local.find({});

        //Find para sacar los datos de la DB
        query.sort('-_id').exec((err, locals) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!locals){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontraron locales'
                });
            }

            Category.populate(locals, {path: "category"},function(err, locals){
                return res.status(200).send({
                    status: "Success",
                    local: locals
                });
            });

        });



    },// fin metodo getLocals


    showLocal : (req, res) =>{

        //recoger id
        var localId = req.params.id;

        if(!localId){
            return res.status(404).send({
                status: "Error",
                message: "No se encuentraron locales"
            })
        }

        //Buscar local
        Local.findById(localId, (err, local) => {

            if(err || !local){

                return res.status(404).send({
                    status: 'error',
                    message: 'No existe local'

                });

            }

            Category.populate(local, {path: "category"},function(err, local){
                return res.status(200).send({
                    status: "Success",
                    local: local
                });
            });


        });



    }, // fin metodo showLocal



    update: (req, res) => {

        //recoger parametro id
        var localId = req.params.id;

        //recoger los datos
        var params = req.body;


        //validar
        try{
            //dara true la variable cuando no este vacio
            var validate_name = !validator.isEmpty(params.name);
            var validate_category = !validator.isEmpty(params.category);
            var validate_lat = !validator.isEmpty(params.lat);
            var validate_lng = !validator.isEmpty(params.lng);
            var validate_label = !validator.isEmpty(params.label);


        } catch(err){
            return res.status(404).send({
                status: "Error",
                message: "Faltan datos por enviar"
            });
        }

        if(validate_name && validate_category && validate_lat && validate_lng && validate_label){

            Local.findOneAndUpdate({_id: localId}, params, {new:true}, (err, localUpdated) =>{
                if(err){

                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!localUpdated){

                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe local'
                    });
                }


                Category.populate(localUpdated, {path: "category"},function(err, localUpdated){
                    return res.status(200).send({
                        status: "Success",
                        local: localUpdated
                    });
                });


            });

        } else {
            return res.status(400).send({
                status: "Error",
                message: "Las validaciones son incorrectas"
            })
        }

    },// fin metodo update


    delete: (req, res) => {

        //Recoger el id de la url

        var localId = req.params.id;

        console.log(localId);

        //buscar y borrar
        Local.findOneAndDelete({_id: localId}, (err, localRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!localRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el local a borrar'
                });
            }


            Category.populate(localRemoved, {path: "category"},function(err, localRemoved){
                return res.status(200).send({
                    status: "Success",
                    local: localRemoved
                });
            });



        });


    }


};


module.exports = Localcontroller;
