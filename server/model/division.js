const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('division', {
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
    department_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'division',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__division__3213E83F441DA784",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
