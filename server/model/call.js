const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('call', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    caller: {
      type: DataTypes.STRING,
      allowNull: false
    },
    called: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    duration_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    incomingTrunk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    outgoingTrunk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bearerServices: {
      type: DataTypes.STRING,
      allowNull: true
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
          { name: "id" }
        ]
      }
    ]
  });
};
