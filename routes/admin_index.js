var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//已经登陆了不能进入登录界面
	if(req.session.username){
		res.redirect('/admin_general');
		return;
	}
  	res.render('admin_index');
});

module.exports = router;
