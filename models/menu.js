module.exports = function(sequelize, DataTypes) {
    var Menu = sequelize.define("Menu", {
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      cook_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    Menu.associate = (models) => {
      models.Menu.hasMany(models._________) //ask group
    };
  
    return Menu;
  }