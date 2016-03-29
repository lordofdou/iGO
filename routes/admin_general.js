var express = require('express');
var router = express.Router();
var sql = require('./sql');
//md5 needed
var crypto = require('crypto');

/* GET home page. */
router.post('/', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
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

			var canLogin = result[0].canLogin;
			if(canLogin == 0){
				res.render('fail', {title : "登录失败", message: "您未被授权登录，请联系超级管理员"});
				return;
			}

			//更新登陆时间
			var now = new Date().getTime();
			var loginInfo = new Array();
			loginInfo.id = result[0].id;
			loginInfo.lastLoginTime = now;
			sql.adminLastLoginTime(loginInfo, function(err, result){});

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
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}

	//获取数据库信息
	//订单数量
	sql.ordersAllNumbers(function(err, ordersCount){
		//管理员数量
		sql.adminAllNumbers(function(adminCount){
			//用户数
			sql.userAllNumbers(function(err, userNumbers){
				var userCount = userNumbers[0]['count'];

				//商品数量
				sql.commodityAllNumbers(function(commodityCount){
						//帖子数量
						sql.statusAllNumber(function(statusCount){

							//评论数量
							sql.commentAllNumbers(function(commentCount){
								res.render('admin_general', {admin_name: req.session.username, ordersCount:ordersCount,adminCount:adminCount,userCount:userCount,commodityCount:commodityCount,commentCount:commentCount,statusCount:statusCount});
							});

						});

				});
			});
		});
	});

	
});

router.get('/logout', function(req, res, next){

	req.session.username = '';
	req.session.uid = '';
	res.redirect('/');
});

module.exports = router;
