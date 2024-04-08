const express = require('express');
const router = express.Router();
const userController = require("../Controllers/UserController");
router.get("/", userController.getAllUsers);
router.get("/:id", (req, res) => {
    res.status(200).json({ "msg": "orders" + req.params.id });
});
router.post("/signin", userController.loginUser);
router.post("/signup", userController.createUser);
module.exports = router;