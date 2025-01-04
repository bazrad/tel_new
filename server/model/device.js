const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('device', {
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
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'device',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__device__3213E83F82C53EA2",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
