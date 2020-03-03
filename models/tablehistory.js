module.exports = function(sequelize, DataTypes) {
  var TableHistory = sequelize.define("TableHistory", {
      start_at: {
        type: DataTypes.TIME
      },
      end_at: {
        type: DataTypes.TIME
      },
      app_time: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0',
      },
      entree_time: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0',
      },
      dessert_time: {
        type: DataTypes.BOOLEAN,
        defaultValue: '0',
      }
  });

  TableHistory.associate = (models) =>{
    models.TableHistory.belongsTo(models.Diningroom,{
      onDelete: "CASCADE",
      foreignKey:{
        allowNull: false
      }
    })
  }

  return TableHistory;
}