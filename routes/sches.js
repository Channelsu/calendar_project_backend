// var models = require('../models');
// var express = require('express');
// var router = express.Router();


// exports.index = function(req, res, next) {
//   models.sches.all().then(sches => {
//     res.render('sche/index', {sches : sches});
//   });
// };

var express = require('express');
var router = express.Router();
const sches = require("../models/sches");
const { Sequelize, DataTypes } = require("sequelize");
const env = express().get("env");
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(config);
const SchesTable = sches(sequelize, DataTypes);

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let sches = await SchesTable.findAll();
  return res.status(200).json({
    success: true,
    message: "task select completed.",
    object: sches,
  });
});

module.exports = router;