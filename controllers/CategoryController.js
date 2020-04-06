var Category = require('../models/Category');
var validator = require('validator');


/*
mercado
restaurante
panaderias
farmacia
abarrotes
bancos
*/

var CategoryController = {

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy un test de mi controlador de categorias"
        });
    },


    save: (req,res) => {
        //recojo parametros
        var params = req.body;
        console.log(params);

        //valido los parametros
        try{
            //dara true la variable cuando no este vacio
            var validate_name = !validator.isEmpty(params.name);
            // var validate_category = !validator.isEmpty(params.category);
            var validate_status = !validator.isEmpty(params.status);


        } catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if (validate_name && validate_status){
            //crear objeto a guardar
            var category = new Category();
            category.name = params.name;

            if(params.description){
                category.description = params.description
            } else {
                category.description = null;
            }

            category.status = params.status;
            category.save();

            //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                category: category
            });

        }

    },// fin metodo save


    getCategories: (req,res) =>{

        var query = Category.find({});

        //Find para sacar los datos de la DB
        query.sort('-_id').exec((err, categories) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!categories){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se encontraron categorías'
                });
            }

            return res.status(200).send({
                status: 'success',
                categories
            });

        });



    },//fin método getCategory


    showCategory: (req,res) => {
        //recoger parametro id
        var CategoryId = req.params.id;

        if(!CategoryId){
            return res.status(404).send({
                status: 'error',
                message: 'No se encontraron categorías'

            });
        }

        //Buscar categoria
        Category.findById(CategoryId, (err, category) => {

            if(err || !category){

                return res.status(404).send({
                    status: 'error',
                    message: 'No existe categoría'

                });

            }

            return res.status(200).send({
                status: 'success',
                category

            });


        });

    },// fin metodo showCategory


    update: (req,res) =>{

        //recoger parametro id
        var CategoryId = req.params.id;

        //Recoger los datos por put
        var params = req.body;


        //validar los datos
        try{
            //dara true la variable cuando no este vacio
            var validate_name = !validator.isEmpty(params.name);
            // var validate_category = !validator.isEmpty(params.category);
            var validate_status = !validator.isEmpty(params.status);


        } catch(err){
            return res.status(404).send({
                status: "Error",
                message: "Faltan datos por enviar"
            })
        }

        if(validate_name && validate_status){

            Category.findOneAndUpdate({_id: CategoryId}, params, {new:true}, (err, categoryUpdated) =>{
                if(err){

                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }

                if(!categoryUpdated){

                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe categoria'
                    });
                }


                return res.status(200).send({
                    status: 'success',
                    article: categoryUpdated
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

        var categoryId = req.params.id;

        console.log(categoryId);

        // hacer find and delete
        Category.findOneAndDelete({_id: categoryId}, (err, categoryRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }

            if(!categoryRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe la categoria a borrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: 'Categoria borrado',
                article: categoryRemoved
            });

        });



    }// fin metodo delete



}; // fin controller

module.exports = CategoryController;
