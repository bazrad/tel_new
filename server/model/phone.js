const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phone', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    phone_number: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'phone',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__phone__3213E83FA5D8F0A8",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
