'use strict';

const { userModel } = require('../models/User');



const getUsers = (req, res) => {

  userModel
    .find({})
    .then((items) => {
      let users = [];
      items.forEach(item => users.push(item.email));
      res.status(200).send(users)
    })
    .catch((err) => res.status(500).send("There was problem in the Data base"));
};

const getProducts = (req, res) => {

  userModel
    .find({})
    .then((items) => {
      let products = [];
      items.forEach(item => item.addedProducts.map(item => products.push(item)));
      res.status(200).send(products)
    })
    .catch((err) => res.status(500).send("There was problem in the Data base"));
};

const getUser = (req, res) => {
  userModel
    .find({ email: req.params.email })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(500).send("There was problem in the Data base"));
};

const createUser = (req, res) => {

  let newUser = new userModel({
    email: req.params.email,
    addedProducts: [],
    favoriteList: [],
    cartList: []
  });

  userModel.findOne({ email: req.params.email }, (error, userData) => {
    if (userData == null) {
      newUser
        .save()
        .then(() => userModel.findOne({ email: req.params.email }).then((item) => res.status(201).send(item)))
        .catch((error) => res.status(401).send(error.message));
    } else {
      res.status(401).send("Duplicate User");
    }
  })
};

const createItem = (req, res) => {
  const { email, id, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else if (userData.addedProducts.some(element => element.id === id)) {
      res.send('data already exist');
    } else {
      userData.addedProducts.push({
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        comments: []
      });
      userData.save();
      res.send(userData);
    }
  })
}

const updateItem = (req, res) => {
  const id = req.params.id;
  const { email, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {
      const index = userData.addedProducts.findIndex(element => element.id == id);
      userData.addedProducts.splice(index, 1, {
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        comments: comments
      });
      userData.save();
      res.send(userData);
    }
  })
}


const deleteItem = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {
      userData.addedProducts = userData.addedProducts.filter(element => element.id != id);
      userData.save();
      res.send(userData);
    }
  })
}

module.exports = { getUsers, getProducts, getUser, createUser, createItem, updateItem, deleteItem }