const itemModel = require('../Models/ItemModel');
const itemValidation = require("../Utils/ItemValidation");
let getAllItems = function (req, res) {
    itemModel.find({}).then(items => {
        res.status(200).json(items);
    })
}
let createItem = function (req, res) {
    if (itemValidation(req.body)) {
        const newItem = new itemModel(req.body);
        newItem.save()
            .then(data => { console.log(data); res.status(200).json({ "msg": "update" }) })
            .catch(err => { console.log(err); res.status(200).json({ "msg": err.message }); });

    } else res.status(400).json(itemValidation.errors);
}

let updateItem = async function (req, res) {
    let item = await itemModel.findOne({ "id": req.params.id });
    if (item) {
        const { name, price, desc } = req.body;
        if (name) item.name = name;
        if (price) item.price = price;
        if (desc) item.desc = desc;
        item.save()
            .then(data => { console.log(data); res.status(200).json({ "msg": "update" }) })
            .catch(err => { console.log(err); res.status(200).json({ "msg": err.message }); });
    }
    else res.status(400).json("Item Not Found");
}

let getItem = async function (req, res) {
    let item = await itemModel.findOne({ "id": req.params.id });
    if (item)
        res.status(200).json(item);
    else res.status(400).json("Item Not Found");
}

module.exports = {
    getAllItems,
    createItem,
    getItem,
    updateItem
}