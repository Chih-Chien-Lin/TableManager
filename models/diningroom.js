module.exports = function(sequelize, DataTypes) {
  var Diningroom = sequelize.define("Diningroom", {
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false, // Need to change this later when we allow for seat
    },
    // availability: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true},
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