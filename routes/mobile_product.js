var express = require('express');
var router = express.Router();
var sql = require('./sql')

router.get('/',function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommodityWithId(id,function(err,result){
		if(err){
			res.send(err.message);
			return;
		}
		key=0
		string = result[key]['pic'];
		result[key]['pic'] = string.split('|');

		string = result[key]['description'];
		result[key]['description'] = string.split('|');

		string = result[key]['description_title'];
		result[key]['description_title'] = string.split('|');
		result.push(null);
		sql.queryCommentWithProdinfo(result,function(err,result2){
			if(err){
				res.send(err.message);
				return;
			}
			result[0]['comment'] = result2;
			sql.ConvertUidToUser(result[0],function(err,result3){
				if(err){
					res.send(err.message);
					return;
				}
				result3.splice('pid',1);
				result3.splice('uid',1);
				res.send(result3);
			});

		})
	
	})

})

router.get('/fav',function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommodityWithId(id,function(err,result){
		if (err) {
			res.send(err.message)
			return;
		}
		count = result[0]['count'];
		count += 1;
		sql.increCountInCommodityById(id,count,function(err,result){
			if (err) {
				res.send(err.message)
				return;
			}
			res.send('success');
		})
	})
})

module.exports = router;