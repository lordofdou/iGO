var express = require('express');
var router = express.Router();
var sql = require('./sql');

var PER_PAGE = 20;

/* GET home page. */
router.get('/', function(req, res, next) {
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}

	/**** 分页 *****/
	var currentPage = 1;
	if(req.query.page){
		currentPage = (req.query.page >= 1) ? req.query.page : 1;
	}

	//创建count
	var count = new Array();
	count.start = (currentPage - 1) * PER_PAGE;
	count.num = PER_PAGE;
	/**** 分页 *****/

	sql.ordersAllDoNumbers(function(err, recordCount){
		/**** 分页 *****/
		
		var pagesNum = parseInt(parseInt(recordCount) / PER_PAGE);
		if(recordCount != 0){
			if(recordCount%PER_PAGE){
				pagesNum = pagesNum + 1;
			}
			if(currentPage > pagesNum){
				count.start = (pagesNum - 1) * PER_PAGE;
				currentPage = pagesNum;
			}
		}

		/**** 分页 *****/

		//获取待处理订单记录
		sql.ordersSelectAllDo(count, function(err, results){
			if (err) {
		      res.render('fail', {title : "获取订单数据失败", message: "订单数据库出错"});
		      return;		
		    } 

		    sql.userSelectAllNoPage(function(err, allUsers){

		    	for (var i = 0; i < results.length; i++) {
		    		for(var userN in allUsers){
		    			var user = allUsers[userN];
		    			if(parseInt(results[i]['uid']) == parseInt(user['id'])){
		    				results[i]['username'] = user['name'];
		    				break;
		    			}
		    		}
		    	}

		    	sql.commoditySelectAll(function(err, commodiy){

		    		for (var i = 0; i < results.length; i++) {
		    			results[i]['timeText'] = new Date(parseInt(results[i]['time'])).toLocaleString();
			    		for(var comN in commodiy){
			    			var com = commodiy[comN];
			    			if(results[i]['pid'] == com['id']){
			    				results[i]['pName'] = com['name'];
			    				break;
			    			}
			    		}
			    	}

			    	sql.addressSelectAll(function(err, address){
			    		for (var i = 0; i < results.length; i++) {
			    			for(var addresN in address){
			    				var addres = address[addresN];
			    				if(results[i]['aid'] == addres['id']){
			    					results[i]['address'] = addres;
			    					break;
			    				}
			    			}
			    		}

			    		sql.addressSelectAll(function(err, address){
				    		for (var i = 0; i < results.length; i++) {
				    			for(var addresN in address){
				    				var addres = address[addresN];
				    				if(results[i]['aid'] == addres['id']){
				    					results[i]['address'] = addres;
				    					break;
				    				}
				    			}
				    		}
							res.render('admin_orders', {admin_name: req.session.username, orders: results, pagesNum: pagesNum, currentPage: currentPage});
			    		});

			    		// res.render('admin_orders', {admin_name: req.session.username, orders: results, pagesNum: pagesNum, currentPage: currentPage});
			    	});

		    	});
		    });
		});
	});
});

router.get('/all', function(req, res, next) {
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}

  	/**** 分页 *****/
	var currentPage = 1;
	if(req.query.page){
		currentPage = (req.query.page >= 1) ? req.query.page : 1;
	}

	//创建count
	var count = new Array();
	count.start = (currentPage - 1) * PER_PAGE;
	count.num = PER_PAGE;
	/**** 分页 *****/

	sql.ordersAllNumbers(function(err, recordCount){
		/**** 分页 *****/
		
		var pagesNum = parseInt(parseInt(recordCount) / PER_PAGE);
		if(recordCount != 0){
			if(recordCount%PER_PAGE){
				pagesNum = pagesNum + 1;
			}
			if(currentPage > pagesNum){
				count.start = (pagesNum - 1) * PER_PAGE;
				currentPage = pagesNum;
			}
		}

		/**** 分页 *****/

		//获取待处理订单记录
		sql.ordersSelectAll(count, function(err, results){
			if (err) {
		      res.render('fail', {title : "获取订单数据失败", message: "订单数据库出错"});
		      return;		
		    } 

		    sql.userSelectAllNoPage(function(err, allUsers){

		    	for (var i = 0; i < results.length; i++) {
		    		for(var userN in allUsers){
		    			var user = allUsers[userN];
		    			if(parseInt(results[i]['uid']) == parseInt(user['id'])){
		    				results[i]['username'] = user['name'];
		    				break;
		    			}
		    		}
		    	}

		    	sql.commoditySelectAll(function(err, commodiy){

		    		for (var i = 0; i < results.length; i++) {
		    			results[i]['timeText'] = new Date(parseInt(results[i]['time'])).toLocaleString();
			    		for(var comN in commodiy){
			    			var com = commodiy[comN];
			    			if(results[i]['pid'] == com['id']){
			    				results[i]['pName'] = com['name'];
			    				break;
			    			}
			    		}
			    	}

			    	sql.orderStatusSelectAll(function(err, statuNames){
						for (var i = 0; i < results.length; i++) {
							for(var statusN in statuNames){
								var statusName = statuNames[statusN];
								if(statusName['id'] == results[i]['sid']){
									var text = statusName['status'];
									if(text == "待发货"){
										text = "<span style='color:#FC2726'>" + text + "</span>";
									}
									results[i]['statusText'] = text;
								}
							}	
						}


						sql.addressSelectAll(function(err, address){
				    		for (var i = 0; i < results.length; i++) {
				    			for(var addresN in address){
				    				var addres = address[addresN];
				    				if(results[i]['aid'] == addres['id']){
				    					results[i]['address'] = addres;
				    					break;
				    				}else{
				    					results[i]['address'] = {'id':'0', 'address':'未匹配到', 'uid':'0', 'tel':'未匹配到', 'region':'未匹配到', 'name':'未匹配到'};
				    				}
				    			}
				    		}
							res.render('admin_orders_all', {admin_name: req.session.username, orders: results, pagesNum: pagesNum, currentPage: currentPage});
			    		});
			    	});
		    	});
		    });
		});
	});
});

router.get('/send', function(req, res, next){
	//没有登录进入不了此界面
	if(!req.session.username){
		res.redirect('/');
	}

	var idNumber = req.query.id;
	if(!idNumber){
		res.redirect('/admin_orders');
		return;
	}
	
	//是否是待发货状态？
	sql.ordersIsWaitToSend(idNumber, function(err, isWaitToSend){

		if(!isWaitToSend){
			res.redirect('/admin_orders');
		}

		sql.orderStatusChangeStatusToSend(idNumber, function(err, results){
			res.redirect('/admin_orders?page=' + req.query.page);
		});
	});
	
});

module.exports = router;
