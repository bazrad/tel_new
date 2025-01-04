const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('calltype', {
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
    tableName: 'calltype',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__calltype__3213E83FB5852745",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
