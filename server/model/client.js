const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
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
    client_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'client',
    schema: 'bazrad',
    timestamps: false,
    indexes: [
      {
        name: "PK__client__3213E83F313B1B9F",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
