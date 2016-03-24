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

/**** 管理员相关 ****/

//查询管理员id 和 name
var adminSelectUsers = function(callback){
	var sql = "SELECT id,name FROM admin;";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//根据管理员id返回名称
var adminUsernameByID = function(uid, callback){
	var sql = "SELECT name FROM admin where id = " + uid;
	client.query(sql, function(err, results){
		callback(results[0]['name']);
	});
};

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
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var queryIdAndName = function(pagination,products,community,callback){
	start = pagination['products']*pagination['range'];
	
	// var presql = "select count(*) as length form community group by id";

	var sql = "select id, name from commodity where id in (select pid from comment) limit "+start+","+pagination['range'];
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
var getLengthOfCommodity = function(pagination,products,community,callback){
	var sql = "select count(*) as length from commodity "
	client.query(sql,function(err,results){
		// console.log("--------sql-------"+results[0]['length']);
		callback(err,results);
	});
}

var queryCommodityWithId = function(id,callback){
	var sql = "select * from commodity where id="+id;
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
	var sql = "DELETE FROM popular where position = '" + info.position + "' AND popid = '" + info.popid + "';";
	client.query(sql, function(err, results){});

	//添加
	var sql = "INSERT INTO popular (popid, position, url, pid, isVisible) values("+ info.popid +"," + info.position + ",'" + info.url + "', " + info.pid + ", " + info.isVisiable + ");"
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

var activitySetPid = function(info, callback){
	var sql = "UPDATE popular SET pid = " + info.setpid_pid + " WHERE position = "+ info.setpid_position +" and popid = " + info.setpid_popid + ";";
	client.query(sql, function(err, results){
		callback(err, results);
	});
};
/**** ****/


/**** 帖子相关 ****/
//查询一个帖子信息
var statusSelectARecord = function(id, callback){
	var sql = "SELECT * FROM community WHERE id="+id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
//帖子数量
var statusAllNumber = function(callback){
	var sql = "SELECT COUNT(*) as count FROM community;"
	client.query(sql, function(err, results){
		callback(results[0]['count']);
	});
}
//添加一条帖子
var statusInsertARecord = function(info, callback){
	var sql = "INSERT INTO community (pid, uid, time, count, description, title, pic, description_title) VALUES ("+ info.pid +", " + info.uid + ", " + info.time + ", " + info.count + ", '" + info.description + "', '" + info.title + "', '" + info.pic + "', '" + info.description_title + "');";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
//修改帖子
var statusModifyARecord = function(info, callback){
	var sql = "UPDATE community SET pid="+info.pid+",uid="+info.uid+",time='"+info.time+"',count="+info.count+",description='"+info.description+"',title='"+info.title+"',pic='"+info.pic+"',description_title='"+info.description_title+"' WHERE id=" + info.id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//数据库分页查找帖子
var statusSelectAllRecord = function(count, callback){
	var start = count.start ? count.start : 0;
	var num = count.num ? count.num : 0;
	var sql = "SELECT * FROM community ORDER BY time desc limit "+start+","+num+";";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//删除帖子
var statusDeleteAStatu = function(id, callback){
	var sql = "DELETE FROM community WHERE id=" + id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

//删除全部帖子
var statusDelstaAllStatus = function(callback){
	var sql = "truncate table community";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var statusQueryIdAndTitle = function(callback){
	var sql = "select id, title from community";
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var queryIdandTitle = function(pagination,products,community,callback){
	start = pagination['community']*pagination['range'];
	
	var sql = "select id, title from community where id in (select cid from comment) limit "+start+","+pagination['range'];
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var getLengthOfCommunity = function(pagination,products,community,callback){
	var sql = "select count(*) as length from community "
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var queryCommunityWithId = function(id,callback){
	var sql = "select * from community where id="+id;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
/*
*评论信息相关操作
*/
//根据评论ID计数
var countByPidFromComment = function(pagination,products,community,callback){
	// console.log("-------"+pid);
	var sql = "select pid, count(*) as c from comment group by pid";
	client.query(sql,function(err,results){	
		
		callback(err,results);
	});
}

//根据帖子ID计数
var countByCidFromComment =function(pagination,products,community,callback){
	var sql = "select cid, count(*) as c from comment group by cid";
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var queryCommentWithProdinfo = function(prodinfo,callback){
	var pid = prodinfo[0]['id'];
	var sql = "select * from comment where pid="+pid;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var  queryCommentWithComunityinfo = function(communityinfo,callback){
	var cid = communityinfo[0]['id'];
	var sql = "select * from comment where cid="+cid;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
/**** ****/


/**** 推送相关 ****/
var notificationAddRecory = function(info, callback){
	var sql = "INSERT INTO notification (pid, pic, title, description, createTime) VALUES ("+ info.pid +", '"+ info.pic +"','"+ info.title +"', '"+ info.description +"', "+ info.createTime +");";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var notificationSelectAll = function(count, callback){
	var sql = "SELECT * FROM notification ORDER by createTime DESC limit "+ count.start +","+ count.num +"";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var notificationAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM notification ORDER BY createTime DESC";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
/**** ****/

exports.connect = connect;
exports.loginConfirm = loginConfirm;
exports.adminSelectUsers = adminSelectUsers;
exports.adminUsernameByID = adminUsernameByID;
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
exports.activitySetPid = activitySetPid;
exports.statusInsertARecord = statusInsertARecord;
exports.statusSelectAllRecord = statusSelectAllRecord;
exports.statusAllNumber = statusAllNumber;
exports.statusDeleteAStatu = statusDeleteAStatu;
exports.statusDelstaAllStatus = statusDelstaAllStatus;
exports.statusSelectARecord = statusSelectARecord;
exports.statusModifyARecord = statusModifyARecord;
exports.statusQueryIdAndTitle = statusQueryIdAndTitle;
exports.queryIdAndName = queryIdAndName;
exports.countByPidFromComment = countByPidFromComment;
exports.countByCidFromComment = countByCidFromComment;
exports.queryIdandTitle = queryIdandTitle;
exports.getLengthOfCommunity = getLengthOfCommunity;
exports.getLengthOfCommodity = getLengthOfCommodity;
exports.notificationAddRecory = notificationAddRecory;
exports.notificationSelectAll = notificationSelectAll;
exports.queryCommodityWithId = queryCommodityWithId;
exports.queryCommentWithProdinfo = queryCommentWithProdinfo;
exports.notificationAllNumbers = notificationAllNumbers;
exports.queryCommunityWithId = queryCommunityWithId;
exports.queryCommentWithComunityinfo = queryCommentWithComunityinfo;
