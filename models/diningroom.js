module.exports = function(sequelize, DataTypes) {
  var Diningroom = sequelize.define("Diningroom", {
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false, // Need to change this later when we allow for seat
    },
    twoSeat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fourSeat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sixSeat: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    },
    {
      freezeTableName: true
    }
  );

  Diningroom.associate = (models) => {
    models.Diningroom.hasMany(models.TableHistory, {
      onDelete: "CASCADE"
    })
  };

  return Diningroom;
}