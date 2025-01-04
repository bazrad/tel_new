const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('part', {
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
    division_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'part',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__part__3213E83FCB4D8D87",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
