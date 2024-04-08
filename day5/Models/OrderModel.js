const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    id: { type: Number,unique: true  },
    totalPrice: { type: Number },
    items: [{ type: Array }],
    createdAt: { type: Date, default: Date.now }
}, { additionalProperties: false });

module.exports = mongoose.model("orders", orderSchema);