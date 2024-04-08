const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number },
    desc: { type: String }
}, { additionalProperties: false });

module.exports = mongoose.model('items', itemSchema);;