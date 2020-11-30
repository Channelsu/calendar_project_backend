var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  let test = {name: 'ルートです', date: '20201130'}
  return res.status(200).json({
    success: true,
    message: '成功です！',
    object: test,
  });
});

router.get('/test', function(req, res, next) {
  let test = {name: 'テストです', date: '20201130'}
  return res.status(200).json({
    success: true,
    message: '成功です！',
    object: test,
  });
});

router.post('/testpost', function(req, res, next) {
  console.log('req.body→', req.body);
  let test = {name: 'テストです', date: '20201130'}
  return res.status(200).json({
    success: true,
    message: '成功です！',
    object: test,
  });
});

module.exports = router;
