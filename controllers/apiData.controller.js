'use strict';

const axios = require("axios");
const Item = require('../models/Item');

const apiDataController = (req, res) => {
  const apiUrl = "https://api.escuelajs.co/api/v1/products";
  axios.get(apiUrl).then(response => {
        let productsData = response.data.map(element => new Item(element.title,
          element.price, element.description, element.category.name, element.category.image, []));
        res.send(productsData);
      }

    )
    .catch(error => console.log(error.message));
};

module.exports = apiDataController;