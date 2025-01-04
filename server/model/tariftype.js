const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tariftype', {
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
    tableName: 'tariftype',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__tariftyp__3213E83FC5DDD681",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
