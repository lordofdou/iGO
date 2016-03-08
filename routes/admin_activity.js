var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	//没有登录无法进入此页面
	if(!req.session.username){
		res.redirect('/');
		return;
	}


	//读取数据库中 活动数据  

	
  	res.render('admin_activity', {admin_name: req.session.username});
});

module.exports = router;
