var DataTypes = require("sequelize").DataTypes;
var _Payments = require("./Payments");
var _call = require("./call");
var _calltype = require("./calltype");
var _client = require("./client");
var _client_phone = require("./client_phone");
var _clienttype = require("./clienttype");
var _device = require("./device");
var _deviceprefix = require("./deviceprefix");
var _devicetype = require("./devicetype");
var _division = require("./division");
var _nrptest = require("./nrptest");
var _part = require("./part");
var _phone = require("./phone");
var _prefix = require("./prefix");
var _tarif = require("./tarif");
var _tariftype = require("./tariftype");

function initModels(sequelize) {
  var Payments = _Payments(sequelize, DataTypes);
  var call = _call(sequelize, DataTypes);
  var calltype = _calltype(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var client_phone = _client_phone(sequelize, DataTypes);
  var clienttype = _clienttype(sequelize, DataTypes);
  var device = _device(sequelize, DataTypes);
  var deviceprefix = _deviceprefix(sequelize, DataTypes);
  var devicetype = _devicetype(sequelize, DataTypes);
  var division = _division(sequelize, DataTypes);
  var nrptest = _nrptest(sequelize, DataTypes);
  var part = _part(sequelize, DataTypes);
  var phone = _phone(sequelize, DataTypes);
  var prefix = _prefix(sequelize, DataTypes);
  var tarif = _tarif(sequelize, DataTypes);
  var tariftype = _tariftype(sequelize, DataTypes);


  return {
    Payments,
    call,
    calltype,
    client,
    client_phone,
    clienttype,
    device,
    deviceprefix,
    devicetype,
    division,
    nrptest,
    part,
    phone,
    prefix,
    tarif,
    tariftype
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
