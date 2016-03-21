var express = require('express');
var router = express.Router();
var sql = require('./sql');
// var step = require('Step');
var async = require('async');

router.get('/', function(req, res, next) {
	//没有登录不能进入
	// if(!req.session.username){
	// 	res.redirect('/');
	// 	return;
	// }
	
	
	var products = new Array();
	var community = new Array();

	sql.connect();
	//获取商品id与名称
	sql.queryIdAndName(products,community,function(err,results){
		if(err){
			res.send(err.message);
		}
		for (var p in results){
			products[results[p].id] = new Array();
			products[results[p].id].push(results[p].name);
		}
		//获取商品的评论数
		sql.countByPidFromComment(products,community,function(err,results2){
			if(err){
				res.send(err.message);
			}
			
			for(var i in products){
				for(var j in results2){
					
					if( products[i][0] != null && i == results2[j].pid){
						// console.log("=========="+results2[j]['c']);
						products[i].push(results2[j]['c']);
					}
				}
			}
			//获取帖子的id与标题
			sql.queryIdandTitle(products,community,function(err,results3){
				if(err){
					res.send(err.message);
				}
				for(var q in results3){
					community[results3[q].id] = new Array();
					community[results3[q].id].push(results3[q].title);
				}
				//获取帖子id对应的评论数
				sql.countByCidFromComment(products,community,function(err,results4){
					if(err){
						res.send(err.message);
					}
					for(var m in community){
						for (var n in results4){
							if( community[m][0] != null && m == results4[n].cid)
								community[m].push(results4[n]['c']);
						}
					}

					res.render('admin_comments', {admin_name: req.session.username,plist:products,clist:community});
				})
			})
		});
	});
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
