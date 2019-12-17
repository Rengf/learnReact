module.exports = {
    //添加商品分类
    addcategory(client, data, callback) {
        var sql = `insert into goods_type
        (goods_type_name,addgoodstype_time)
        values(?,?);`
        var params = [
            data.goods_type_name,
            data.addgoodstype_time
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取商品分类
    getcategorylist(client, callback) {
        var sql = `select * from goods_type`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //搜素商品分类
    searchcategory(client, data, callback) {
        var sql = `select * from goods_type
    where goods_type_name like '%` + data.searchmsg + `\%'`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },


    //删除商品分类
    deletecategory(client, data, callback) {
        var sql = `delete from goods_type
        where goods_type_id=?`
        var params = [
            data.goods_type_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加商品
    addgoods(client, data, callback) {
        var sql = `insert into goods
        (goods_name,goods_picture,goods_price,goods_type_id,goods_description,addgoods_time,stock)
        values(?,?,?,?,?,?,?);`
        var params = [
            data.goods_name,
            data.goods_picture,
            data.goods_price,
            data.goods_type_id,
            data.goods_description,
            data.addgoods_time,
            data.stock
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取商品列表
    getgoodslist(client, callback) {
        var sql = `select * from goods as s
        inner join goods_type as t on t.goods_type_id=s.goods_type_id`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //按条件获取商品列表
    getgoodslistcondition(client, data, callback) {
        var sql = `select * from goods 
        inner join goods_type on goods.goods_type_id=goods_type.goods_type_id
        where  ` + data.way + `=` + data.msg + ``;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //搜索商品
    searchgoods(client, data, callback) {
        var sql = `select * from goods
        inner join goods_type on goods.goods_type_id=goods_type.goods_type_id
        where goods_name like '%` + data.searchmsg + `\%' 
        or goods_type_name like '%` + data.searchmsg + `\%'
        or goods_description like '%` + data.searchmsg + `\%'
        or goods_price like '%` + data.searchmsg + `\%'`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //按销量获取商品列表
    getgoodslistbysales(client, callback) {
        var sql = `select goods_name,goods_type_name,sales from goods 
        inner join goods_type on goods.goods_type_id=goods_type.goods_type_id
        order by sales desc limit 10`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取商品
    getgoodsbyid(client, data, callback) {
        var sql = `select * from goods
        inner join goods_type on goods.goods_type_id=goods_type.goods_type_id
        where goods_id=?`;
        var params = [
            data.goods_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //更新商品库存
    updategoodsstock(client, data, callback) {
        var sql = `update goods set 
        stock=?
        where goods_id = ?`;
        var params = [
            data.stock,
            data.goods_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //更新商品销量和库存
    updategoods(client, data, callback) {
        var sql = `update goods set 
        stock=?,sales=?
        where goods_id = ?`;
        var params = [
            parseInt(data.stock),
            parseInt(data.sales),
            data.goods_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //删除商品
    deletegoods(client, data, callback) {
        var sql = `delete from goods
        where goods_id=?`
        var params = [
            data.goods_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加供应商
    addsupplier(client, data, callback) {
        var sql = `insert into supplier
        (supplier_name,supplier_contact,supplier_address,supplier_postcode,supplier_tel,supplier_email,supplier_bank,supplier_account)
        values(?,?,?,?,?,?,?,?);`
        var params = [
            data.supplier_name,
            data.supplier_contact,
            data.supplier_address,
            data.supplier_postcode,
            data.supplier_tel,
            data.supplier_email,
            data.supplier_bank,
            data.supplier_account
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取供应商列表
    getsupplierlist(client, callback) {
        var sql = `select * from supplier`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //删除供应商
    deletesupplier(client, data, callback) {
        var sql = `delete from supplier
        where supplier_id=?`
        var params = [
            data.supplier_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加进货单
    addwarehousing(client, data, callback) {
        var sql = `insert into warehousing
        ( warehousing_order_id,warehousing_time, goods_id,warehousing_count,total_price,warehousing_staff,supplier)
        values(?,?,?,?,?,?,?);`
        var params = [
            data.warehousing_order_id,
            data.warehousing_time,
            data.goods_id,
            data.warehousing_count,
            data.total_price,
            data.warehousing_staff,
            data.supplier,
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取进货单
    getwarehousinglist(client, callback) {
        var sql = `select * from warehousing 
        inner join goods on warehousing.goods_id=goods.goods_id
        inner join supplier on warehousing.supplier=supplier.supplier_id`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //搜素进货单
    searchwarehousing(client, data, callback) {
        var sql = `select * from warehousing
        inner join goods on warehousing.goods_id=goods.goods_id
        inner join supplier on warehousing.supplier=supplier.supplier_id
      where goods.goods_name like '%` + data.searchmsg + `\%'
      or warehousing.warehousing_order_id like '%` + data.searchmsg + `\%'
      or warehousing.warehousing_staff like '%` + data.searchmsg + `\%'
      or supplier.supplier_name like '%` + data.searchmsg + `\%'`;
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //删除进货单
    deletewarehousing(client, data, callback) {
        var sql = `delete from warehousing
        where warehousing_id=?`
        var params = [
            data.warehousing_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //按ID获取商品详情
    getgoodsdetail(client, data, callback) {
        var sql = `select * from goods
        where goods_id=?`
        var params = [
            data.goods_id
        ];

        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加购物车
    addcart(client, data, callback) {
        var sql = `insert into cart
        ( goods_id,user_id, goods_count,addcart_time)
        values(?,?,?,?);`
        var params = [
            data.goods_id,
            data.user_id,
            data.goods_count,
            data.addcart_time,
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //按ID获取购物车
    getcartlist(client, data, callback) {
        var sql = `select *
        from cart
        inner join user on cart.user_id=user.user_id
        left join goods on cart.goods_id=goods.goods_id
        where cart.user_id= ?`
        var params = [
            data.data
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },


    //更新购物车
    updatecart(client, data, callback) {
        var sql = `update cart set
        goods_count=?
        where cart_id= ?`
        var params = [
            data.goods_count,
            data.cart_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //删除购物车
    deletecart(client, data, callback) {
        var sql = `delete from cart
        where cart_id=?`
        var params = [
            data.cart_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加订单
    addorder(client, data, callback) {
        var sql = `insert into \`order\`
         (order_no,goods_id,order_status,product_count,product_amount_total,order_amount_total,logistics,logistics_fee,invoice,address_id,pay_channel,addorder_time,user_id,user_remarks,sales_way) 
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
        var params = [
            data.order_no,
            parseInt(data.goods_id),
            data.order_status,
            data.product_count,
            data.product_amount_total,
            data.order_amount_total,
            data.logistics,
            data.logistics_fee,
            data.invoice,
            data.address_id,
            data.pay_channel,
            data.addorder_time,
            data.user_id,
            data.user_remarks,
            data.sales_way,
        ];
        client.query(sql, params, (err, result) => {
            if (err) {
                throw err
            }
            callback(result);
        })
    },

    //添加发票
    addinvoice(client, data, callback) {
        var sql = `insert into order_invoice
        ( invoice_id,addinvoice_time,order_id)
        values(?,?,?);`
        var params = [
            data.invoice_id,
            data.addinvoice_time,
            parseInt(data.order_id)
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //添加发票ID到订单
    updateorderinvoice(client, data, callback) {
        var sql = `update \`order\` set 
        invoice_id=?
        where order_id = ?`
        var params = [
            data.invoice_id,
            parseInt(data.order_id),
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //确定支付
    updateorder(client, data, callback) {
        var sql = `update \`order\` set 
        out_trade_no=?,payed_time=?,order_status=?
        where order_id = ?`
        var params = [
            data.out_trade_no,
            data.payed_time,
            data.order_status,
            parseInt(data.order_id),
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },


    //更新订单状态
    updateorderstatus(client, data, callback) {
        var sql = `update \`order\` set 
        order_status=4
        where order_id = ?`
        var params = [
            parseInt(data.order_id),
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //添加退单
    addreturnorder(client, data, callback) {
        var sql = `insert into order_returns
        ( returns_no,order_id,return_reason,return_time)
        values(?,?,?,?);`
        var params = [
            data.returns_no,
            data.order_id,
            data.return_reason,
            data.return_time
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },


    //按条件获取订单列表
    getordercondition(client, data, callback) {
        var sql1 = `select count(*) count from \`order\`  ` + data.sql;
        var sql = `select * from \`order\`
                    left join user on order.user_id=user.user_id
                    left join goods on order.goods_id=goods.goods_id
                    left join address on order.address_id=address.address_id
                    ` + data.sql + ` limit ?,?`
        var params = [
            data.pages,
            data.limit
        ]
        client.query(sql1, (err, count) => {
            if (err) {
                throw err
            } else {
                client.query(sql, params, (err, result) => {
                    if (err) throw err
                    var total = JSON.parse(JSON.stringify(count))
                    var resdata = {
                        count: total[0].count,
                        data: result
                    }
                    callback(resdata)

                })
            }
        })
    },


    //按条件获取退单列表
    getreturnorderlist(client, callback) {
        var sql = `select * from \`order_returns\`
        left join \`order\` on order.order_id=order_returns.order_id`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //按用户ID和状态获取订单列表
    getuserorder(client, data, callback) {
        var sql = `select * from \`order\`
                    left join user on order.user_id=user.user_id
                    left join goods on order.goods_id=goods.goods_id
                    left join address on order.address_id=address.address_id
                    where  ` + data.sql + ` ` + data.sql1 + ` order by addorder_time desc`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //按ID获取订单
    getorder(client, data, callback) {
        var sql = `select * from \`order\`
                    left join user on order.user_id=user.user_id
                    inner join goods on order.goods_id=goods.goods_id
                    left join address on order.address_id=address.address_id
                    left join order_invoice on order.invoice_id=order_invoice.invoice_id
                    left join order_logistics on order.order_logistics_id=order_logistics.order_logistics_id
                    where order.order_id= ?`
        var params = [
            parseInt(data.order_id)
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //按用户ID和订单ID获取订单
    getorderdetail(client, data, callback) {
        var sql = `select * from \`order\`
                    left join user on order.user_id=user.user_id
                    inner join goods on order.goods_id=goods.goods_id
                    left join address on order.address_id=address.address_id
                    left join order_invoice on order.invoice_id=order_invoice.invoice_id
                    left join order_logistics on order.order_logistics_id=order_logistics.order_logistics_id
                    where order.order_id= ? and order.user_id=?`
        var params = [
            parseInt(data.order_id),
            data.user_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //删除订单
    deleteorder(client, data, callback) {
        var sql = `delete from \`order\`
        where order_id=?`
        var params = [
            parseInt(data.order_id)
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //添加物流
    addorderlogistics(client, data, callback) {
        var sql = `insert into order_logistics
        ( order_id,express_no,order_logistics,logistics_fee,delivery_time)
        values(?,?,?,?,?);`
        var params = [
            data.order_id,
            data.express_no,
            data.logistics,
            data.logistics_fee,
            data.delivery_time
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //发货
    delivergoods(client, data, callback) {
        var sql = `update \`order\` set
        order_status=?,order_logistics_id=?,delivery_time=?
        where order_id = ?`
        var params = [
            data.order_status,
            data.order_logistics_id,
            data.delivery_time,
            data.order_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },


    // //总销量查询
    // searchbysales(client, data, callback) {
    //     var sql = `select product_count,addorder_time from \`order\`
    //     where addorder_time>=? && addorder_time<=? 
    //     order by addorder_time desc`
    //     var params = [
    //         data.date7,
    //         data.date1
    //     ]
    //     client.query(sql, params, (err, result) => {
    //         if (err) throw err
    //         callback(result);
    //     })
    // },

    //订单量查询
    searchbysales(client, data, callback) {
        var sql = `SELECT
        DATE_FORMAT( addorder_time, '%Y-%m-%d' ) days,
        count(*) count FROM   
        ( SELECT * FROM \`order\` WHERE DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date( addorder_time) ` + data.condition + `) as abcc
        GROUP BY days`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //订单分类查询
    orderbystatuscount(client, callback) {
        var sql = `SELECT order_status,
        count(*) as count
        from  \`order\`
        GROUP BY  order_status`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //商品销量查询
    goodssales(client, data, callback) {
        var sql = `SELECT 
        DATE_FORMAT( addorder_time, '%Y-%m-%d' ) days,
        SUM(product_count) as count from 
        (SELECT * FROM \`order\` where DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date( addorder_time) ` + data.condition + `) as sdhfjas
        GROUP BY days`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //所有商品销量查询
    allgoodssales(client, callback) {
        var sql = `SELECT
        goods_name,
        SUM(product_count) as count
        from 
        (SELECT \`order\`.*,goods.goods_name FROM \`order\`
        left join goods  on order.goods_id=goods.goods_id 
        where DATE_SUB( CURDATE( ), INTERVAL 7 DAY ) <= date( addorder_time) ) as dfkaks
        GROUP BY  goods_id`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //查询订单
    searchorder(client, data, callback) {
        var sql1 = `select count(*) count from \`order\`
         left join user on order.user_id=user.user_id
        inner join goods on order.goods_id=goods.goods_id
        left join address on order.address_id=address.address_id
        left join order_invoice on order.invoice_id=order_invoice.invoice_id
        left join order_logistics on order.order_logistics_id=order_logistics.order_logistics_id
        where order_no like '%` + data.searchmsg + `\%' 
        or pay_channel like '%` + data.searchmsg + `\%'
        or goods_name like '%` + data.searchmsg + `\%'
        or order.logistics like '%` + data.searchmsg + `\%'
        or user_name like '%` + data.searchmsg + `\%' `;

        var sql = `select * from \`order\`
        left join user on order.user_id=user.user_id
        inner join goods on order.goods_id=goods.goods_id
        left join address on order.address_id=address.address_id
        left join order_invoice on order.invoice_id=order_invoice.invoice_id
        left join order_logistics on order.order_logistics_id=order_logistics.order_logistics_id
        where order_no like '%` + data.searchmsg + `\%' 
        or pay_channel like '%` + data.searchmsg + `\%'
        or goods_name like '%` + data.searchmsg + `\%'
        or order.logistics like '%` + data.searchmsg + `\%'
        or user_name like '%` + data.searchmsg + `\%'
        limit ` + data.pages + ` , ` + data.limit + ` `

        client.query(sql1, (err, count) => {
            if (err) {
                throw err
            } else {
                client.query(sql, (err, result) => {
                    if (err) throw err
                    var total = JSON.parse(JSON.stringify(count))
                    var resdata = {
                        count: total[0].count,
                        data: result
                    }
                    callback(resdata)
                })
            }
        })
    },


    //评价商品
    goodscomment(client, data, callback) {
        var sql = `insert into comment
        ( goods_id,user_id,content,comment_time)
        values(?,?,?,?);`
        var params = [
            data.goods_id,
            data.user_id,
            data.content,
            data.comment_time
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //按商品id获取商品评价
    getcommentlist(client, data, callback) {
        var sql = `select * from comment
        left join goods on goods.goods_id=comment.comment_id
        left join user on user.user_id=comment.user_id
        where comment.goods_id =?`
        var params = [
            data.goods_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //获取全部评价
    getallcommentlist(client, callback) {
        var sql = `select * from comment
        left join goods on goods.goods_id=comment.comment_id
        left join user on user.user_id=comment.user_id`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //添加地址
    addaddress(client, data, callback) {
        var sql = `insert into address
        ( user_id,addressee,tel,tel2,country,province,city,area,street,zip_code,addressee_time)
        values(?,?,?,?,?,?,?,?,?,?,?);`
        var params = [
            data.user_id,
            data.addressee,
            data.tel,
            data.tel2,
            data.country,
            data.province,
            data.city,
            data.area,
            data.street,
            data.zip_code,
            data.addressee_time
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //删除地址
    deleteaddress(client, data, callback) {
        var sql = `delete from address
        where address_id=?`
        var params = [
            data.address_id
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //查询默认地址
    searchdefault(client, data, callback) {
        var sql = `select * from address
        where is_default_address=1 && user_id=?`
        var params = [
            data.user_id
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result)
        })
    },

    //设置默认地址
    setdefault(client, data, callback) {
        var sql = `update address set
        is_default_address=?
        where address_id = ?`
        var params = [
            data.is_default_address,
            data.address_id,
        ]
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
}