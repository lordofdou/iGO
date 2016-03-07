var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('admin_index');
});

router.post('/admin_index', function(req, res, next){

	//验证用户名和密码
	//session
	//数据库读取各类信息
	res.render('admin_general');
});

module.exports = router;
