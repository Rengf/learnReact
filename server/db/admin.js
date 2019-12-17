module.exports = {

  //获取用户列表
  getuserlist(client, data, callback) {
    var sql = `select * from user ` + data.sql

    client.query(sql, (err, result) => {
      if (err) throw err
      callback(result);
    })

  },

  //获取管理员列表
  getadminlist(client, callback) {
    var sql = `select * from user where isadmin>0`;
    client.query(sql, (err, result) => {
      if (err) throw err
      callback(result);
    })

  },

  //按条件获取管理员列表
  getadmincondition(client, data, callback) {
    var sql = `select * from user
                    where ` + data.way + `=?`
    var params = [
      data.msg
    ]
    client.query(sql, params, (err, result) => {
      if (err) throw err
      callback(result);
    })

  },

  //获取管理员信息
  getuserinfo(client, data, callback) {
    var sql = `select user_name,user_id,user_avatar,user_tel,user_email,real_name,isadmin,regist_time,last_login_time
                   from user where user_id=?`;
    var params = [
      data.user_id,
    ];
    client.query(sql, params, (err, result) => {
      if (err) throw err
      callback(result)
    })
  },

  //删除用户
  deleteuser(client, data, callback) {
    var sql = `delete from user
        where user_id=?`
    var params = [
      data.user_id
    ];
    client.query(sql, params, (err, result) => {
      if (err) throw err
      callback(result)
    })
  },

  //设置管理员
  editadmin(client, data, callback) {
    var sql = `update user set
        isadmin=?
        where user_id=?`
    var params = [
      data.isadmin,
      data.user_id
    ];
    client.query(sql, params, (err, result) => {
      if (err) throw err
      callback(result)
    })
  },

  //查询管理员
  searchadmin(client, data, callback) {
    var sql = `select * from user
        where isadmin>0 and
        (user_name like '%` + data.searchmsg + `\%' 
        or user_tel like '%` + data.searchmsg + `\%'
        or user_email like '%` + data.searchmsg + `\%'
        or real_name like '%` + data.searchmsg + `\%')`
    client.query(sql, (err, result) => {
      if (err) throw err
      callback(result);
    })
  },

}
