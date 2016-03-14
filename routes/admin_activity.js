var express = require('express');
var router = express.Router();
var sql = require('./sql');
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/activityUpload/';
var path=require('path');
var	StringDecoder = require('string_decoder').StringDecoder;
var	EventEmitter = require('events').EventEmitter;
var	util=require('util');


function loginValidate(req, res){
//没有登录无法进入此页面
	if(!req.session.username){
		res.redirect('/');
		return;
	}
}
router.get('/', function(req, res, next) {
	loginValidate(req, res);
	sql.connect();

	var indecate = req.query.indecate;

	//读取数据库活动类别名称
	sql.activitySelectCategoryName(function(err, categorys){
		if(err){
			res.render('fail', {title : "获取数据失败", message: "数据库活动分类数据出现丢失"});
			return;
		}
	
		//读取数据库中 活动数据  
		sql.activitySelectAllRecord(function(err, results){
			if(err){
				res.render('fail', {title : "获取数据失败", message: "活动数据库出现错误"});
				return;
			}

			if(!indecate){
				
				sql.activityGetFirstPopId(function(err, indecateResults){
					indecate = indecateResults[0]['id'];
					res.render('admin_activity', {activity_indecate : indecate, admin_name: req.session.username, admin_activity_category: categorys, admin_activity_pops : results});
				});
			}else{
				res.render('admin_activity', {activity_indecate : indecate, admin_name: req.session.username, admin_activity_category: categorys, admin_activity_pops : results});
			}
		});
	
	});
});

router.post('/uploadPic', function(req, res, next){
	loginValidate(req, res);

	EventEmitter.call(this);
	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录

	form.parse(req,function(error, fields, files){
		if (error) {
	      res.render('fail', {title : "上传失败", message: err});
	      return;		
	    } 

	    var position;
	    for(var key in files){
	    	if(files[key]["size"]){
	    		position = key;
	    		break;
	    	}
	    }

		var extName = 'png';  //后缀名

		var avatarName = Math.random() + '.' + extName;
	    var newPath = form.path + avatarName;

	    fs.renameSync(files[key]["path"], newPath);  //重命名		

	    //将位置、类别写入数据库	
	    var pid = parseInt(files[key]["name"].substring(0, files[key]["name"].lastIndexOf(".")));
	    if(!pid){
	    	pid = 0;
	    }
	    var popid = fields['popid'];
	    var postion = key;
	    var url = newPath.substring(newPath.lastIndexOf("activityUpload"), newPath.length);
	    var isVisiable = 1;

	    var insertArray = new Array();
	    insertArray.pid = pid;
	    insertArray.popid = popid;
	    insertArray.position = position;
	    insertArray.url = url;
	    insertArray.isVisiable = isVisiable;
	    sql.activityInsertARecord(insertArray, function(err, results){
	    	if(err){
	    		res.render('fail', {title : "上传失败", message: "活动数据库出错"});
	     		return;	
	    	}

	   		res.redirect('/admin_activity?indecate=' + popid);
	    });


    });

	return;
});

router.post('/setPid', function(req, res, next){
	var setpid_indecate = req.body.setpid_indecate;
	var setpid_popid = req.body.setpid_popid;
	var setpid_position = req.body.setpid_position;
	var setpid_pid = req.body.setpid_pid;

	var info = new Array();
	info.setpid_pid = setpid_pid;
	info.setpid_position = setpid_position;
	info.setpid_popid = setpid_popid;

	sql.activitySetPid(info, function(err, result){
		if(err){
			res.render('fail', {title : "设置pid失败", message: "活动数据库出错"});
	     	return;	
		}
		res.redirect('/admin_activity?indecate=' + setpid_indecate);
	});
	
	
});

module.exports = router;
