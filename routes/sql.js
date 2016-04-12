var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path=require('path');
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

//管理员数量
var adminAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM admin";
	client.query(sql, function(err, results){
		callback(results[0]['count']);
	});
}
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
var commodityAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM commodity";
	client.query(sql, function(err, results){
		callback(results[0]['count']);
	});
}
var commoditySelectAll = function(callback){
	var sql = "SELECT * FROM commodity";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
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

var modifyRecordFromCommodity =function(pvt,callback){
	var property = pvt['property'].split(',');
	var value = pvt['value'].split(',');

	var table = pvt['table'];
	var id = value[0];

	var string = "" ;
	for(var i=1;i<property.length;i++){
		if(value[i] == "'"+"'"){
			continue;
		}
		if(string == "") {
			string = string + property[i] + "=" + value[i];
		}
		string = string + "," + property[i] + "=" + value[i];
		
	}
	var sql = "update commodity set "+ string +" where id="+id;
	console.log("||||||||||"+sql);
	client.query(sql,function(err,results){
		callback(err,results);
	}) 
}

var searchFromCommodity = function(value,callback){
	var sql;
	if(!isNaN(value)){
		//value is a number
		sql = "select * from commodity where id="+value+
										" or cid="+value+
										" or price="+value+
										" or sale="+value+
										" or storage="+value+
										" or count="+value;
	}else{
		//value is not a number
		sql = "select * from commodity where name like '%"+value+"%'"+
										" or region like '%"+value+"%'"+
										" or factory like '%"+value+"%'";
	}
	if(value==""){
		sql = "select * from commodity where id=0";
	}
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
	console.log(sql);
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
var commentAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM comment";
	client.query(sql, function(err, results){
		callback(results[0]['count']);
	});
}
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

var deleteCommentFromCommentByid = function(id,callback){
	var sql = "delete from comment where id="+id;
	client.query(sql,function(err,results){
		callback(err,results);
	})
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

/**** 用户相关 ****/
var userSelectAllNoPage = function(callback){
	var sql = "SELECT * FROM user ORDER BY registerTime DESC";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var userSelectAll = function(count, callback){
	var sql = "SELECT * FROM user ORDER BY registerTime DESC limit "+count.start+","+count.num+"";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var userAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM user";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var userDeletaARecord = function(id, callback){
	var sql = "DELETE FROM user WHERE id="+id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var userSetLogin = function(id, callback){
	var sql = "UPDATE user SET canLogin=ABS(canLogin - 1) WHERE id="+id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var userSearchResult = function(username, callback){
	var sql = "SELECT * FROM user WHERE name like '%"+username+"%'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var insertTelAndPasswordIntoUser =function(tel,password,callback){
	var validation = Math.random();
	var registerTime = new Date().getTime();
	var sql = "insert into user (tel,password,registerTime,validation) values "+"("+"'"+tel+"'"+","+
																					"'"+password+"'"+","+
																					"'"+registerTime+"'"+","+
																					"'"+validation+"'"+")";
	
	client.query(sql,function(err,results){
		results['validation'] = validation;
		callback(err,results);
	});
}

var queryUserWithId = function(id,callback){
	var sql = "select name,icon,sex from user where id="+id;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var modifyRecordInUser = function(ipvt,callback){
	id = ipvt.id;
	values = ipvt.value.split(',');
	setting = " name="+values[0]+", sex="+values[1]+", icon="+values[2];
	var sql = "update user set "+setting+" where id="+id;
	console.log("sql:"+sql);
	client.query(sql,function(err,results){
		callback(err,results);
	})
}
/**** ****/

/**** 系统设置相关 ****/
var sysSettingLoginStatus = function(callback){
	var sql = "SELECT setValue FROM sysSetting WHERE setName='loginStatus'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var sysSettingChangeLoginStatus = function(callback){
	var sql = "UPDATE sysSetting SET setValue=ABS(setValue - 1) WHERE setName='loginStatus'";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
/**** ****/

/**** 订单相关 ****/
var ordersSelectAll = function(count, callback){
	var sql = "SELECT * FROM orders ORDER BY time desc limit "+count.start+","+count.num+"";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var ordersAllNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM orders";
	client.query(sql, function(err, results){
		callback(err, results[0]['count']);
	});
}

var ordersAllDoNumbers = function(callback){
	var sql = "SELECT COUNT(*) AS count FROM orders WHERE sid=(SELECT id FROM orderstatus WHERE status='待发货')";
	client.query(sql, function(err, results){
		callback(err, results[0]['count']);
	});
}
var ordersSelectAllDo = function(count, callback){
	var sql = "SELECT * FROM orders WHERE sid=(SELECT id FROM orderstatus WHERE status='待发货') ORDER BY time DESC LIMIT "+count.start+","+count.num+"";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var queryFromOrdersByUid = function(uid,callback){
	var sql = "select * from orders where uid="+uid;
	client.query(sql,function(err,results){
		callback(err,results);
	})
}

/**** ****/

/**** 订单状态相关 ****/
//订单状态是否是待发货
var ordersIsWaitToSend = function(id, callback){
	var sql = "SELECT * FROM orders WHERE id="+id+" AND sid=(SELECT id FROM orderstatus WHERE status='待发货')";
	client.query(sql, function(err, results){
		callback(err, results.length);
	})
}

//待发货 -> 待收货 
var orderStatusChangeStatusToSend = function(id, callback){
	var sql = "UPDATE orders SET sid=(SELECT id FROM orderstatus WHERE status='待收货') WHERE id=" + id;
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
var orderStatusSelectAll = function(callback){
	var sql = "SELECT * FROM orderstatus";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}
/**** ****/

/**** 收货地址相关****/
var addressSelectAll = function(callback){
	var sql = "SELECT * FROM address";
	client.query(sql, function(err, results){
		callback(err, results);
	});
}

var queryAddressWithUid = function(uid,callback){
	var sql = "select * from address where uid="+uid;
	client.query(sql,function(err,results){
		callback(err,results);
	})
}
/**** ****/

var ConvertAidToAddress = function(orders,callback){
	var condition = "";
	for(var key in orders){
		if(orders[key].length == 0){
			continue;
		}
		if (condition == "") {
			condition += "id=" + orders[key]['aid'];
		}
		condition += " or id=" + orders[key]['aid'];
		 
	}
	var sql = "select * from address where "+condition;
	client.query(sql,function(err,results){
		for(var key in orders){
			for(var i in results){
				if(orders[key]['aid'] == results[i]['id']){
					orders[key]['address'] = results[i];
				}
			}
		}
		callback(err,orders);
	})
}
var ConvertPidToProduct = function(orders,callback){
	var condition = "";
	for(var key in orders){
		if(orders[key].length == 0){
			continue;
		}
		if (condition == "") {
			condition += "id=" + orders[key]['pid'];
		}
		condition += " or id=" + orders[key]['pid'];
		 
	}
	var sql = "select * from commodity where "+condition;
	// console.log("-------"+sql)
	client.query(sql,function(err,results){
		for(var key in orders){
			for(var i in results){
				if(orders[key]['pid'] == results[i]['id']){
					orders[key]['product'] = results[i];
				}
			}
		}
		callback(err,orders);
	})

}
/******/
/**/
var queryRecordFromPop = function(callback){
	var sql = "select * from pop";
	client.query(sql,function(err,results){
		// console.log("pop length="+results.length)
		callback(err,results);
	})
}

var queryRecordFromPopular = function(pop,callback){
	var sql = "select * from popular";
	
	client.query(sql,function(err,results){
		var activity = new Array();
		
		// var last;
		for(var key in pop){
			// index = pop[key]['pop'];
			
	
			// activity[key] = new Array();
			array = new Array();
			for(var i=0;i<results.length;i++){
				if(results[i]['popid'] == pop[key]['id']){
					array.push(results[i])
					// activity[key].push(results[i]);
				}
			}
			
			activity[key] = {"name":pop[key]['pop'],"data":array};
			// console.log(key);
			// last=key;
			// activity[pop[key]['pop']] = array;
			// console.log(activity)
			
			
		}
		
		// console.log(activity.length);
		callback(err,activity);
	});
}
/**/
var queryUserWithTel = function(tel,password,callback){
	var sql = "select * from user where tel="+"'"+tel+"'";
	client.query(sql,function(err,results){
		 callback(err,results);
	});
}

var updateUserByTelWithPassword = function(tel,password,callback){
	var sql = "update user set password="+"'"+password+"'"+"where tel="+"'"+tel+"'";
	client.query(sql,function(err,results){
		 callback(err,results);
	});
}

var updateUserByTelWithLastLoginTime = function(tel,password,callback){
	var lastLoginTime = new Date().getTime();
	var sql = "update user set lastLoginTime="+"'"+lastLoginTime+"'"+"where tel="+"'"+tel+"'";
	// console.log(sql);
	client.query(sql,function(err,results){
		callback(err,results);
	})
}

var queryUserWithTelAndPassword = function(tel,password,callback){
	var sql = "select * from user where tel="+"'"+tel+"'"+" and password="+"'"+password+"'";
	// console.log(sql);
	client.query(sql,function(err,results){
		callback(err,results);
	});
}

var queryUserWithIdAndValidation = function(req,id,validation,callback){
	var sql = "select * from user where id="+"'"+id+"'"+" and validation="+"'"+validation+"'";
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
/**/
var deleteFromAddressById = function(id,callback){
	var sql = "delete from address where id="+id;
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
/**/
var queryCommunityWithRange = function(range,callback){
	var id = range['start'];
	var range = range['length'];

	var sql = "select * from community where id>="+id+" limit "+range;
	// console.log(sql);
	client.query(sql,function(err,results){
		callback(err,results);
	})
}

var queryCommentWithCommunityinfo =function(comminfo,callback){
	var commdetail = comminfo[0];
	var sql = "select * from comment where id="+commdetail['cid'];
	client.query(sql,function(err,results){
		commdetail['comment'] = results;
		callback(err,commdetail);
	});
}

var ConvertUidToUser = function(detail,callback){
	var comment = detail['comment'];

	var conditon = "";
	for(var key in comment){
		if(conditon == ""){
			conditon += " id="+comment[key]['uid'];
		}else{
			conditon += "or id="+comment[key]['uid'];
		}

	}
	var sql;
	if(conditon == ""){
		sql = "select * from user where id=-1";
	}else{
		sql = "select * from user where "+conditon;
	}

	
	// console.log(sql);
	client.query(sql,function(err,results){
		for(var i in comment){
			for(var j in results){
				if(comment[i]['uid'] == results[j]['id']){
					detail['comment'][i]['user'] = results[j]; 
				}
			}
		}
		callback(err,detail);
	}); 
}

var insertIntoCommentWithContent = function(content,callback){
	var sql = "insert into comment (uid,cid,comment) values "+"("+content.uid+
																  content.cid+
																  "'"+content.comment+"'"+")";
	client.query(sql,function(err,results){
		callback(err,results);
	})
}

var increCountInCommodityById = function(id,count,callback){
	var sql = "update commodity set count="+count+" where id="+id;
	client.query(sql,function(err,require){
		callback(err,results);
	})
}
var queryUserWithFieldsAndFiles = function(fields, files, callback){
	var id = fields.id;
	var validation = fields.validation;
	var sql = "select * from user where id="+"'"+id+"'"+" and validation="+"'"+validation+"'";
	client.query(sql,function(err,results){
		callback(err,results);
	});
}
/**/

exports.connect = connect;
exports.loginConfirm = loginConfirm;
exports.adminAllNumbers = adminAllNumbers;
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
exports.commoditySelectAll = commoditySelectAll;
exports.commodityAllNumbers = commodityAllNumbers;
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
exports.commentAllNumbers = commentAllNumbers;
exports.getLengthOfCommunity = getLengthOfCommunity;
exports.getLengthOfCommodity = getLengthOfCommodity;
exports.notificationAddRecory = notificationAddRecory;
exports.notificationSelectAll = notificationSelectAll;
exports.queryCommodityWithId = queryCommodityWithId;
exports.queryCommentWithProdinfo = queryCommentWithProdinfo;
exports.notificationAllNumbers = notificationAllNumbers;
exports.queryCommunityWithId = queryCommunityWithId;
exports.queryCommentWithComunityinfo = queryCommentWithComunityinfo;
exports.userSelectAll = userSelectAll;
exports.userSelectAllNoPage = userSelectAllNoPage;
exports.userAllNumbers = userAllNumbers;
exports.userDeletaARecord = userDeletaARecord;
exports.userSetLogin = userSetLogin;
exports.userSearchResult = userSearchResult;
exports.sysSettingLoginStatus = sysSettingLoginStatus;
exports.sysSettingChangeLoginStatus = sysSettingChangeLoginStatus;
exports.deleteCommentFromCommentByid = deleteCommentFromCommentByid;
exports.modifyRecordFromCommodity = modifyRecordFromCommodity;

exports.ordersSelectAll = ordersSelectAll; 
exports.ordersAllDoNumbers = ordersAllDoNumbers;
exports.ordersAllNumbers = ordersAllNumbers;
exports.ordersSelectAllDo = ordersSelectAllDo;


exports.ordersIsWaitToSend = ordersIsWaitToSend;
exports.orderStatusSelectAll = orderStatusSelectAll;
exports.orderStatusChangeStatusToSend = orderStatusChangeStatusToSend;

exports.searchFromCommodity = searchFromCommodity;

exports.addressSelectAll = addressSelectAll;

exports.insertTelAndPasswordIntoUser = insertTelAndPasswordIntoUser;
exports.queryUserWithId = queryUserWithId;
exports.queryAddressWithUid = queryAddressWithUid;
exports.queryFromOrdersByUid = queryFromOrdersByUid;
exports.ConvertAidToAddress = ConvertAidToAddress;
exports.ConvertPidToProduct = ConvertPidToProduct;
exports.modifyRecordInUser = modifyRecordInUser;
exports.queryRecordFromPop = queryRecordFromPop;
exports.queryRecordFromPopular = queryRecordFromPopular;
exports.queryUserWithTel = queryUserWithTel;
exports.updateUserByTelWithPassword = updateUserByTelWithPassword;
exports.updateUserByTelWithLastLoginTime = updateUserByTelWithLastLoginTime;
exports.queryUserWithTelAndPassword = queryUserWithTelAndPassword;
exports.queryUserWithIdAndValidation = queryUserWithIdAndValidation;
exports.queryUserWithFieldsAndFiles = queryUserWithFieldsAndFiles;
exports.deleteFromAddressById = deleteFromAddressById;

exports.queryCommunityWithRange = queryCommunityWithRange;
exports.queryCommentWithCommunityinfo = queryCommentWithCommunityinfo;
exports.ConvertUidToUser = ConvertUidToUser;
exports.insertIntoCommentWithContent = insertIntoCommentWithContent;
exports.increCountInCommodityById = increCountInCommodityById;

