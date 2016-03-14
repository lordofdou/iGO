var express = require('express');
var router = express.Router();
var sql = require('./sql')
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/commodityUpload/';
var path=require('path');
var	StringDecoder = require('string_decoder').StringDecoder;
var	EventEmitter = require('events').EventEmitter;
var	util=require('util');

router.get('/',function(req,res,next) {
	var pt = new Array();
	pt.property = "*";
	pt.table = "category";

	sql.connect();
	sql.selectPropertyfromTable(pt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		var array = new Array();
		var big = 0;
		for (var i=0;i<results.length;i++ ){
			if(results[i].superid > big) {
				big = results[i].superid;
				array[results[i].superid] = new Array();
				array[results[i].superid].push(results[i]);

			}else{
				array[results[i].superid].push(results[i]);
			}
		}
		// console.log("####");
		// console.log(array);

		res.render('admin_products',{array:array,admin_name: req.session.username});
	});

});

router.get('/query',function(req,res,next) {
	var cid = req.query.id;
	console.log(req.query.id);
	var category = req.query.category;
	//sql query
	sql.connect();
	sql.queryCommodityWithCid(cid,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		res.render('admin_products_list',{admin_name : req.session.username,title:category,list:results});
	});
	
})

router.get("/onSale",function(req,res,next) {
	var ipvt = new Array();

	ipvt.id = req.query.id;
	ipvt.property = "onSale";
	if(req.query.value == 1){
		ipvt.value = 0;
	}else{
		ipvt.value = 1;
	}
	console.log(req.query.value+ipvt.value);
	ipvt.table = "commodity";

	cid = req.query.cid;
	category = req.query.category;

	sql.connect();
	sql.modifyRecordfromTable(ipvt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		// res.send("success");
		console.log(category);
		var url = "/admin_products/query?id="+cid+"&category="+category;
		res.redirect(encodeURI(url));
		// res.redirect("/admin_products/query?id="+cid+"&category="+category);
	});

})

router.get("/delete",function(req,res,next) {
	var id = req.query.id;
	var pvt = new Array();
	pvt.property = "id"
	pvt.value = id;
	pvt.table = "commodity";

	cid = req.query.cid;
	category = req.query.category;

	sql.connect();
	sql.deleteRecordfromTable(pvt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		var url = "/admin_products/query?id="+cid+"&category="+category;
		res.redirect(encodeURI(url));
	})

});

router.post("/",function(req,res,next){
	console.log(req);
	return;
	// loginValidate(req, res);
	// EventEmitter.call(this);
	var pic = req.pic;
	var description = req.description;
	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;
 //    //上传产品图片
    form.parse(req,function(error,fields,files){
    	if (error) {
	      res.render('fail', {title : "上传失败", message: err});
	      return;		
	    } 
	    var extName = 'png';  //后缀名
	    var avatarName;
	    var picPath = new Array();
	    console.log(files);
	    for(var key in files) {
	    	if(files[key]["size"]!=0){
	    		avatarName = Math.random() + '.' + extName;
		    	var newPath= form.path + avatarName;
		    	fs.renameSync(files[key]["path"], newPath);
		    	// console.log("-------"+files[key]["name"]);
		    	picPath.push(newPath);	
	    	}
		};	    
		res.send("success");
    });
    
    //上传描述图片
});

module.exports = router;