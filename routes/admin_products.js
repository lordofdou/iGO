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
	// console.log(req.query.id);
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
	// console.log(req.body.p1);
	
	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;
 // //    //上传产品图片
    form.parse(req,function(error,fields,files){
    	if (error) {
	      res.render('fail', {title : "上传失败", message: err});
	      return;		
	    } 
	    // console.log(fields);
	    // console.log(files);
	    //一般数据获取
	    var name = fields.name;
	    var region = fields.region;
		var factory = fields.factory;
		var price = fields.price;
		var sale  = fields.sale;
		var storage = fields.storage;
		var count = fields.count;
		var cid = fields.category;
		var onSale = fields.onSale;

		//图片存储与地址存储
		var picString;
		var descString;
		var picArray = new Array();
		var descArray = new Array();

		var extName = 'png';  //后缀名
	    var avatarName;		  //随机数文件名
	    var newPath;		  //文件存储路径
		for (var key in files){
			// console.log(key[0]);
			if(files[key]["size"]==0){
				continue;
			}
			avatarName = Math.random() + '.' + extName;
			//存储路径
	    	newPath= form.path + avatarName;
	    	//重命名图片并同步到磁盘上
	    	fs.renameSync(files[key]["path"], newPath);
	    	// console.log("path:"+files[key]["path"]);
	    	//访问路径
	    	newPath = AVATAR_UPLOAD_FOLDER + avatarName;
	    	
	    	if(key[0]=='p'){
	    		picArray.push(newPath);
	    	}else{
	    		descArray.push(newPath);
	    	}


		}

		picString = picArray.join('|');
		descString = descArray.join('|');

		var pvt = new Array();
		pvt.property = "name,cid,region,pic,factory,description,price,sale,storage,count,onSale"
		// "'"+ +"'"+       ","+
		pvt.value = "'"+name+"'"+","+
					cid+","+
					"'"+region+"'"+","+
					"'"+picString+"'"+","+
					"'"+factory+"'"+","+
					"'"+descString+"'"+","+
					price+","+
					sale+","+
					storage+","+
					count+","+
					onSale;
		pvt.table = "commodity"

		sql.connect();
		sql.insertRecordintoTable(pvt,function(err,results){
			if(err){
				res.send(err.message);
				return;
			}
			res.redirect('/admin_products');
		});
		// insertRecordintoTable
		
    });
    
    //上传描述图片
});

router.post('/modify',function(req,res,results){
	var form = new formidable.IncomingForm(); 
    form.path = __dirname + '/../public' + AVATAR_UPLOAD_FOLDER;
 // //    //上传产品图片
    form.parse(req,function(error,fields,files){
    	if (error) {
	      res.render('fail', {title : "上传失败", message: err});
	      return;		
	    } 
	    // console.log(fields);
	    // console.log(files);
	    //一般数据获取
	    var id = fields.id;
	    var name = fields.name;
	    var region = fields.region;
		var factory = fields.factory;
		var price = fields.price;
		var sale  = fields.sale;
		var storage = fields.storage;
		var count = fields.count;
		var cid = fields.category;
		var onSale = fields.onSale;

		//图片存储与地址存储
		var picString;
		var descString;
		var picArray = new Array();
		var descArray = new Array();

		var extName = 'png';  //后缀名
	    var avatarName;		  //随机数文件名
	    var newPath;		  //文件存储路径
		for (var key in files){
			// console.log(key[0]);
			if(files[key]["size"]==0){
				continue;
			}
			avatarName = Math.random() + '.' + extName;
			//存储路径
	    	newPath= form.path + avatarName;
	    	//重命名图片并同步到磁盘上
	    	fs.renameSync(files[key]["path"], newPath);
	    	//访问路径
	    	newPath = AVATAR_UPLOAD_FOLDER + avatarName;
	    	
	    	if(key[0]=='p'){
	    		picArray.push(newPath);
	    	}else{
	    		descArray.push(newPath);
	    	}


		}

		picString = picArray.join('|');
		descString = descArray.join('|');

		var pvt = new Array();
		pvt.property = "id,name,cid,region,pic,factory,description,price,sale,storage,count,onSale"
		// "'"+ +"'"+       ","+
		pvt.value = id+","+
					"'"+name+"'"+","+
					cid+","+
					"'"+region+"'"+","+
					"'"+picString+"'"+","+
					"'"+factory+"'"+","+
					"'"+descString+"'"+","+
					price+","+
					sale+","+
					storage+","+
					count+","+
					onSale;
		console.log("------------"+pvt.value);
		pvt.table = "commodity"

		sql.connect();
		sql.modifyRecordFromCommodity(pvt,function(err,results){
			if(err){
				res.send(err.message);
				return;
			}
			res.redirect('/admin_products');
		});
		// insertRecordintoTable
		
    });
	
})

router.get('/search',function(req,res,next){
	var value = req.query.value;

	sql.connect();
	sql.searchFromCommodity(value,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		res.render('admin_products_search',{admin_name: req.session.username,list:results});
	});
	// res.render('admin_products_search',{admin_name: req.session.username,list:""});
});

router.get("/add",function(req,res,next){

	
	res.render('admin_products_add',{admin_name: req.session.username});
});

router.get("/detail",function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommodityWithId(id,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		res.render('admin_products_detail',{admin_name: req.session.username,prodinfo:results});
	});
	// res.render('admin_products_add',{admin_name: req.session.username});
});

router.get('/modifystorage',function(req,res,results){
	var ipvt = new Array();
	ipvt.id = req.query.id;
	ipvt.property = "storage";
	ipvt.value = req.query.value;
	ipvt.table = "commodity";
	cid = req.query.cid;
	category = req.query.category;
	
	sql.connect();
	sql.modifyRecordfromTable(ipvt,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		var url = "/admin_products/query?id="+cid+"&category="+category;
		res.redirect(encodeURI(url));
	});

})


module.exports = router;