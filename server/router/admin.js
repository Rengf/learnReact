var express = require("express");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");

var mysql_connect = require("../db/mysql_connect");
var Admin = require("../db/admin");
var Goods = require("../db/goods");
var User = require("../db/user");
var Article = require("../db/article");

var client = mysql_connect.connectServer();

Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ?
                RegExp.$1.length > 2 ?
                "/u661f/u671f" :
                "/u5468" :
                "") + week[this.getDay() + ""]
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
};

//获取用户列表
router.post("/getuserlist", function(req, res, next) {
    var isadmin = req.body.condition;
    var data = {
        sql: ""
    };
    if (isadmin == undefined) {
        data.sql = "";
    } else {
        data.sql = "where isadmin=" + isadmin;
    }
    Admin.getuserlist(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            userlist: result
        });
    });
});

//获取管理员列表
router.post("/getadminlist", function(req, res, next) {
    var data = req.body.condition;
    var datas = {};
    if (data == "") {
        Admin.getadminlist(client, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                adminlist: result
            });
        });
    } else {
        if (data) {
            datas.way = "isadmin";
            datas.msg = data;
        }
        Admin.getadmincondition(client, datas, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                adminlist: result
            });
        });
    }
});

//按编号获取用户个人信息
router.post("/getuserinfo", function(req, res, next) {
    var id = parseInt(req.body.id);

    var data = {
        user_id: id
    };
    Admin.getuserinfo(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            userinfo: result[0]
        });
    });
});

//删除用户
router.post("/deleteuser", function(req, res, next) {
    var user_id = req.body.user_id;

    var data = {
        user_id: parseInt(user_id)
    };
    Admin.deleteuser(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//设置管理员
router.post("/editadmin", function(req, res, next) {
    var user_id = req.body.user_id;
    var isadmin = req.body.isadmin;

    var data = {
        user_id: parseInt(user_id),
        isadmin: parseInt(isadmin)
    };
    Admin.editadmin(client, data, function(result) {
        res.json({
            code: 0,
            message: "设置成功"
        });
    });
});

//添加商品分类
router.post("/addcategory", function(req, res, next) {
    var goods_type_name = req.body.goods_type_name;
    var date = new Date();
    var addgoodstype_time = date.Format("yyyy-MM-dd HH:mm:ss");

    var data = {
        goods_type_name: goods_type_name,
        addgoodstype_time: addgoodstype_time
    };
    Goods.addcategory(client, data, function(result) {
        res.json({
            code: 0,
            message: "添加成功"
        });
    });
});

//获取分类列表
router.get("/getcategorylist", function(req, res, next) {
    Goods.getcategorylist(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            categorylist: result
        });
    });
});

//查询分类列表
router.post("/searchcategory", function(req, res, next) {
    var data = req.body;
    Goods.searchcategory(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            categorylist: result
        });
    });
});

//删除分类
router.post("/deletecategory", function(req, res, next) {
    var goods_type_id = req.body.goods_type_id;
    var data = {
        goods_type_id: goods_type_id
    };

    Goods.deletecategory(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//添加商品
router.post("/addgoods", multipartMiddleware, function(req, res, next) {
    var myfile = req.files.files;
    var goodsdata = req.body;
    var date = new Date();
    var addgoods_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var data = {
        goods_name: goodsdata.goods_name,
        goods_price: goodsdata.goods_price,
        goods_type_id: parseInt(goodsdata.goods_type_id),
        goods_description: goodsdata.goods_description,
        addgoods_time: addgoods_time,
        stock: goodsdata.stock
    };
    var filePath = "";
    var originalFilename = "";
    if (myfile) {
        filePath = myfile.path || "";
        originalFilename = myfile.originalFilename;
    }
    if (originalFilename) {
        var newfilename = originalFilename;
        var newPath = path.join(
            __dirname,
            "../../",
            "src/assets/images/" + newfilename
        );
        var newimgpath = "../../assets/images/" + originalFilename;
        data.goods_picture = newimgpath;
        fs.writeFile(newPath, fs.readFileSync(filePath), function(err, result) {
            if (err) {
                return res.json({
                    code: 1,
                    message: "上传失败"
                });
            } else {
                Goods.addgoods(client, data, function(result) {
                    res.json({
                        code: 0,
                        message: "添加成功",
                        result: result
                    });
                });
            }
        });
    }
});

//获取商品列表
router.post("/getgoodslist", function(req, res, next) {
    var data = req.body.condition;

    if (JSON.stringify(data) == "{}") {
        Goods.getgoodslist(client, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                goodslist: result
            });
        });
    } else {
        if (data.goods_type_id) {
            data.way = "goods.goods_type_id";
            data.msg = data.goods_type_id;
            Goods.getgoodslistcondition(client, data, function(result) {
                res.json({
                    code: 0,
                    message: "查询成功",
                    goodslist: result
                });
            });
        } else if (data.searchgoods) {
            data.searchmsg = data.searchgoods;
            Goods.searchgoods(client, data, function(result) {
                res.json({
                    code: 0,
                    message: "查询成功",
                    goodslist: result
                });
            });
        }
    }
});

