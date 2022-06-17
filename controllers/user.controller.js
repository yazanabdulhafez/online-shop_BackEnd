'use strict';

const { userModel } = require('../models/User');



const getUsers = (req, res) => {

  userModel
    .find({})
    .then((items) => {
      let users = [];
      items.forEach(item => users.push(item.email));
      res.status(200).json(users)
    })
    .catch((err) => res.status(500).json("There was problem in the Data base"));
};

const getProducts = (req, res) => {

  userModel
    .find({})
    .then((items) => {
      let products = [];
      items.forEach(item => item.addedProducts.map(item => products.push(item)));
      res.status(200).json(products)
    })
    .catch((err) => res.status(500).json("There was problem in the Data base"));
};

const getUser = (req, res) => {
  userModel
    .find({ email: req.params.email })
    .then((item) => res.status(201).json(item))
    .catch((err) => res.status(500).json("There was problem in the Data base"));
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
        .then(() => userModel.findOne({ email: req.params.email }).then((item) => res.status(201).json(item)))
        .catch((error) => res.status(401).json(error.message));
    } else {
      res.status(401).json("Duplicate User");
    }
  })
};

const getComments = (req, res) => {
  const productEmail = req.params.email;
  const id = req.params.id;
  userModel.findOne({ email: productEmail }, (error, userData) => {
    if (error) {
      res.status(500).json(error.message);
    } else {

      const comments = [];
      userData.addedProducts.map((item) => {
        if (item.id == id) {
          item.comments.forEach(comment => comments.push(comment))
        }
      })
      res.status(200).json(comments);
    }
  })
}

const createComment = (req, res) => {
  const productEmail = req.params.email;
  const { id, email, text } = req.body;
  userModel.findOne({ email: productEmail }, (error, userData) => {
    if (error) {
      res.status(500).json(error.message);
    } else {

      userData.addedProducts.map(item => {
        if (item.id == id) {
          item.comments.push({
            email: email,
            text: text,
            createdAt: Date.now()
          });
        }
      })
      userData.save();
      res.status(200).json(userData);
    }
  })
}

const createItem = (req, res) => {
  const { email, id, title, price, description, category, image } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else if (userData.addedProducts.some(element => element.id === id)) {
      res.json('data already exist');
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
      res.json(userData);
    }
  })
}

const updateItem = (req, res) => {
  const id = req.params.id;
  const { email, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
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
      res.json(userData);
    }
  })
}


const deleteItem = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else {
      userData.addedProducts = userData.addedProducts.filter(element => element.id != id);
      userData.save();
      res.json(userData);
    }
  })
}


module.exports = { getUsers, getProducts, getUser, getComments, createUser, createComment, createItem, updateItem, deleteItem }