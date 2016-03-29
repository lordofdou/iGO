var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}

  	res.render('admin_orders', {admin_name: req.session.username});
});

module.exports = router;