//按销量获取商品列表
router.get("/getgoodslistbysales", function(req, res, next) {
    Goods.getgoodslistbysales(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            goodslist: result
        });
    });
});

//删除商品
router.post("/deletegoods", function(req, res, next) {
    var goods_id = req.body.goods_id;
    var data = {
        goods_id: goods_id
    };

    Goods.deletegoods(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//添加供货商
router.post("/addsupplier", function(req, res, next) {
    var supplierdata = req.body;

    var data = supplierdata;
    Goods.addsupplier(client, data, function(result) {
        res.json({
            code: 0,
            message: "添加成功"
        });
    });
});

//获取供应商列表
router.get("/getsupplierlist", function(req, res, next) {
    Goods.getsupplierlist(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            supplierlist: result
        });
    });
});

//删除供应商
router.post("/deletesupplier", function(req, res, next) {
    var supplier_id = req.body.supplier_id;
    var data = {
        supplier_id: supplier_id
    };

    Goods.deletesupplier(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//添加进货
router.post("/addwarehousing", function(req, res, next) {
    var warehousingdata = req.body;

    var data = warehousingdata;
    Goods.getgoodsbyid(client, data, function(result) {
        data.stock = parseInt(result[0].stock) + parseInt(data.warehousing_count);
        Goods.addwarehousing(client, data, function(result) {
            Goods.updategoodsstock(client, data, function(result) {
                res.json({
                    code: 0,
                    message: "添加成功",
                    result: result
                });
            });
        });
    });
});

//获取进货列表
router.get("/getwarehousinglist", function(req, res, next) {
    Goods.getwarehousinglist(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            warehousinglist: result
        });
    });
});

//搜索进货列表
router.post("/searchwarehousing", function(req, res, next) {
    var data = req.body;
    Goods.searchwarehousing(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            warehousinglist: result
        });
    });
});

//删除进货单
router.post("/deletewarehousing", function(req, res, next) {
    var warehousing_id = req.body.warehousing_id;
    var data = {
        warehousing_id: warehousing_id
    };

    Goods.deletewarehousing(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//获取订单列表
router.post("/getorderlist", function(req, res, next) {
    var data = req.body.condition;
    if (data.sales_way) {
        data.sql = ` where sales_way=` + data.sales_way;
    } else if (data.order_status) {
        data.sql = ` where order_status=` + data.order_status;
    } else {
        data.sql = "";
    }
    Goods.getordercondition(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            orderlist: result
        });
    });
});

//按订单id获取订单
router.post("/getorder", function(req, res, next) {
    var order_id = req.body.data;
    var data = {
        order_id: order_id
    };

    Goods.getorder(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            order: result[0]
        });
    });
});

