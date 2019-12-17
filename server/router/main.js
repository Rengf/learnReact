var express = require("express");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
var fs = require("fs");
var path = require("path");
var svgCaptcha = require("svg-captcha");
var mysql_connect = require("../db/mysql_connect");
var User = require("../db/user");
var Goods = require("../db/goods");

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

//验证码生成
router.get("/getcaptcha", (req, res, next) => {
    var codeConfig = {
        size: 5, // 验证码长度
        ignoreChars: "0o1i", // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44
    };
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    var codeData = {
        img: captcha.data
    };
    return res.json({
        code: 0,
        result: codeData,
        message: "验证码"
    });
});

//按id获取商品列表
router.post("/getgoodsdetail", function(req, res, next) {
    var goods_id = req.body.goods_id;
    var client = mysql_connect.connectServer();
    var data = {
        goods_id: goods_id
    };
    Goods.getgoodsdetail(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            goods: result
        });
    });
});

//添加购物车
router.post("/addcart", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var addcart_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.addcart_time = addcart_time;
    Goods.addcart(client, data, function(result) {
        res.json({
            code: 0,
            message: "添加成功",
            goods: result
        });
    });
});

//按id获取购物车列表
router.post("/getcartlist", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.getcartlist(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            cartlist: result
        });
    });
});

//更新购物车
router.post("/updatecart", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.updatecart(client, data, function(result) {
        res.json({
            code: 0,
            message: "更新成功"
        });
    });
});

//删除购物车
router.post("/deletecart", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.deletecart(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//添加订单
router.post("/addorder", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var addorder_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var order_no = parseInt(Math.random() * 100000000000000);
    data.addorder_time = addorder_time;
    data.order_no = order_no;
    data.sales_way = 0;
    data.order_status = 0;
    if (data.isinvoice == 1) {
        data.invoice = "是";
        Goods.addorder(client, data, function(result) {
            data.order_id = result.insertId;
            var date = new Date();
            var addinvoice_time = date.Format("yyyy-MM-dd HH:mm:ss");
            var invoice_no = parseInt(Math.random() * 100000000000000);
            data.addinvoice_time = addinvoice_time;
            data.invoice_no = invoice_no;
            Goods.addinvoice(client, data, function(result) {
                data.invoice_id = result.insertId;
                Goods.updateorderinvoice(client, data, function(result) {
                    res.json({
                        code: 0,
                        message: "下单成功",
                        order_id: data.order_id
                    });
                });
            });
        });
    } else {
        data.invoice = "否";
        Goods.addorder(client, data, function(result) {
            data.order_id = result.insertId;
            res.json({
                code: 0,
                message: "添加成功",
                order_id: data.order_id
            });
        });
    }
});

//付款更新订单
router.post("/updateorder", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var out_trade_no = parseInt(Math.random() * 100000000000000);
    var date = new Date();
    var payed_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.out_trade_no = out_trade_no;
    data.payed_time = payed_time;
    data.order_status = 1;
    Goods.getgoodsbyid(client, data, function(result) {
        if (result) {
            data.stock = parseInt(result[0].stock) - parseInt(data.goods_count);
            data.sales = parseInt(result[0].sales) + parseInt(data.goods_count);
            Goods.updateorder(client, data, function(result) {
                if (result) {
                    Goods.updategoods(client, data, function(result) {
                        res.json({
                            code: 0,
                            message: "修改成功"
                        });
                    });
                } else {
                    return res.json({
                        code: 1,
                        message: "修改失败"
                    });
                }
            });
        }
    });
});

//评价商品
router.post("/goodscomment", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var comment_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.comment_time = comment_time;
    Goods.goodscomment(client, data, function(result) {
        res.json({
            code: 0,
            message: "评论成功"
        });
    });
});

//按id获取评价列表
router.post("/getcommentlist", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.getcommentlist(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            commentlist: result
        });
    });
});

//添加地址信息
router.post("/addaddress", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var addressee_time = date.Format("yyyy-MM-dd HH:mm:ss");
    data.addressee_time = addressee_time;
    Goods.addaddress(client, data, function(result) {
        res.json({
            code: 0,
            message: "添加成功"
        });
    });
});

