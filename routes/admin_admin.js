var express = require('express');
var router = express.Router();
var sql = require('./sql');
/* GET home page. */
router.get('/', function(req, res, next) {

	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}
	
	var pt = new Array();
	pt.property = "id,name,lastLoginTime,canLogin";
	pt.table = "admin";
	sql.connect();
	sql.selectPropertyfromTable(pt,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		if(!results.length){
			res.send("empty");
			return;
		}

		var i = 0;
		for(i=0; i<results.length; i++){
			var admin = results[i];
			if(!admin.lastLoginTime){
				results[i].lastLoginTime = "- - -";
			}else{
				results[i].lastLoginTime = new Date(parseInt(admin.lastLoginTime)).toLocaleString();
			}
			
		}

		console.log(results);
	
		// res.send(results[0]); 
		// console.log("########");
		res.render('admin_admin',{data:results, admin_name : req.session.username});
		// res.render('admin_admin');

	});
});

router.post('/',function(req,res,next) {
	// console.log("########");
	
	var name = req.body.name;
	var password = req.body.password;
	var pvt = new Array();
	pvt.property = "name,password,canLogin"
	pvt.value = '"'+name+'"'+","+'"'+password+'"'+",0";
	pvt.table = "admin";


	sql.connect();
	sql.insertRecordintoTable(pvt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		res.redirect("/admin_admin");
	});
});

router.get("/delete",function(req,res,next) {
	var id = req.query.id;
	var pvt = new Array();
	pvt.property = "id"
	pvt.value = id;
	pvt.table = "admin";

	sql.connect();
	sql.deleteRecordfromTable(pvt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		res.redirect("/admin_admin");
	})

});

router.get("/canLogin",function(req,res,next) {
	var ipvt = new Array();

	ipvt.id = req.query.id;
	ipvt.property = "canLogin";
	if(req.query.value == 1){
		ipvt.value = 0;
	}else{
		ipvt.value = 1;
	}
	
	ipvt.table = "admin";

	sql.connect();
	sql.modifyRecordfromTable(ipvt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		res.redirect("/admin_admin");
	})

});

module.exports = router;
