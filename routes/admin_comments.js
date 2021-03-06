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
	var pagination = new Array();

	if(req.query.p == undefined && req.query.c == undefined){
		pagination['products'] = 0;
		pagination['community'] = 0;
		pagination['currentPage'] = 0;	
		pagination['status'] = 0;
	}else if(req.query.p != undefined){
		pagination['products'] = req.query.p;
		pagination['community'] = 0;	
		pagination['currentPage'] = pagination['products'];
		pagination['status'] = 0;
	}else{
		pagination['community'] = req.query.c;
		pagination['products'] = 0;
		pagination['currentPage'] = pagination['community'];
		pagination['status'] = 1;
	}

	pagination['range'] = 10;
	


	sql.connect();
	//获取商品id与名称
	sql.queryIdAndName(pagination,products,community,function(err,results){
		if(err){
			res.send(err.message);
		}
		
		for (var p in results){
			products[results[p].id] = new Array();
			products[results[p].id].push(results[p].name);
		}
		//获取products表的长度
		sql.getLengthOfCommodity(pagination,products,community,function(err,results){
			if(err){
				res.send(err.message);
			}

			if( parseInt(results[0]['length']) % pagination['range'] == 0){
				pagination['ppageNum'] = parseInt(results[0]['length']/pagination['range']);
			}else {
				pagination['ppageNum'] = parseInt(results[0]['length']/pagination['range'])+1;
			}
			
			
			//获取商品的评论数
			sql.countByPidFromComment(pagination,products,community,function(err,results2){
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
				sql.queryIdandTitle(pagination,products,community,function(err,results3){
					if(err){
						res.send(err.message);
					}
					for(var q in results3){
						community[results3[q].id] = new Array();
						community[results3[q].id].push(results3[q].title);
					}
					// console.log("----results3----"+results3.length);
					//获取community表长度
					sql.getLengthOfCommunity(pagination,products,community,function(err,results){
						if(err){
							res.send(err.message);
						}
						if( parseInt(results[0]['length']) % pagination['range'] == 0){
							pagination['cpageNum'] = parseInt(results[0]['length']/pagination['range']);
						}else {
							pagination['cpageNum'] = parseInt(results[0]['length']/pagination['range'])+1;
						}
						//获取帖子id对应的评论数
						sql.countByCidFromComment(pagination,products,community,function(err,results4){
							if(err){
								res.send(err.message);
							}
							for(var m in community){
								for (var n in results4){
									if( community[m][0] != null && m == results4[n].cid)
										community[m].push(results4[n]['c']);
								}
							}
							var pageNum = pagination['ppageNum'];

							if(pagination['ppageNum'] < pagination['cpageNum'] ){
								pageNum = pagination['cpageNum']	
							}

							res.render('admin_comments', {admin_name: req.session.username,plist:products,clist:community,pcurrentPage:pagination['products'],ccurrentPage:pagination['community'],ppageNum:pagination['ppageNum'],cpageNum:pagination['cpageNum'],status:pagination['status']});
						})

					});
					
				})
				
				
			});

		})
		
	});
});

router.get('/admin_comments_products',function(req,res,next) {
	// if(!req.session.username){
	// 	res.redirect('/');
	// 	return;
	// }
	var pid = req.query.pid;
	sql.connect();
	sql.queryCommodityWithId(pid,function(err,results){
		if(err){
			res.send(err.message);
		}
		sql.queryCommentWithProdinfo(results,function(err,results2){
			if(err){
				res.send(err.message);
			}
			res.render('admin_comments_products', {admin_name: req.session.username,prodinfo:results,commtinfo:results2});
		});

	});

  	// res.render('admin_comments_products', {admin_name: req.session.username,prodinfo:,commtinfo});
});

router.get('/admin_comments_community',function(req,res,next) {
	// if(!req.session.username){
	// 	res.redirect('/');
	// 	return;
	// }
	var cid = req.query.cid;
	sql.connect();
	sql.queryCommunityWithId(cid,function(err,results){
		if(err){
			res.send(err.message);
		}
		sql.queryCommentWithComunityinfo(results,function(err,results2){
			if(err){
				res.send(err.message);
			}
			// console.log("------"+results2[1]['comment'])
			res.render('admin_comments_community', {admin_name: req.session.username,communityinfo:results,commtinfo:results2});
		});

	});

  	// res.render('admin_comments_community', {admin_name: req.session.username});
});

router.get('/admin_comments_deletepcomm',function(req,res,next) {
	var id = req.query.id;
	var pid = req.query.pid;
	sql.connect();
	sql.deleteCommentFromCommentByid(id,function(err,results){
		if(err){
			res.send(err.message);
		}
		res.redirect('/admin_comments/admin_comments_products?pid='+pid);
	});
	// res.send("success");
	
})

router.get('/admin_comments_deleteccomm',function(req,res,next){
	var id = req.query.id;
	var cid = req.query.cid;
	sql.connect();
	sql.deleteCommentFromCommentByid(id,function(err,results){
		if(err){
			res.send(err.message);
		}
		res.redirect('/admin_comments/admin_comments_community?cid='+cid);
	});
	// res.send("success");
})

module.exports = router;