//删除订单
router.post("/deleteorder", function(req, res, next) {
    var order_id = req.body.order_id;
    var data = {
        order_id: order_id
    };

    Goods.deleteorder(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//发货
router.post("/delivergoods", function(req, res, next) {
    var data = req.body;

    var date = new Date();
    var delivery_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var express_no = parseInt(Math.random() * 100000000000000);
    data.delivery_time = delivery_time;
    data.order_status = 2;
    data.express_no = express_no;
    Goods.addorderlogistics(client, data, function(result) {
        if (result) {
            data.order_logistics_id = result.insertId;
            Goods.delivergoods(client, data, function(result) {
                res.json({
                    code: 0,
                    message: "发货成功"
                });
            });
        }
    });
});

//添加文章
router.post("/addarticle", function(req, res, next) {
    var data = req.body;

    var date = new Date();
    var release_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.release_time = release_time;
    Article.addarticle(client, data, function(result) {
        res.json({
            code: 0,
            message: "添加成功"
        });
    });
});

//文章发布
router.post("/releasearticle", function(req, res, next) {
    var data = req.body;

    var date = new Date();
    var release_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.release_time = release_time;
    data.status = 1;
    Article.releasearticle(client, data, function(result) {
        res.json({
            code: 0,
            message: "发布成功"
        });
    });
});

//获取文章列表
router.post("/getarticlelist", function(req, res, next) {
    var condition = req.body.condition;
    var data = condition;

    if (JSON.stringify(data) == "{}") {
        Article.getarticlelist(client, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                articlelist: result
            });
        });
    } else {
        if (data.status) {
            data.way = "status";
            data.msg = data.status;
        }
        Article.getarticlecondition(client, data, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                articlelist: result
            });
        });
    }
});

//按id获取文章详情
router.get("/getarticle", function(req, res, next) {
    var data = req.query;

    Article.getarticlebyid(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            article: result[0]
        });
    });
});

//按删除文章
router.post("/deletearticle", function(req, res, next) {
    var data = req.body;

    Article.deletearticle(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//按id获取文章详情
router.post("/updatearticle", function(req, res, next) {
    var data = req.body;

    Article.updatearticle(client, data, function(result) {
        res.json({
            code: 0,
            message: "修改成功"
        });
    });
});

//分类获取订单数量
router.get("/orderbystatuscount", function(req, res, next) {
    Goods.orderbystatuscount(client, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天订单
router.get("/searchsales", function(req, res, next) {
    var data = {};
    data.condition = "";

    Goods.searchbysales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天线下订单呢
router.get("/searchsalesoffline", function(req, res, next) {
    var data = {};
    data.condition = "and sales_way=1";

    Goods.searchbysales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天线上订单
router.get("/searchsalesonline", function(req, res, next) {
    var data = {};
    data.condition = "and sales_way=0";

    Goods.searchbysales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天商品销量
router.post("/goodssales", function(req, res, next) {
    var data = req.body;
    data.condition = "and goods_id=" + data.goods_id;

    Goods.goodssales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天在线商品销量
router.post("/goodsonlinesales", function(req, res, next) {
    var data = req.body;
    data.condition = "and goods_id=" + data.goods_id + " and sales_way=0";

    Goods.goodssales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天在线商品销量
router.post("/goodsofflinesales", function(req, res, next) {
    var data = req.body;
    data.condition = "and goods_id=" + data.goods_id + " and sales_way=1";

    Goods.goodssales(client, data, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});

//查询最近七天所有商品销量
router.get("/allgoodssales", function(req, res, next) {
    Goods.allgoodssales(client, function(result) {
        res.json({
            code: 0,
            message: "获取成功",
            result: result
        });
    });
});
//查询商品
router.post("/searchgoods", function(req, res, next) {
    var data = req.body;

    Goods.searchgoods(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            goodslist: result
        });
    });
});

//查询订单
router.post("/searchorder", function(req, res, next) {
    var data = req.body;

    Goods.searchorder(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            orderlist: result
        });
    });
});

//查询退单
router.get("/getreturnorderlist", function(req, res, next) {
    Goods.getreturnorderlist(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            returnorderlist: result
        });
    });
});

//查询评论
router.get("/getcommentlist", function(req, res, next) {
    Goods.getallcommentlist(client, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            commentlist: result
        });
    });
});

//查询管理员
router.post("/searchadmin", function(req, res, next) {
    var data = req.body;

    Admin.searchadmin(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            adminlist: result
        });
    });
});

//查询用户
router.post("/searchuser", function(req, res, next) {
    var data = req.body;

    User.searchauser(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            userlist: result
        });
    });
});
module.exports = router;