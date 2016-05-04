var express = require('express');
var router = express.Router();
var sql = require('./sql');

router.get('/',function(req,res,next){

	sql.connect();
	sql.queryAllRecordInNotification(function(err,results){
		if (err) {
			res.send(err.message);
			console.log(err.message);
			return;
		}
		var ret = {"value":results,"status":'success'}
		res.send(ret);
	})
})


module.exports = router;