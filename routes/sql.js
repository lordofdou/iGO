var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var client;
var DATABASE_NAME = "iGO";

//admin table name
var TABLE_NAME_ADMIN = "admin";


//链接数据库
var connect = function(){
	client = mysql.createConnection({
		user:'root',
		password:'123456'
	}); 
	client.connect();
	client.query('USE ' + DATABASE_NAME);
}

// var insertUserinfo = function(userinfo, callback){
// 	var sql = "INSERT INTO " + TABLE_NAME + " (name, password) VALUES('" + userinfo.username + "','"+ userinfo.password + "')";
// 	client.query(sql, function(err, results){
// 		callback(err, results);
// 	});
// }

/**** 管理员相关 ****/

//登录用户名密码验证
var loginConfirm = function(userinfo, callback){
	var sql = "SELECT * from " + TABLE_NAME_ADMIN + " where name='" + userinfo.username + "' and password='" + userinfo.password + "'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//更新管理员最近登陆时间
var adminLastLoginTime = function(userInfo, callback){
	var sql = "UPDATE admin SET lastLoginTime = " + userInfo.lastLoginTime + " where id = " + userInfo.id;
	console.log(sql);
	client.query(sql, function(err, results){
		callback(err, results);
	});

}

//用户名验证
var usernameRegConfirm = function(username, callback){
	var sql = "SELECT id from " + TABLE_NAME_ADMIN + " where name='" + username + "'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//从 指定表中 寻找 指定属性
var selectPropertyfromTable = function(pt,callback){
	var property = pt.property;
	var table = pt.table;
	var sql = "select "+property+" from "+table;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

//插入一条记录 到指定表中
var insertRecordintoTable = function(pvt,callback){
	var property = pvt.property;
	var value = pvt.value;
	var table = pvt.table;
	var sql = "insert into "+table+" ( "+property+" ) "+"values"+" ( "+value+" )";
	console.log(sql);
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

//从指定表中删除一条记录
var deleteRecordfromTable = function(pvt,callback){
	var property = pvt.property;
	var value = pvt.value;
	var table = pvt.table;
	var sql = "delete from "+table+" where "+property+" = "+value;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

//从制定表中修改一条记录
var modifyRecordfromTable = function(ipvt,callback){
	var id = ipvt.id;
	var property = ipvt.property;
	var value = ipvt.value;
	var table = ipvt.table;
	var sql = "update "+table+" set "+property+"="+value+" where "+"id="+id;
	client.query(sql,function(err,results){
		callback(err,results);
	});
	 
}


/**** ****/


/**** 商品相关 ****/
var queryCommodityWithCid = function(cid,callback){
	var sql = "select * from commodity where cid="+cid;
	console.log(sql);
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

/**** ****/


/**** 活动相关 ****/

var activitySelectCategoryName = function(callback){
	var sql = "SELECT id,pop from pop;"
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var activityInsertARecord = function(info, callback){
	//删除原来位置上的图片
	var sql = "DELETE FROM popular where positon = '" + info.position + "' AND popid = '" + info.popid + "';";
	console.log(sql);
	client.query(sql, function(err, results){});

	//添加
	var sql = "INSERT INTO popular (popid, positon, url, pid, isVisible) values("+ info.popid +"," + info.position + ",'" + info.url + "', " + info.pid + ", " + info.isVisiable + ");"
	console.log(sql);
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var activitySelectAllRecord = function(callback){
	var sql = "SELECT * FROM popular;";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var activityGetFirstPopId = function(callback){
	var sql = "SELECT id FROM pop order by id limit 1";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
/**** ****/

exports.connect = connect;
exports.loginConfirm = loginConfirm;
exports.usernameRegConfirm = usernameRegConfirm;
exports.selectPropertyfromTable = selectPropertyfromTable;
exports.insertRecordintoTable = insertRecordintoTable; 
exports.deleteRecordfromTable = deleteRecordfromTable;
exports.modifyRecordfromTable = modifyRecordfromTable;
exports.adminLastLoginTime = adminLastLoginTime;
exports.activitySelectCategoryName = activitySelectCategoryName;
exports.activityInsertARecord = activityInsertARecord;
exports.activitySelectAllRecord = activitySelectAllRecord;
exports.activityGetFirstPopId = activityGetFirstPopId;
exports.queryCommodityWithCid = queryCommodityWithCid;
