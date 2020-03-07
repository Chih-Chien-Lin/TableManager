'use strict';
let date = new Data();
let data = [
  {
    item:'wagyu meatballs',
    category:'Appetizer',
    price:'23.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'pan seared scallops',
    category:'Appetizer',
    price:'24.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'Lobster risotto',
    category:'Appetizer',
    price:'25.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'beef wellington',
    category:'Entre',
    price:'49.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'roasted rack of lamb',
    category:'Entre',
    price:'39.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'crispy skin salmon',
    category:'Entre',
    price:'37.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'sticky toffee pudding',
    category:'desert',
    price:'19.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  },
  {
    item:'cranberry souffle',
    category:'desert',
    price:'17.99',
    cook_time:'10',
    createdAt:date,
    updatedAt:date
  }
]



module.exports = {
  up: (queryInterface, Sequelize) => {



    return queryInterface.bulkInsert('Menu', data, {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Menu', null, {});

  }
};
