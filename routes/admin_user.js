var express = require('express');
var router = express.Router();
var sql = require('./sql');
var PER_PAGE = 9;

/* GET home page. */
router.get('/', function(req, res, next) {
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	/**** 分页 *****/
	var currentPage = 1;
	if(req.query.page){
		currentPage = (req.query.page >= 1) ? req.query.page : 1;
	}

	//创建count
	var count = new Array();
	count.start = (currentPage - 1) * PER_PAGE;
	count.num = PER_PAGE;
	/**** 分页 *****/

	var username = req.query.username;
	if(username){
		//搜索筛选
		sql.userSearchResult(username, function(err, results){

			/**** 分页 *****/
			var recordCount = results.length;
			
			var pagesNum = parseInt(parseInt(recordCount) / PER_PAGE);
			if(recordCount != 0){
				if(recordCount%PER_PAGE){
					pagesNum = pagesNum + 1;
				}
				if(currentPage > pagesNum){
					count.start = (pagesNum - 1) * PER_PAGE;
					currentPage = pagesNum;
				}
			}
			/**** 分页 *****/

			for(var i = 0; i<results.length; i++){
		    	var user = results[i];
		    	if(parseInt(user['sex']) == 1){
		    		results[i]['sexText'] = "男";
		    	}else if(parseInt(user['sex']) == 0){
		    		results[i]['sexText'] = "女";
		    	}else{
		    		results[i]['sexText'] = "未知";
		    	}

		    	if(results[i]['lastLoginTime']){
					results[i]['lastLoginTimeText'] = new Date(parseInt(results[i]['lastLoginTime'])).toLocaleString();
		    	}else{
		    		results[i]['lastLoginTimeText'] = "---";
		    	}
		    }
		    sql.sysSettingLoginStatus(function(err, ret){
		    	var loginStatus = ret[0]['setValue'];
		   		res.render('admin_user', {admin_name: req.session.username, users: results, pagesNum: pagesNum, currentPage: currentPage, loginStatus:loginStatus, username:username});
			}); 

		});
	}

	sql.userAllNumbers(function(err, numbers){
		/**** 分页 *****/
		var recordCount = numbers[0]['count'];
		
		var pagesNum = parseInt(parseInt(recordCount) / PER_PAGE);
		if(recordCount != 0){
			if(recordCount%PER_PAGE){
				pagesNum = pagesNum + 1;
			}
			if(currentPage > pagesNum){
				count.start = (pagesNum - 1) * PER_PAGE;
				currentPage = pagesNum;
			}
		}
		/**** 分页 *****/

		sql.userSelectAll(count, function(err, results){
			if (err) {
		      res.render('fail', {title : "获取用户数据失败", message: "用户数据库出错"});
		      return;		
		    } 

		    for(var i = 0; i<results.length; i++){
		    	var user = results[i];
		    	if(parseInt(user['sex']) == 1){
		    		results[i]['sexText'] = "男";
		    	}else if(parseInt(user['sex']) == 0){
		    		results[i]['sexText'] = "女";
		    	}else{
		    		results[i]['sexText'] = "未知";
		    	}

		    	if(results[i]['lastLoginTime']){
					results[i]['lastLoginTimeText'] = new Date(parseInt(results[i]['lastLoginTime'])).toLocaleString();
		    	}else{
		    		results[i]['lastLoginTimeText'] = "---";
		    	}
		    }

		    sql.sysSettingLoginStatus(function(err, ret){
		    	var loginStatus = ret[0]['setValue'];
		   		res.render('admin_user', {admin_name: req.session.username, users: results, pagesNum: pagesNum, currentPage: currentPage, loginStatus:loginStatus, username:""});
			}); 	
		   

		});
	});
});

router.get('/deleteA', function(req, res, next){
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var idNumber = req.query.id;
	if(!idNumber){
		res.redirect('/admin_user');
		return;
	}

	sql.userDeletaARecord(idNumber, function(err ,results){
		if (err) {
	      res.render('fail', {title : "删除失败", message: "用户数据库出错"});
	      return;		
	    } 
	    res.redirect('/admin_user?page=' + req.query.page);
	});
});

router.get('/noLogin', function(req, res, next){
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var idNumber = req.query.id;
	if(!idNumber){
		res.redirect('/admin_user');
		return;
	}

	sql.userSetLogin(idNumber, function(err, results){
		if (err) {
	      res.render('fail', {title : "操作失败", message: "用户数据库出错"});
	      return;		
	    } 

	    res.redirect('/admin_user?page=' + req.query.page);
	});
});

router.get('/changeLoginStatus', function(req, res, next){
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	sql.sysSettingChangeLoginStatus(function(err, results){
		if (err) {
	      res.render('fail', {title : "操作失败", message: "用户数据库出错"});
	      return;		
	    } 
	    res.redirect('/admin_user?page=' + req.query.page);
	});
});

module.exports = router;
