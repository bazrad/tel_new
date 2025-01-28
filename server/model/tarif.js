const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tarif', {
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
    tarif_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    root: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    },
    l1: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    },
    l2: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    },
    l3: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    },
    llast: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    },
    calltype_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tarif',
    timestamps: false,
    indexes: [
      {
        name: "PK__tarif__3213E83F066EF07A",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
