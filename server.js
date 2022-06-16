'use strict';

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const indexController = require("./controllers/index.controller");
const { seedUserData } = require("./models/User");
const { getUsers, getUser, createUser, getProducts, createItem, updateItem, deleteItem } = require("./controllers/user.controller");
const { addToCart, removeFromCart } = require("./controllers/cart.controller");
const { addToFav, removeFromFav } = require("./controllers/favorite.controller");
// const apiDataController = require("./controllers/apiData.controller");


require("dotenv").config();
const server = express();
server.use(express.json());
server.use(cors());

const PORT = process.env.PORT || 8001;
const atlasDbUrl = process.env.ATLAS_DB_URL;

mongoose.connect(atlasDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to the DB')).catch(error => console.log(`not connected to DB error:${error.message}`));

/* use this one time to inisalize the database */
// seedUserData();

server.get("/", indexController);
// server.get("/products", apiDataController);

server.get("/users", getUsers);
server.get("/products", getProducts);
server.get("/user/:email", getUser);
server.post("/user/?:email", createUser);

server.post("/item", createItem);
server.put("/item/:id", updateItem);
server.delete("/item/:email/:id", deleteItem);

server.post("/favList", addToFav);
server.delete("/favList/:email/:id", removeFromFav);

server.post("/cart", addToCart);
server.delete("/cart/:email/:id", removeFromCart);

server.listen(PORT, () => console.log(`the server is running on port ${PORT}`));