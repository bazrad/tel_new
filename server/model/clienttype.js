const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('clienttype', {
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
    tableName: 'clienttype',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__clientty__3213E83FFD828AEB",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
