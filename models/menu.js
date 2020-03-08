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
      item: 'wagyu_meatballs',
      category: 'Appetizer',
      price: '23.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'pan_seared_scallops',
      category: 'Appetizer',
      price: '24.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'Lobster_risotto',
      category: 'Appetizer',
      price: '25.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'beef_wellington',
      category: 'Entre',
      price: '49.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'roasted_rack_of_lamb',
      category: 'Entre',
      price: '39.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'crispy_skin_salmon',
      category: 'Entre',
      price: '37.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'sticky_toffee_pudding',
      category: 'desert',
      price: '19.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
    Menu.create({
      item: 'cranberry_souffle',
      category: 'desert',
      price: '17.99',
      cook_time: '10',
      createdAt: date,
      updatedAt: date
    });
  });

  return Menu;
}