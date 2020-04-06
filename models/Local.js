const {Schema, model} =require('mongoose');
var Category = require('./Category');


const LocalSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    category: { type: Schema.ObjectId, ref: "Category" },
    lat: {type: String, required: true},
    lng: {type: String, required: true},
    label: {type: String, required: true},
    draggable : {type: Boolean, default: false}

}, {
    timestamps: true
});

module.exports = model('Local', LocalSchema);
