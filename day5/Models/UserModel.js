const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    age: { type: Number },
    email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    address: { type: String }
}, { additionalProperties: false });

module.exports = mongoose.model('users', userSchema);