module.exports = function(sequelize, DataTypes) {
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
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      cook_time: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Menu;
}