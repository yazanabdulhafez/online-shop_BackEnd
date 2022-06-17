'use strict';

const { userModel } = require('../models/User');

const getCartItems = (req, res) => {

  userModel.findOne({ email: req.params.email }, (error, userData) => {
    if (error) {
      res.status(500).json(error.message);
    } else {
      res.status(200).json(userData.cartList);
    }
  })
}


const addToCart = (req, res) => {
  const { email, id, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else if (userData.cartList.some(element => element.id === id)) {
      res.json('data already exist');
    } else {
      userData.cartList.push({
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


const removeFromCart = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else {
      userData.cartList = userData.cartList.filter(element => element.id != id);
      userData.save();
      res.json(userData);
    }
  })
}

module.exports = { addToCart, removeFromCart, getCartItems };