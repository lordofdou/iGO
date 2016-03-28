var express = require('express');
var router = express.Router();
var sql = require('./sql');

/* GET home page. */
router.get('/', function(req, res, next) {
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
		return;
	}
	
  	res.render('admin_user', {admin_name: req.session.username});
});

module.exports = router;
