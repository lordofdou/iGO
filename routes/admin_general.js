var express = require('express');
var router = express.Router();
var sql = require('./sql');
//md5 needed
var crypto = require('crypto');

/* GET home page. */
router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(password);
	var passwordMD5;

	var md5 = crypto.createHash('md5');
	md5.update(password);
	passwordMD5 = md5.digest('hex'); 

	var userInfo = new Array();
	userInfo.username = username;
	userInfo.password = passwordMD5;

	//数据库验证
	sql.connect();
	sql.usernameRegConfirm(userInfo.username, function(err, results){
		if(err){
			res.render('fail', {title : "登录失败", message: err.message});
			return;
		}

		if(!results.length){
			res.render('fail', {title : "登录失败", message: "管理员不存在"});
			return;
		}

		//用户名 ｜ 密码验证

		sql.loginConfirm(userInfo, function(err, result){
			if(err){	
				res.render('fail', {title : "登录失败", message: err.message});
				return;
			}
			if(!result.length){
				res.render('fail', {title : "登录失败", message: "您输入的密码有误"});
				return;
			}

			//set session
			req.session.username = result[0].name;
			req.session.uid = result[0].id;
			req.session.lastLoginTime = result[0].lastLoginTime;

			//jump to home
			res.redirect('/admin_general');
		});
	});

});

router.get('/', function(req, res, next){
	if(!req.session.username){
		res.render('/');
	}
	res.render('admin_general');
});

module.exports = router;
