const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('call', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    duration_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    number_id_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_id_out: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calltype_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'call',
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
