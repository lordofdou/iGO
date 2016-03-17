var express = require('express');
var router = express.Router();
var sql = require('./sql');

router.get('/', function(req, res, next) {
	//没有登录不能进入
	// if(!req.session.username){
	// 	res.redirect('/');
	// 	return;
	// }
	//商品评论信息
	var products = new Array();
	//帖子评论信息
	var community = new Array();

	var index ;
	sql.connect();

	sql.queryIdAndName(function(err,results){
		// console.log("#######"+results[0].name);
		if(err){
			res.send(err.message);
			return;
		}
		for(var key in results){

			index = results[key].id;
			products[index] = new Array();
			products[index].push(results[key].name);
			sql.countByPidFromComment(key,function(err,results){
				console.log("#######"+results[0]['count(*)'])
				products[index].push(results[0]['count(*)']);
			});
			console.log("$$$$$$"+products);

		}
	});
	// console.log("%%%%%%"+products);

	// sql.countByPidFromComment(function(err,results){
	// 	if (err) {
	// 		res.send(err.message);
	// 		return;
	// 	};
	// 	for(var key in results){
	// 		community[key] = new Array();
	// 		community[key].push(results[key].title);
	// 		sql.countByCidFromComment(key,function(err,results){
	// 			community[key].push(results[0]['count(*)']);
	// 		});
	// 	}
	// });
	

  	res.render('admin_comments', {admin_name: req.session.username,plist:products,clist:community});
});

router.get('/admin_comments_products',function(req,res,next) {
	if(!req.session.username){
		res.redirect('/');
		return;
	}


  	res.render('admin_comments_products', {admin_name: req.session.username});
});

router.get('/admin_comments_community',function(req,res,next) {
	if(!req.session.username){
		res.redirect('/');
		return;
	}


  	res.render('admin_comments_community', {admin_name: req.session.username});
});



module.exports = router;
