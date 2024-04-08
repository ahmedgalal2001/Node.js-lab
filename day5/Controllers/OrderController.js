const orderModel = require('../Models/OrderModel');
const orderValidation = require("../Utils/OrderValidation");
let getAllOrders = function (req, res) {
    orderModel.find({}).then(orders => {
        res.status(200).json(orders);
    })
}
let createOrder = function (req, res) {
    if (orderValidation(req.body)) {
        let newOrder = new orderModel(req.body);
        newOrder.save()
            .then(data => { console.log(data); res.status(200).json({ "msg": "add" }) })
            .catch(err => { console.log(err); res.status(400).json({ "msg": err.message }) });
    } else res.status(400).json(orderValidation.errors);
}
let getOrder = async function (req, res) {
    let order = await orderModel.findOne({ "id": req.params.id });
    if (order)
        res.status(200).json(order);
    else res.status(400).json("Order Not Found");
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrder
}