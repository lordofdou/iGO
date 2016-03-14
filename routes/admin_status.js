var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	//没有登录不能进入
	if(!req.session.username){
		res.redirect('/');
		return;
	}

  	res.render('admin_status', {admin_name: req.session.username});
});

module.exports = router;
