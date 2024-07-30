const { deserialize } = require('mongodb');
const {Schema, model, Mongoose} = require('mongoose');

const serviceSchema = new Schema({
    service_name: {type: String, required: true},
    deseription: {type: String, required: true},
    price: {type: String, required: true},
    provider: {type: String, required: true},
});

const service = model("Service", serviceSchema);

module.exports = service;