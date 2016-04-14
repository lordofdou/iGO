var express = require('express');
var router = express.Router();
var sql = require('./sql')

router.get('/',function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommodityWithId(id,function(err,result){
		if(err){
			res.send(err.message);
			return;
		}
		if (result.length == 0) {
			res.send(result);
		}else{
			key=0;
			string = result[key]['pic'];
			result[key]['pic'] = string.split('|');

			string = result[key]['description'];
			result[key]['description'] = string.split('|');

			// string = result[key]['description_title'];
			// result[key]['description_title'] = string.split('|');
			result.push(null);
			sql.queryCommentWithProdinfo(result,function(err,result2){
				if(err){
					res.send(err.message);
					return;
				}
				result[0]['comment'] = result2;
				sql.ConvertUidToUser(result[0],function(err,result3){
					if(err){
						res.send(err.message);
						return;
					}
					
					// result3.splice('pid',1);
					// result3.splice('uid',1);
					res.send(result3);
				});

			})
		}
		
	
	})

})

router.get('/category_list',function(req,res,next){
	var category = req.query.category;
	sql.connect();
	sql.queryFromCategoryByCategory(category,function(err,results){
		if (err) {
			res.send(err.message);
			console.log(err.message);
		}
		if(results.length == undefined || results.length == 0){
			var ret = {"value":"","status":'success'}
			res.send(ret);
		}else{
			var cid =  results[0]['id'];
			sql.queryCommodityWithCid(cid,function(err,result2){
				if (err) {
					res.send(err.message)
					console.log(err.message);
					return;
				}
				for(var key in result2){
					// key=0;
					string = result2[key]['pic'];
					result2[key]['pic'] = string.split('|');

					string = result2[key]['description'];
					result2[key]['description'] = string.split('|');
				}
				
				var ret = {"value":result2,"status":'success'}
				res.send(ret);
			});
		}
		
	})
})

router.get('/fav',function(req,res,next){
	var id = req.query.id;
	sql.connect();
	sql.queryCommodityWithId(id,function(err,result){
		if (err) {
			res.send(err.message)
			return;
		}
		count = result[0]['count'];
		count += 1;
		sql.increCountInCommodityById(id,count,function(err,result){
			if (err) {
				res.send(err.message)
				return;
			}
			res.send('success');
		})
	})
})

router.get('/search',function(req,res,next){

	var cid = req.query.cid
	var value = req.query.value;
	
	if (cid == undefined) {
		
		if(value == undefined){
			res.send({"value":null,"status":'success'});
		}
		sql.connect();
		sql.searchFromCommodity(value,function(err,results){
			if(err){
				res.send(err.message);
				return;
			}
			// console.log("----"+results);
			for(var key in results){
				string = results[key]['pic'];
				results[key]['pic'] = string.split('|');

				string = results[key]['description'];
				results[key]['description'] = string.split('|');
			}
			// var key = 0;
			

			var ret = {"value":results,"status":'success'}
			res.send(ret);
		});
	}else{
		if(value == undefined){
			res.send({"value":null,"status":'success'});
		}
		sql.connect();
		sql.searchFromCommodityWithCid(cid,value,function(err,results){
			if(err){
				res.send(err.message);
				return;
			}
			// console.log("----"+results);
			for(var key in results){
				string = results[key]['pic'];
				results[key]['pic'] = string.split('|');

				string = results[key]['description'];
				results[key]['description'] = string.split('|');
			}
			// var key = 0;
			

			var ret = {"value":results,"status":'success'}
			res.send(ret);
		});

	}

	
	// res.render('admin_products_search',{admin_name: req.session.username,list:""});
});
module.exports = router;