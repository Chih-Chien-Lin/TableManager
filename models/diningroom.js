module.exports = function(sequelize, DataTypes) {
  var Diningroom = sequelize.define("Diningroom", {
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [2,6],
        isInt: true}
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: '1',}
    },{
      freezeTableName: true
    }
  );

  Diningroom.associate = (models) => {
    models.Diningroom.hasMany(models.TableHistory, {as: 'tables'})
  };

  return Diningroom;
}