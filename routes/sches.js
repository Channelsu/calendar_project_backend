var express = require('express');
const { Sequelize, DataTypes } = require("sequelize");
const env = express().get("env");
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(config);
const bodyparser = require("body-parser"); // JSONparserモジュールを読み込む
const sches = require("../models/sches");
const SchesTable = sches(sequelize, DataTypes);
var router = express.Router();

// JSON形式で取得できるようにする
router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

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

router.post('/ins', async function(req, res, next) {
  console.log('req.body→', req.body);
  let tx;

  try {
    // トランザクション開始
    tx = await sequelize.transaction();

    // 外出予定の登録
    let result = await SchesTable.create(
      {
        title: req.body.title,
        start_date: req.body.start_date,
        start_time: req.body.start_time,
        end_date: req.body.end_date,
        end_time: req.body.end_time,
        bar_color: req.body.bar_color,
        remark: req.body.remark,
      },
      {
        transaction: tx,
      }
    );

    // コミット
    await tx.commit();
    
    console.log('result→', result);
    return res.status(200).json({
      success: true,
      message: 'スケジュールをDBに格納成功',
      object: result,
    });
  } catch (error) {
    // ロールバック
    if (tx) {
      await tx.rollback();
    }    
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
