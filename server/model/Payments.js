const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payments', {
    phoneNumber: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Payments',
    schema: 'bazrad',
    timestamps: false
  });
};
