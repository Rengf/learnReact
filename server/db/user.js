module.exports = {

    //登录
    login(client, data, callback) {
        var sql = `select *
                from user
                where user_tel= ?`;
        var params = [
            data.user_name,
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })

    },
    //注册
    regist(client, data, callback) {
        var sql = `insert into user
        (isadmin,user_password,user_name,user_tel,user_email,user_avatar,regist_time)
        values(?,?,?,?,?,?,?);`
        var params = [
            data.isadmin,
            data.user_pwd,
            data.user_name,
            data.user_tel,
            data.user_email,
            data.user_avatar,
            data.regist_time
        ];

        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //修改个人信息
    updateuserinfo(client, data, callback) {
        var sql = `update user set 
        user_name=?,user_email=?,user_tel=?,real_name=?,user_avatar=?,last_modified_time=?
        where user_id = ?`
        var params = [
            data.user_name,
            data.user_email,
            data.user_tel,
            data.real_name,
            data.user_avatar,
            data.modified_time,
            data.user_id,
        ];
        client.query(sql, params, (err, result) => {
            if (err) {
                throw err
            }
            callback(result);
        })
    },

    //修改登录时间
    updatelogintime(client, data, callback) {
        var sql = `update user set 
        last_login_time=?
        where user_id = ?`
        var params = [
            data.login_time,
            data.user_id,
        ];
        client.query(sql, params, (err, result) => {
            if (err) {
                throw err
            }
            callback(result);
        })
    },


    //按id查询
    searchbyid(client, data, callback) {
        var sql = `select *
                from user
                where user_id= ?`;
        var params = [
            data.user_id,
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })

    },

    //修改密码
    updatepassword(client, data, callback) {
        var sql = `update user set 
        user_password=?,last_modified_time=?
        where user_id = ?`
        var params = [
            data.user_password,
            data.modified_time,
            data.user_id,
        ];
        client.query(sql, params, (err, result) => {
            if (err) {
                throw err
            }
            callback(result);
        })
    },

    //按id查询
    getaddress(client, data, callback) {
        var sql = `select *
                from address
                inner join user on address.user_id=user.user_id
                where address.user_id= ?
                order by is_default_address desc`;
        var params = [
            data.user_id,
        ];
        client.query(sql, params, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },

    //查询用户
    searchauser(client, data, callback) {
        var sql = `select * from user
        where  (user_name like '%` + data.searchmsg + `\%' 
        or user_tel like '%` + data.searchmsg + `\%'
        or user_email like '%` + data.searchmsg + `\%'
        or real_name like '%` + data.searchmsg + `\%')`
        client.query(sql, (err, result) => {
            if (err) throw err
            callback(result);
        })
    },
}