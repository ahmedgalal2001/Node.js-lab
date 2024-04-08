// requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRouter = require("./Routers/OrderRouter");
const itemRouter = require("./Routers/ItemRouter");
const userRouter = require("./Routers/UserRouter");


// connect to db
mongoose.connect("mongodb://localhost:27017/SuperMarket").
    then((res) => {
        console.log("Connect to db");
    }
    ).catch((err) => console.log(err));

// to use all of them

const app = express();
const PORT = process.env.PORT || 5000;


// middelware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);


// to run server
app.listen(PORT, () => {
    console.log("Server Is Listening Port = ", PORT);
});