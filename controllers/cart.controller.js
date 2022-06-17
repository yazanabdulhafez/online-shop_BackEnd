'use strict';

const { userModel } = require('../models/User');

const getCartItems = (req, res) => {

  userModel.findOne({ email: req.params.email }, (error, userData) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(userData.cartList);
    }
  })
}


const addToCart = (req, res) => {
  const { email, id, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else if (userData.cartList.some(element => element.id === id)) {
      res.send('data already exist');
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
      res.send(userData);
    }
  })
}


const removeFromCart = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {
      userData.cartList = userData.cartList.filter(element => element.id != id);
      userData.save();
      res.send(userData);
    }
  })
}

module.exports = { addToCart, removeFromCart, getCartItems };