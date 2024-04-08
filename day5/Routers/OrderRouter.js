const express = require('express');
const orderController = require("../Controllers/OrderController");
const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
module.exports = router;