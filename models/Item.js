'use strict';

class Item {
  constructor(title, price, description, category, image, comments) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
    this.comments = comments
  }
}

module.exports = Item;