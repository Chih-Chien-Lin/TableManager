module.exports = function(sequelize, DataTypes) {
  var TableHistory = sequelize.define("TableHistory", {
    start_at: {
      type: DataTypes.TIME
    },
    end_at: {
      type: DataTypes.TIME
    },
    table_color: {
      type: DataTypes.STRING,
      defaultValue: 'White',
    },
    entree_time: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    },
    dessert_time: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    },
    foreign_key: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Diningroom',
        key: 'id'
      }
    }
}, {
  freezeTableName: true
});

  TableHistory.associate = (models) =>{
    models.TableHistory.belongsTo(models.Diningroom,{
      onDelete: "CASCADE",
      foreignKey: 'foreign_key', 
      as: 'ids'
    })
  }
  return TableHistory;
}