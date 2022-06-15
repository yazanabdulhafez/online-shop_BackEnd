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

const getUser = (req, res) => {
  userModel
    .find({ email: req.params.email })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(500).send("There was problem in the Data base"));
};

const createUser = (req, res) => {
  let newUser = new user({
    email: req.params.email,
    favoriteList: [],
    cartList: []
  });
  newUser
    .save()
    .then(() => user.find({}).then((item) => res.status(201).send(item)))
    .catch((error) => res.status(401).send("Duplicate User"));
};

const addToFav = (req, res) => {
  user
    .findOneAndUpdate({ email: req.params.email }, { $push: req.body })
    .then(() => {
      res.status(201).send("Successfully Updated");
    })
    .catch((err) => res.status(500).send("there was problem"));
};

const addToCart = (req, res) => {
  user
    .findOneAndUpdate({ email: req.params.email }, { $push: req.body })
    .then(() => {
      res.status(201).send("Successfully added to the Cart");
    })
    .catch((err) => res.status(500).send("there was problem"));
};

const deleteFromFav = (req, res) => {
  const id = req.params.id;
  const { email } = req.query;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {

      userData.chocolist = userData.chocolist.filter(element => element._id != id);
      userData.save();
      res.send(userData.chocolist);
    }
  })
}

const deleteFromCart = (req, res) => {
  const id = req.params.id;
  const { email } = req.query;
  userModel.findOne({ email: email }, (error, userData) => {
    if (error) {
      res.send(error.message);
    } else {

      userData.chocolist = userData.chocolist.filter(element => element._id != id);
      userData.save();
      res.send(userData.chocolist);
    }
  })
}

module.exports = { getUsers, getUser, createUser, addToFav, addToCart, deleteFromFav, deleteFromCart };