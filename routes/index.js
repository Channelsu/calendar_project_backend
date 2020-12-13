var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  let test = {name: 'ルートです', date: '20201130'};
  return res.status(200).json({
    success: true,
    message: '成功です！',
    object: test,
  });
});

router.get('/test', function(req, res, next) {
  let test = {name: 'テストです', date: '20201130'};
  return res.status(200).json({
    success: true,
    message: '成功です！',
    object: test,
  });
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
      message: err,
    });
  }
});

router.get('/sches', function(req, res, next) {
  try {
    let result = {
      title: '本社',
      startDate: '20201215',
      startTime: '1000',
      endDate: '20201215',
      endTime: '1200',
      barColor: 'red',
      remark: '備考備考備考',
    };
    return res.status(200).json({
      success: true,
      message: 'スケジュール取得成功',
      object: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
