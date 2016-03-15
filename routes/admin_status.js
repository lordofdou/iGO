var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/statusUpload/';
var path=require('path');
var	StringDecoder = require('string_decoder').StringDecoder;
var	EventEmitter = require('events').EventEmitter;
var	util=require('util');
var sql = require('./sql');


function uploadPic(name, files, path){
	if(files[name]['size']){
		var extName = 'png';  //后缀名
		var avatarName = Math.random() + '.' + extName;
	    var newPath = path + avatarName;
	    fs.renameSync(files[name]["path"], newPath);  //重命名	
	    return newPath.substring(newPath.lastIndexOf("statusUpload"), newPath.length);	
    }
    return null;
}

router.get('/', function(req, res, next) {
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

  	res.render('admin_status', {admin_name: req.session.username});
});

router.get('/add', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}
	res.render('admin_status_add', {admin_name: req.session.username});
});

router.post('/add', function(req, res, next){

	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录

	form.parse(req,function(error, fields, files){
		if (error) {
	      res.render('fail', {title : "上传失败", message: err});
	      return;		
	    } 

	    //上传文件
	    //pic1
	    var pics = "";
	    var pic1 = uploadPic('pic1', files, form.path);
	    var pic2 = uploadPic('pic2', files, form.path);
	    var pic3 = uploadPic('pic3', files, form.path);
	    if(pic1){
	    	pics = pic1;
	    }
	    if(pic2){
	    	pics = pics + "|" + pic2;
	    }
	    if(pic3){
	    	pics = pics + "|" + pic3;
	    }

	    var info = new Array();
	    info.pic = pics;
	    info.pid = fields.pid;
	    info.title = fields.title;
	    info.time = new Date().getTime();
	    info.uid = req.session.uid;
	    info.count = 0;
	    info.description_title = "";
	    info.description = "";

	    for(var i = 1; i < 10; i++){
	    	var tit = 'desTitle' + i;
	    	var con = 'desCont' + i;
	    	if(!fields[tit]){
	    		break;
	    	}
	    	info.description_title = info.description_title + fields[tit] + "|";
	    	info.description = info.description + fields[con] + "|";
	    }
	    if(info.description[info.description.length - 1] == '|'){
	    	info.description = info.description.substring(0, info.description.length - 1);
	    }
	    if(info.description_title[info.description_title.length - 1] == '|'){
	    	info.description_title = info.description_title.substring(0, info.description_title.length - 1);
	    }

	    sql.statusInsertARecord(info, function(err ,results){
			if(err){
	    		res.render('fail', {title : "添加失败", message: "帖子数据库出错"});
	     		return;	
	    	}
			res.redirect('/admin_status');
	    });

	    
	});
});	

module.exports = router;
