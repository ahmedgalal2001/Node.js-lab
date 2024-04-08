const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String },
    age: { type: Number },
    email: { type: String, match: /^\S+@\S+\.\S+$/, required: true },
    password: { type: String, required: true },
    address: { type: String }
}, { additionalProperties: false });

module.exports = mongoose.model('user', userSchema);;