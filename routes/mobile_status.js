var express = require('express');
var router = express.Router();
var sql = require('./sql');
//get community list
router.get('/',function(req,res,next){
	var id;
	var LENGTH = 5
	if(req.query.id == undefined){
		id = 0
	}else{
		id = req.query.id;
	}
	var range = new Array();
	range['start'] = id;
	range['length'] = LENGTH;
	sql.connect();
	sql.queryCommunityWithRange(range,function(err,result){
		if(err){
			res.send(err.message);
			return;
		}
		for(var key in result){
			string = result[key]['pic'];
			result[key]['pic'] = string.split('|');

			string = result[key]['description'];
			result[key]['description'] = string.split('|');

			string = result[key]['description_title'];
			result[key]['description_title'] = string.split('|');

			// result[key].splice('pid',1);
			// result[key].splice('uid',1);
		}
		ret ={"value":result,"status":"success"};
		res.send(ret);

	});

})

//get detailed community
router.get('/detail',function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommunityWithId(id,function(err,result){
		if(err){
			res.send(err.message);
			console.log("id:"+err.message);
			return;
		}
		result.push(null);
		sql.ConvertPidToProduct(result,function(err,results){
			if(err){
				res.send(err.message);
				console.log("p2p:"+err.message);
				return;
			}
			for(var key in results){
				if(results[key] == null){
					continue;
				}
				if(results[key].length == 0){
					continue;
				}
				string = results[key]['pic'];
				results[key]['pic'] = string.split('|');

				string = results[key]['description'];
				results[key]['description'] = string.split('|');

				string = results[key]['description_title'];
				results[key]['description_title'] = string.split('|');
				

				// result[key].splice('pid',1);
				// result[key].splice('uid',1);
			}
			sql.queryCommentWithCommunityinfo(results,function(err,result2){
				if(err){
					res.send(err.message);
					console.log("cvc:"+err.message);
					return;
				}
				sql.ConvertUidToUser(result2,function(err,result3){
					if(err){
						res.send(err.message);
						console.log("u2u:"+err.message);
						return;
					}
					// result3.splice('pid',1);
					// result3.splice('uid',1);
					res.send(result3);
				});
			});
		});
	})

})

//get a new comment
router.post('/comment',function(req,res,next){
	var content = new Array();
	content.uid = req.body.uid;
	content.cid = req.body.cid;
	content.comment = req.body.comment;
	sql.connect();
	sql.insertIntoCommentWithContent(content,function(err,result){
		if (err) {
			res.send(err.message);
			return;
		}
		res.send("success");
	});

})
module.exports = router;