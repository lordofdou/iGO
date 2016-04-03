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
    var uid = req.query.uid;
    sql.connect();
    sql.queryFromOrdersByUid(uid,function(err,results){
        if(err){
            res.send(err.message);
            return;
        }
        count = results.length;
        // console.log("----"+results.length)
        res.send("count:"+count);
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
                res.send(results3);
            });
        })
        // count = results.length;
        // // console.log("----"+results.length)
        // res.send("count:"+count);
    });

});

module.exports = router;