'use strict';

class User {
  constructor(email, addedProducts, favoriteList, cartList) {
    this.email = email;
    this.addedProducts = addedProducts;
    this.favoriteList = favoriteList;
    this.cartList = cartList;

  }
}

module.exports = User;