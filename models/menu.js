module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define("Menu", {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    cook_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  let date = new Date();
  Menu.sync().then(() => {
    Menu.create({
      item: 'wagyu meatballs',
      category: 'Appetizer',
      price: '23.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'pan seared scallops',
      category: 'Appetizer',
      price: '24.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'Lobster risotto',
      category: 'Appetizer',
      price: '25.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'beef wellington',
      category: 'Entre',
      price: '49.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'roasted rack of lamb',
      category: 'Entre',
      price: '39.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'crispy skin salmon',
      category: 'Entre',
      price: '37.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'sticky toffee pudding',
      category: 'desert',
      price: '19.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'cranberry souffle',
      category: 'desert',
      price: '17.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
  });

  return Menu;
}