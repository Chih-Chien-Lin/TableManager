module.exports = function(sequelize, DataTypes) {
  var TableHistory = sequelize.define("TableHistory", {
    start_at: {
      type: DataTypes.INTEGER
    },
    end_at: {
      type: DataTypes.TIME
    },
    table_color: {
      type: DataTypes.STRING,
      defaultValue: 'White',
    },
    order: {
      type: DataTypes.STRING
    },
    order_quantity: {
      type: DataTypes.STRING
    }
    // entree_time: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: '0',
    // },
    // dessert_time: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: '0',
    // },
  }, {
    freezeTableName: true
  });

//the associate below will automatically make a new foreign key called DiningroomID that will link the "tableHistory" table to the "diningroom" table. I ran node server like this and saw that sequelize created a foreign key for us to link. 

  TableHistory.associate = function(models) {
    models.TableHistory.belongsTo(models.Diningroom,{
      foreignKey: {
        allowNull: false
      },
    })
  }
  return TableHistory;
}