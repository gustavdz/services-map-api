var User = require ('../models/User');
var validator = require ('validator');
var jwt = require('jsonwebtoken');
var config = require('../configs/config');
var UserController = {


    test: (req, res) => {
        return res.status(200).send({
        message: "Soy un test de mi controlador de locales"
        });
    },


    signup: async (req, res) => {

        var params = req.body;

        //Validar datos(validator)
        try{
            //dara true la variable cuando no este vacio
            var validate_name = !validator.isEmpty(params.name);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if(params.password !== params.c_password){
            return res.status(400).send({
                message: "Error, las contrasenias no coinciden"
            });
        }

        const vEmail = await User.findOne({email: params.email}, (err, usuario) => {
            if (usuario){
                return res.status(400).send({
                    message: 'Error, el email ya ha sido registrado'
                });
            }
        });

        if(validate_name && validate_email && validate_password){
            //Registrar usuario
            var user = new User();
            user.name = params.name;
            user.email = params.email;
            user.password = params.password;
            user.phone = params.phone?params.phone:null;

            //encriptar clave
            user.password = await user.encryptPassword(params.password);

            //guardar
            await user.save();

            const payload = {
                check:  true,
                userObj: {
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                }
            };

            const token = await jwt.sign(payload, config.llave, {
                expiresIn: 3600
            });

            const tokenData = await jwt.verify(token, config.llave, (err, decoded) => {
                return decoded;
            });


            return res.status(200).send({
                message: "Registro correcto",
                token: token,
                expiresIn: tokenData.exp,
                user: payload.userObj
            });

        } else {
            return res.status(402).send({
                message: "los datos no son validos"
            });
        }

    },

    login: async (req, res) => {

        var params = req.body;

        //Validar datos(validator)
        try{
            //dara true la variable cuando no este vacio
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);
        }catch(err){
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos para enviar'
            });
        }

        if(validate_email && validate_password){
            const vEmail = await User.findOne({email: params.email}, async (err, usuario) => {
                if (err){
                    return res.status(400).send({
                        message: 'El usuario no existe'
                    });
                }
                const match = await usuario.matchPassword(params.password);
                if(match){

                    const payload = {
                        check:  true,
                        userObj: {
                            _id: usuario._id,
                            name: usuario.name,
                            phone: usuario.phone,
                            email: usuario.email,
                        }
                    };

                    const token = await jwt.sign(payload, config.llave, {
                        expiresIn: 3600
                    });

                    const tokenData = await jwt.verify(token, config.llave, (err, decoded) => {
                        return decoded;
                    });

                    return res.status(200).send({
                        message: "Login correcto",
                        token: token,
                        expiresIn: tokenData.exp,
                        user: payload.userObj
                    });
                } else {
                    return res.status(400).send({
                        message: 'La contraseña es incorrecta'
                    });
                }
            });
        } else {
            return res.status(402).send({
                message: "los datos no son validos"
            });
        }

    },

};//fin controlador


module.exports = UserController;
