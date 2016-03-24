var express = require('express');
var router = express.Router();
var sql = require('./sql');
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/notificationUpload/';
var path=require('path');
var	StringDecoder = require('string_decoder').StringDecoder;
var	EventEmitter = require('events').EventEmitter;
var	util=require('util');


router.get('/', function(req, res, next){

	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}
	
	//获取数据库信息
	sql.notificationSelectAll(function(err, result){
		if (err) {
		      res.render('fail', {title : "查询通知失败", message: "请稍后重试"});
		      return;		
	    } 

		res.render('admin_notification', {admin_name: req.session.username, notes:result});
	});
});

router.post('/add', function(req, res, next){
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}
	
	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录

	form.parse(req,function(error, fields, files){
		if (error) {
	      res.render('fail', {title : "发送失败", message: "请稍后重试"});
	      return;		
	    } 

	    var info = Array();


	    if(files['pic']['size']){
			var extName = 'png';  //后缀名
			var avatarName = Math.random() + '.' + extName;
		    var newPath = form.path + avatarName;
		    fs.renameSync(files['pic']["path"], newPath);  //重命名	
		    info.pic = newPath.substring(newPath.lastIndexOf("notificationUpload"), newPath.length);	
	    }

	    info.pid = fields["pid"];
	    info.title = fields["title"];
	    info.description = fields["description"];
	    info.createTime = new Date().getTime();

	    sql.notificationAddRecory(info, function(err, result){
	    	if (err) {
		      res.render('fail', {title : "发送失败", message: "请稍后重试"});
		      return;		
		    } 

		    //使用 极光推送

	    	res.redirect('/admin_notification');
	    });
	    

	});

	
});

module.exports = router;
