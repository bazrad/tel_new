const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('station', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zone_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    zone_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'station',
    timestamps: false,
    indexes: [
      {
        name: "PK__station__3213E83FCB4D8D87",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
