var express = require('express');
const { Sequelize, DataTypes } = require("sequelize");
const env = express().get("env");
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(config);
const sches = require("../models/sches");
const SchesTable = sches(sequelize, DataTypes);
var router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    let result = [
      // {
      //   title: '本社',
      //   startDate: '20201215',
      //   startTime: '1000',
      //   endDate: '20201215',
      //   endTime: '1200',
      //   barColor: 'red',
      //   remark: '備考備考備考',
      // },
      // {
      //   title: '調布',
      //   startDate: '20201220',
      //   startTime: '1300',
      //   endDate: '20201220',
      //   endTime: '1800',
      //   barColor: 'blue',
      //   remark: '直帰します',
      // },
    ];
    result = await SchesTable.findAll();
    return res.status(200).json({
      success: true,
      message: 'スケジュール取得成功',
      object: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

router.post('/ins', function(req, res, next) {
  console.log('req.body→', req.body);
  try {
    let result = {
      title: req.body.title,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      barColor: req.body.barColor,
      remark: req.body.remark,
    };
    console.log('result→', result);
    return res.status(200).json({
      success: true,
      message: 'スケジュールをDBに格納成功',
      object: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
