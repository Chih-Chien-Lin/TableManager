module.exports = function(sequelize, DataTypes) {
  var Diningroom = sequelize.define("Diningroom", {
    seats: {
      type: DataTypes.INTEGER,
      allowNull: true, // Need to change this later when we allow for seat
      validate: {
        len: [1,6],
        isInt: true
      }
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