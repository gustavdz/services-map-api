const {Schema, model} = require('mongoose');

UserSchema = new Schema({
    name: {type: String, required: true},
    phone: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},{
    timestamps: true
});

module.exports = model('User', UserSchema);
