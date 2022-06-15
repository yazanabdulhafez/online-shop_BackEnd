'use strict';

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  email: { type: String },
  text: { type: String },
  createdAt: { type: Date }
});

const itemSchema = mongoose.Schema({

  title: { type: String },
  price: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  comments: [commentSchema]
});

const userSchema = mongoose.Schema({
  email: { type: String, Unique: true, trim: true },
  favoriteList: [itemSchema],
  cartList: [itemSchema]
});

const userModel = mongoose.model('userData', userSchema);

const seedUserData = () => {
  const yazan = new userModel({
    email: "fso361435@gmail.com",
    favoriteList: [{
      title: "Tasty Steel Shirt",
      "price": 312,
      description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      category: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=7607",
      comments: [{ email: "fsn2@gmail.com", text: "good price", createdAt: "2019-10-28T09:55:06.127Z" }]
    }],
    cartList: [{
      title: "Tasty Steel Shirt",
      "price": 312,
      description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      category: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=7607",
      comments: [{ email: "fsn2@gmail.com", text: "good price", createdAt: "2019-10-28T09:55:06.127Z" }]
    }]
  });
  console.log(yazan);
  yazan.save();

  const mohammed = new userModel({
    email: "fsn2@gmail.com",
    favoriteList: [{
      title: "Tasty Steel Shirt",
      "price": 312,
      description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      category: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=7607",
      comments: [{ email: "fsn2@gmail.com", text: "good price", createdAt: "2019-10-28T09:55:06.127Z" }]
    }],
    cartList: [{
      title: "Tasty Steel Shirt",
      "price": 312,
      description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
      category: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=7607",
      comments: [{ email: "fsn2@gmail.com", text: "good price", createdAt: "2019-10-28T09:55:06.127Z" }]
    }]
  });
  console.log(mohammed);
  mohammed.save();
};

module.exports = { userModel, seedUserData };