'use strict';


const { userModel } = require('../models/User');


const addToFav = (req, res) => {
  const { email, id, title, price, description, category, image, comments } = req.body;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else if (userData.favoriteList.some(element => element.id === id)) {
      res.send('data already exist');
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
      res.send(userData);
    }
  })
}


const removeFromFav = (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {
      userData.favoriteList = userData.favoriteList.filter(element => element.id != id);
      userData.save();
      res.send(userData);
    }
  })
}

module.exports = { addToFav, removeFromFav }