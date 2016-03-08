var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var client;
var DATABASE_NAME = "iGO";

//admin table name
var TABLE_NAME_ADMIN = "admin";


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

var loginConfirm = function(userinfo, callback){
	var sql = "SELECT * from " + TABLE_NAME_ADMIN + " where name='" + userinfo.username + "' and password='" + userinfo.password + "'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var usernameRegConfirm = function(username, callback){
	var sql = "SELECT id from " + TABLE_NAME_ADMIN + " where name='" + username + "'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var selectPropertyfromTable = function(pt,callback){
	var property = pt.property;
	var table = pt.table;
	var sql = "select "+property+" from "+table;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

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

var deleteRecordfromTable = function(pvt,callback){
	var property = pvt.property;
	var value = pvt.value;
	var table = pvt.table;
	var sql = "delete from "+table+" where "+property+" = "+value;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

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

exports.connect = connect;
exports.loginConfirm = loginConfirm;
exports.usernameRegConfirm = usernameRegConfirm;
exports.selectPropertyfromTable = selectPropertyfromTable;
exports.insertRecordintoTable = insertRecordintoTable; 
exports.deleteRecordfromTable = deleteRecordfromTable;
exports.modifyRecordfromTable = modifyRecordfromTable;
