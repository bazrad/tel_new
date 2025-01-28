const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('devicetype', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'devicetype',
    timestamps: false,
    indexes: [
      {
        name: "PK__devicety__3213E83F47E9E62C",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