//按用户id获取地址
router.post("/getaddress", function(req, res, next) {
    var user_id = req.body.user_id;
    var client = mysql_connect.connectServer();
    var data = {
        user_id: user_id
    };
    User.getaddress(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            address: result
        });
    });
});

//删除地址
router.post("/deleteaddress", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.deleteaddress(client, data, function(result) {
        res.json({
            code: 0,
            message: "删除成功"
        });
    });
});

//设置默认地址
router.post("/setdefault", function(req, res, next) {
    var data = {};
    data.address_id = req.body.address_id;
    data.user_id = req.body.user_id;
    var client = mysql_connect.connectServer();
    Goods.searchdefault(client, data, function(result) {
        if (result.length == 0) {
            data.is_default_address = 1;
            Goods.setdefault(client, data, function(result) {
                res.json({
                    code: 0,
                    message: "设置成功"
                });
            });
        } else {
            data.is_default_address = 0;
            data.address_id = result[0].address_id;
            Goods.setdefault(client, data, function(result) {
                data.address_id = req.body.address_id;
                data.is_default_address = 1;
                Goods.setdefault(client, data, function(result) {
                    res.json({
                        code: 0,
                        message: "设置成功"
                    });
                });
            });
        }
    });
});

//按id获取订单详情
router.post("/getorderdetail", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    Goods.getorderdetail(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            order: result[0]
        });
    });
});

//按用户ID和订单状态获取订单
router.post("/getorderlist", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    if (data.status == undefined) {
        data.sql = "order.user_id=" + data.user_id;
        data.sql1 = "";
    } else {
        data.sql = "order.user_id=" + data.user_id;
        data.sql1 = "and order_status=" + data.status;
    }
    Goods.getuserorder(client, data, function(result) {
        res.json({
            code: 0,
            message: "查询成功",
            orderlist: result
        });
    });
});

//退单
router.post("/returnorder", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var return_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var returns_no = parseInt(Math.random() * 100000000000000);
    data.return_time = return_time;
    data.returns_no = returns_no;
    Goods.updateorderstatus(client, data, function(result) {
        Goods.addreturnorder(client, data, function(result) {
            res.json({
                code: 0,
                message: "查询成功",
                orderlist: result
            });
        });
    });
});

//线下购买
router.post("/offlinesales", function(req, res, next) {
    var data = req.body;
    var client = mysql_connect.connectServer();
    var date = new Date();
    var payed_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var addorder_time = date.Format("yyyy-MM-dd HH:mm:ss");
    var order_no = parseInt(Math.random() * 100000000000000);
    data.addorder_time = addorder_time;
    data.order_no = order_no;
    data.payed_time = payed_time;
    data.order_status = 2;
    data.product_count = 1;
    data.product_amount_total = data.goods_price;
    data.order_amount_total = data.goods_price;
    data.logistics = null;
    data.logistics_fee = null;
    data.address_id = null;
    data.pay_channel = "线下支付";
    data.user_id = null;
    data.user_remarks = null;
    data.sales_way = 1;
    Goods.getgoodsbyid(client, data, function(result) {
        if (result) {
            data.stock = parseInt(result[0].stock) - 1;
            data.sales = parseInt(result[0].sales) + 1;
            Goods.addorder(client, data, function(result) {
                Goods.updategoods(client, data, function(result) {
                    res.json({
                        code: 0,
                        message: "添加成功"
                    });
                });
            });
        }
    });
});

//图片上传
router.post("/addimages", multipartMiddleware, function(req, res, next) {
    var myfile = req.files.files;

    var filePath = "";
    var originalFilename = "";
    var imgtype = "";
    if (myfile) {
        filePath = myfile.path || "";
        originalFilename = myfile.originalFilename;
        imgtype = myfile.type.substring(6);
    }
    if (originalFilename) {
        var newfilename = new Date().valueOf() + "image";
        var newPath = path.join(
            __dirname,
            "../../",
            "src/assets/images/" + newfilename + "." + imgtype
        );
        var newimgpath = "assets/images/" + newfilename + "." + imgtype;
        fs.writeFile(newPath, fs.readFileSync(filePath), function(err, result) {
            if (err) {
                return res.json({
                    code: 1,
                    message: "上传失败"
                });
            } else {
                res.json({
                    status: 0,
                    message: "添加成功",
                    data: {
                        url: newimgpath
                    }
                });
            }
        });
    }
});

module.exports = router;