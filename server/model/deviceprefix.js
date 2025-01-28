const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('deviceprefix', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prefix_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'deviceprefix',
    timestamps: false,
    indexes: [
      {
        name: "PK__devicepr__3213E83F6D0DDF23",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
