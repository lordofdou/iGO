var express = require('express');
var router = express.Router();
var sql = require('./sql')
router.get('/',function(req,res,next) {
	var pt = new Array();
	pt.property = "*";
	pt.table = "category";

	sql.connect();
	sql.selectPropertyfromTable(pt,function(err,results) {
		if(err){
			res.send(err.message);
			return;
		}
		var array = new Array();
		var big = 0;
		for (var i=0;i<results.length;i++ ){
			if(results[i].superid > big) {
				big = results[i].superid;
				array[results[i].superid] = new Array();
				array[results[i].superid].push(results[i]);

			}else{
				array[results[i].superid].push(results[i]);
			}
		}
		// console.log("####");
		// console.log(array);

		res.render('admin_products',{array:array,admin_name : req.session.username});
	});

});
	

module.exports = router;