var express = require('express');
var router = express.Router();
var sql = require('./sql');
/* GET home page. */
router.get('/', function(req, res, next) {
	var pt = new Array();
	pt.property = "name,lastLoginTime,canLogin";
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
		// res.send(results[0]);
		res.render('admin_admin',{data:results});
		// res.render('admin_admin');

	});
});

module.exports = router;
