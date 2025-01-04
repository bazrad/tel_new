const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('client_phone', {
    client_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    phone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'client_phone',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__client_p__D14A72F957DF5D1D",
        unique: true,
        fields: [
          { name: "client_id" },
          { name: "phone_id" },
        ]
      },
    ]
  });
};
