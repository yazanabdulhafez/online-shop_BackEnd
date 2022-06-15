'use strict';

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const indexController = require("./controllers/index.controller");
const { seedUserData } = require("./models/User");
const { getUsers, getUser, createUser, addToFav, addToCart, deleteFromFav, deleteFromCart } = require("./controllers/user.controller");
const apiDataController = require("./controllers/apiData.controller");


require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8001;
const atlasDbUrl = process.env.ATLAS_DB_URL;

mongoose.connect(atlasDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to the DB')).catch(error => console.log(`not connected to DB error:${error.message}`));

/* use this one time to inisalize the database */
// seedUserData();

app.get("/", indexController);
app.get("/products", apiDataController);

app.get("/users", getUsers);
app.get("/user/:email", getUser);

app.post("/user/:email", createUser);
app.put("/item/:email", addToFav);
app.put("/item/:email", addToCart);
app.delete('/item/:id', deleteFromFav);
app.delete('/item/:id', deleteFromCart);


app.listen(PORT, () => console.log(`the server is running on port ${PORT}`));