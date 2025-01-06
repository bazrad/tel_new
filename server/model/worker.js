const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('worker', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    loginName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

  }, {
    sequelize,
    tableName: 'worker',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__call__3213E83F144BA8E9",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
