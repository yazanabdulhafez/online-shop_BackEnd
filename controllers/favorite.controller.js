'use strict';


const { userModel } = require('../models/User');


const getFavItems = (req, res) => {

  userModel.findOne({ email: req.params.email }, (error, userData) => {
    if (error) {
      res.status(500).json(error.message);
    } else {
      res.status(200).json(userData.favoriteList);
    }
  })
}

const addToFav = (req, res) => {
  const { email, id, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else if (userData.favoriteList.some(element => element.id === id)) {
      res.json('data already exist');
    } else {
      userData.favoriteList.push({
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


const removeFromFav = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.json(error.message);
    } else {
      userData.favoriteList = userData.favoriteList.filter(element => element.id != id);
      userData.save();
      res.json(userData);
    }
  })
}

module.exports = { addToFav, removeFromFav, getFavItems }