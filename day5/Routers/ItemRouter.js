const express = require('express');
const router = express.Router();
const itemController = require("../Controllers/ItemController");
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItem);
router.post("/", itemController.createItem);
router.put("/:id", itemController.updateItem);
module.exports = router;