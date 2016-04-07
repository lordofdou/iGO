var express = require('express');
var router = express.Router();
var sql = require('./sql')
var formidable = require('formidable');
var fs = require('fs');
var path=require('path');
var	StringDecoder = require('string_decoder').StringDecoder;
var	EventEmitter = require('events').EventEmitter;
var	util=require('util');
//get individual profile
//receive:id
//send:
/*
json
{
    'name':'昵称'
    'icon':'头像'
    'sex':'性别'
}
sex:
- 0:女
- 1:男
*/
router.get('/',function(req,res,next){
	if(req.query.id == undefined){

		res.render('mobile_test');
	}else{
		var id = req.query.id;  

		sql.connect();
		sql.queryUserWithId(id,function(err,results){
			if(err){
				res.send(err.message);
				return ;
			}
			 
			// res.send(results[0]['icon']);
			res.send(results);
		});
	}	
})

router.get('/login',function(req,res,next){
	var tel = req.query.tel;
	var password = req.query.password;
	// console.log("tel:"+tel+"password:"+password);
	sql.connect();
	sql.queryUserWithTelAndPassword(tel,password,function(err,results){
		if(err){
			res.send(err.message);
			return ;
		}
		if(results.length == 0){
			res.send("user does not exist");
		}else{
			sql.updateUserByTelWithLastLoginTime(tel,password,function(err,results3){
				if(err){
					res.send(err.message);
					return;
				}
				sql.queryUserWithTel(tel,password,function(err,results){
					if(err){
						res.send(err.message);
						return;
					}
					var ret = {"id":results[0]['id'],"validation":results[0]['validation']};
					res.send(ret);

				});

			})
		}
		
	});
	// sql.queryUserWithTel(tel,password,function(err,results){
	// 	if(err){
	// 		res.send(err.message);
	// 		return;
	// 	}
	// 	if(results.length){
			// sql.updateUserByTelWithLastLoginTime(tel,function(err,results3){
			// 	if(err){
			// 		res.send(err.message);
			// 		return;
			// 	}
			// })
			// var ret = {"id":results[0]['id'],"validation":results[0]['validation']};
			// res.send(ret);
	// 	}else{
	// 		res.send("user does not exist");
	// 	}
	// });

})
//register
//receive:username,password(MD5ed);
//send:id
router.post('/register',function(req,res,next){
	// console.log("---------"+req.body);
	var tel = req.body.tel;
	var password = req.body.password;
	sql.connect();
	sql.queryUserWithTel(tel,password,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		if(results.length){
			res.send("user has existed")
		}else{
			sql.insertTelAndPasswordIntoUser(tel,password,function(err,results){
				if(err){
					res.send(err.message);
					return;
				}
				sql.queryUserWithTel(tel,password,function(err,results2){
					if(err){
						res.send(err.message);
						return;
					}
					var ret = {"id":results2[0]['id'],"validation":results2[0]['validation']};
					res.send(ret);
				});
				// res.send('success');
				// res.send(results);
			});
		}
	});
	
});

router.post('/password_modify',function(req,res,next){

	var tel = req.body.tel;
	var password = req.body.password;

	sql.connect();
	sql.queryUserWithTel(tel,password,function(err,results){
		if(err){
			res.send(err.message);
		}
		// console.log(results.length);
		if(results.length == 0){
			res.send("user does not register")
		}else{

			sql.updateUserByTelWithPassword(tel,password,function(err,results){
				if(err){
					res.send(err.message);
					return;
				}
				res.send("success");
			});
		}

	});

});
//modify individual profile
//receive:
/*
json
{
    'id':'用户标识':1
    'name':'昵称':0
    'icon':'头像':0
    'sex':'性别':0
}
*/
//####################################
router.post("/modify",function(req,res,next){
	var AVATAR_UPLOAD_FOLDER = '/userUpload/';
	
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
		var sex = fields.sex;
		var validation = fields.validation;

		

		//图片存储与地址存储
		var picString;
		
		var picArray = new Array();
		

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

		
		

		var ipvt = new Array();
		ipvt.id = id;
		ipvt.property = "name,sex,icon";
		// "'"+ +"'"+       ","+
		ipvt.value = "'"+name+"'"+","+
					sex+","+
					"'"+picArray[0]+"'";
		ipvt.table = "user"

		sql.connect();
		sql.modifyRecordInUser(ipvt,function(err,results){
			if(err){
				res.send(err.message);
				return;
			}
			res.send("success");
		});
		// insertRecordintoTable
		
    });
});

//get address list
//receive:id
/*
send
json
[
    {
        'id':'地址标识'
        'region':'所在区域'
        'address':'详细地址'
        'uid':'所属用户'
        'tel':'联系方式'
        'name':'收货人姓名'
    },
    ...
]
*/
router.get('/addressList',function(req,res,next){
	var uid = req.query.uid;
	sql.connect();
	sql.queryAddressWithUid(uid,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		res.send("success");
	});
	// res.send('addressList');
})


//append an address to addresss list
//receive:
/*
json
{
    'region':'所在区域':1
    'address':'详细地址':1
    'uid':'所属用户':1
    'tel':'联系方式':1
    'name':'收货人姓名':1
}
*/
router.post('/addressList_add',function(req,res,next){
	id = req.body.id;
	address = req.body.address;
	uid = req.body.uid;
	tel = req.body.tel;
	region = req.body.region;
	name = req.body.name;

	var pvt = new Array();
	pvt['property'] = "address,uid,tel,region,name ";
	pvt['value'] = "'"+address+"'"+","+
					uid+","+
					"'"+tel+"'"+","+
					"'"+region+"'"+","+
					"'"+name+"'";
	pvt['table'] = "address";
	sql.connect();
	sql.insertRecordintoTable(pvt,function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		res.send("success");
	});


})

//

module.exports = router;