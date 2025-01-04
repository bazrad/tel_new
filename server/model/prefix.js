const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('prefix', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prefix_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'prefix',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__prefix__3213E83F2B9F9125",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
