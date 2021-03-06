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
    let results = [
      // {
      //   title: '本社',
      //   startDate: '20201215',
      //   startTime: '1000',
      //   endDate: '20201215',
      //   endTime: '1200',
      //   barColor: 'red',
      //   remarks: '備考備考備考',
      // },
      // {
      //   title: '調布',
      //   startDate: '20201220',
      //   startTime: '1300',
      //   endDate: '20201220',
      //   endTime: '1800',
      //   barColor: 'blue',
      //   remarks: '直帰します',
      // },
    ];
    results = await SchesTable.findAll();
    const fmtedResults = results.map((result) => {
      const obj = {
        id: result.dataValues.id,
        title: result.dataValues.title,
        startDate: result.dataValues.start_date,
        startTime: result.dataValues.start_time,
        endDate: result.dataValues.end_date,
        endTime: result.dataValues.end_time,
        barColor: result.dataValues.bar_color,
        remarks: result.dataValues.remarks,
        createdAt: result.dataValues.createdAt,
        updatedAt: result.dataValues.updatedAt,
      }
      return obj
    })

    console.log('res', fmtedResults);
    return res.status(200).json({
      success: true,
      message: 'スケジュール取得成功',
      object: fmtedResults,
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
    let results = await SchesTable.create(
      {
        title: req.body.title,
        start_date: req.body.start_date,
        start_time: req.body.start_time,
        end_date: req.body.end_date,
        end_time: req.body.end_time,
        bar_color: req.body.bar_color,
        remarks: req.body.remarks,
      },
      {
        transaction: tx,
      }
    );

    // コミット
    await tx.commit();
    
    console.log('results→', results);
    return res.status(200).json({
      success: true,
      message: 'スケジュールをDBに格納成功',
      object: results,
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

router.post('/upd', async function (req, res, next) {
  console.log('req.body→', req.body);
  let tx;
  const filter = {
    where: { id: req.body.id }
  };

  try {
    // トランザクション開始
    tx = await sequelize.transaction();

    // 予定更新
    let results = await SchesTable.update(
      {
        title: req.body.title,
        start_date: req.body.start_date,
        start_time: req.body.start_time,
        end_date: req.body.end_date,
        end_time: req.body.end_time,
        bar_color: req.body.bar_color,
        remarks: req.body.remarks,
      },
      filter,
      { transaction: tx, }
    );

    // コミット
    await tx.commit();

    // 更新対象が存在しない場合
    if (results === 0) {
      return res.status(500).json({
        success: false,
        message: "sche target not found.",
        objects: results,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "sche update completed.",
        objects: results,
      });
    }
  } catch (err) {
    // ロールバック
    if (tx) {
      await tx.rollback();
    }
    return res.status(500).json({ success: false, message: err });
  }
});

router.post('/del', async function (req, res, next) {
  console.log('req.body→', req.body);

  let results = {};
  let tx;

  try {
    // 予定IDで検索
    results = await SchesTable.findOne({
      attributes: ["id"],
      where: {
        id: req.body.id,
      },
    });

    // 存在しない予定の場合
    if (results == null) {
      // 予定ID不一致
      console.log("Error scheid mismatch.");

      return res.status(500).json({
        success: false,
        message: "Error scheid mismatch.",
        object: results,
      });
    }

    // トランザクション開始
    tx = await sequelize.transaction();

    // 予定の削除
    results = await SchesTable.destroy(
      {
        where: {
          id: req.body.id,
        },
      },
      {
        transaction: tx,
      }
    );

    // コミット
    await tx.commit();

    return res.status(200).json({
      success: true,
      message: "sche delete completed.",
      object: results,
    });
  } catch (err) {
    // ロールバック
    if (tx) {
      await tx.rollback();
    }

    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
