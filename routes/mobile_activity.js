var express = require('express');
var router = express.Router();
var sql = require('./sql')

router.get('/',function(req,res,next){
	sql.connect();
	sql.queryRecordFromPop(function(err,results){
		if(err){
			res.send(err.message);
			return;
		}
		sql.queryRecordFromPopular(results,function(err,results2){
			if (err) {
				res.send(err.message);
				return;
			}
			// console.log(err);
			// console.log(results2);
			// var arr = {'data':results2};
			res.send(results2);

		})
	})

})

module.exports = router;