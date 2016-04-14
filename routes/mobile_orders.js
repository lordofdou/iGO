var express = require('express');
var router = express.Router();
var sql = require('./sql');

//get the number of  orders
//receive:id
//send
/*
json
{
    'count':'订单数量'
}
*/
router.get('/count',function(req,res,next){
    var id = req.query.id;
    var validation = req.query.validation
    sql.connect();
    sql.queryUserWithIdAndValidation(req,id,validation,function(err,results){
        if(err){
            res.send(err.message);

            return;
        }

        if(results.length == 0){
            res.send("validation is out-of-date");
        }else{
           sql.queryFromOrdersByUid(id,function(err,results){
                if(err){
                    res.send(err.message);
                    return;
                }
                // var count = new Array();
                // count['count'] = results.length;
                count = {"count":results.length}
                // count = results.length;
                // console.log(count);
                res.send(count);
            }); 
        }
    });
    
});

//get detailed order list
//receive:id
//send
/*
json
[
    {
        'id':'订单标识'
        'code':'订单号'
        'time':'创建时间'
        'status':'订单状态'
        'address':{'配送地址'
            'id':'地址ID'
            'region':'区域'
            'address':'详细地址'
            'name':'收货人姓名'
            'tel':'联系方式'
            'uid':'用户ID'
        }
        'product':{'商品信息'
            'id':'商品ID'
            'name':'商品名称'
            'smallCate':'小分类'
            'bigCate':'大分类'
            'region':'所在地区'
            'price':'价格'
            'sale':'销量'
            'storage':'库存'
            'count':'收藏数'
            'onSale':'是否上架'
            'pic':'展示图1|展示图2|展示图3'
            'description':'描述图1|描述图2|描述图3'
            'factory':'厂家'
        }
    },
    ...
]
*/
router.get('/list',function(req,res,next){
    var uid = req.query.uid;
    sql.connect();
    sql.queryFromOrdersByUid(uid,function(err,results){
        if(err){
            res.send(err.message);
            return;
        }
        sql.ConvertAidToAddress(results,function(err,results2){
            if(err){
                res.send(err.message);
                return;
            }

            sql.ConvertPidToProduct(results2,function(err,results3){
                if(err){
                    res.send(err.message);
                    return;
                }
                var ret = {"value":results3,"status":'success'}
                res.send(ret);
            });
        })
        // count = results.length;
        // // console.log("----"+results.length)
        // res.send("count:"+count);
    });

});

//uid pid aid amount
router.post('/add',function(req,res,next){
    sql.connect();
    var value = new Array();
    value.uid = req.body.uid;
    value.pid = req.body.pid;
    value.aid = req.body.aid;
    value.amount = req.body.amount;
    sql.insertRecordIntoOrders(value,function(err,results){
        if (err) {
            res.send(err.message);
            console.log(err.message);
        }
        sql.queryCommodityWithId(value.id,function(err,result){
            if (err) {
                res.send(err.message);
                console.log(err.message);
                return;
            }
            storage = result[0]['storage'];
            storage -= 1;
            sql.decreStorageInCommodityById(value.id,storage,function(err,results){
                if (err) {
                    res.send(err.message);
                    console.log(err.message);
                }
                res.send('success');
            })
        });       
    });


})

module.exports = router;