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

var PER_PAGE = 15;

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

	sql.statusAllNumber(function(recordCount){
		/**** 分页 *****/
		
		var pagesNum = parseInt(parseInt(recordCount) / PER_PAGE);
		if(pagesNum != 0){
			if(recordCount%PER_PAGE){
				pagesNum = pagesNum + 1;
			}
			if(currentPage > pagesNum){
				count.start = (pagesNum - 1) * PER_PAGE;
				currentPage = pagesNum;
			}
		}
		/**** 分页 *****/

		sql.statusSelectAllRecord(count, function(err, results){
			if (err) {
		      res.render('fail', {title : "获取帖子数据失败", message: "帖子数据库出错"});
		      return;		
		    } 

		    for(var i = 0; i<results.length; i++){
		    	results[i]['time'] = new Date(parseInt(results[i]['time'])).toLocaleString();
		    }

		    sql.adminSelectUsers(function(err, admins){
		    	for(var i = 0; i<results.length; i++){
		    		for(var admin in admins){
		    			var adminID = admins[admin]['id'];
		    			if(results[i]['uid'] == adminID){
		    				results[i]['username'] = admins[admin]['name'];
		    				break;
		    			}
		    		}
		    	}

				res.render('admin_status', {admin_name: req.session.username, status: results, pagesNum: pagesNum, currentPage: currentPage});
		    	
		    });
		});

	});
  	
});

router.get('/add', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}
	res.render('admin_status_add', {admin_name: req.session.username});
});

function makeupInfo(files, fields, path, uid){
		//上传文件
	    //pic1
	    var pics = "";
	    var pic1 = uploadPic('pic1', files, path);
	    var pic2 = uploadPic('pic2', files, path);
	    var pic3 = uploadPic('pic3', files, path);

	    var picArr = new Array();
	    if(pic1){
	    	picArr.push(pic1);
	    }
	    if(pic2){
	    	picArr.push(pic2);
	    }
	    if(pic3){
	    	picArr.push(pic3);
	    }
	    var pics = picArr.join('|');


	    var info = new Array();
	    info.pic = pics;
	    info.pid = parseInt(fields.pid);
	    info.title = fields.title;
	    info.time = new Date().getTime();
	    info.uid = uid;
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
	    return info;
}

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
	      res.render('fail', {title : "上传失败", message: "帖子数据库出错"});
	      return;		
	    } 

	    var info = makeupInfo(files, fields, form.path, req.session.uid);

	    sql.statusInsertARecord(info, function(err ,results){
			if(err){
	    		res.render('fail', {title : "添加失败", message: "帖子数据库出错"});
	     		return;	
	    	}
			res.redirect('/admin_status');
	    });

	});
});	

router.post('/doModify', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录

	form.parse(req,function(error, fields, files){
		var modifyID = fields.id;
		
		var info = makeupInfo(files, fields, form.path, req.session.uid, "modify");
		info.id = modifyID;

	    sql.statusModifyARecord(info, function(err, results){
			if(err){
	    		res.render('fail', {title : "修改失败", message: "帖子数据库出错"});
	     		return;	
	    	}
			res.redirect('/admin_status');
	    });
	});
});

router.get('/modify', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var modifyId = req.query.id;
	if(!modifyId){
		res.redirect('/admin_status');
	}

	sql.statusSelectARecord(modifyId, function(err, results){
		if(err){
    		res.render('fail', {title : "获取帖子信息失败", message: "帖子数据库出错"});
     		return;	
    	}
    	if(results.length == 0){
    		res.render('fail', {title : "获取帖子信息失败", message: "帖子数据库出错"});
     		return;	
    	}

    	var statu = results[0];
    	var picArr = statu['pic'].split('|');
    	statu['pic1'] = picArr[0];
    	statu['pic2'] = picArr[1];
    	statu['pic3'] = picArr[2];

    	statu['description_titles'] = statu['description_title'].split('|');
    	statu['descriptions'] = statu['description'].split('|');
    	res.render('admin_status_modify', {admin_name: req.session.username, statu: statu});

	});
});

router.get('/deleteA', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	var deleteID = req.query.id;
	sql.statusDeleteAStatu(deleteID, function(err, results){
		if (err) {
		      res.render('fail', {title : "删除失败", message: "帖子数据库出错"});
		      return;		
		} 

		res.redirect('/admin_status?page' + req.query.page);
	});
});


router.get('/deleteAll', function(req, res, next){
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

	sql.statusDelstaAllStatus(function(err ,results){
		if (err) {
		      res.render('fail', {title : "清空失败", message: "帖子数据库出错"});
		      return;		
		} 
		res.redirect('/admin_status');
	});
});

module.exports = router;
