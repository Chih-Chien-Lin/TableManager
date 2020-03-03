module.exports = function(sequelize, DataTypes) {
  var TableHistory = sequelize.define("TableHistory", {
      start_at: {
        type: DataTypes.TIME
      },
      end_at: {
        type: DataTypes.TIME
      }
  })
}