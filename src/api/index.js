import jsonp from 'jsonp'
import ajax from "./ajax";
import {
    message
} from 'antd';

const BASE_URL = "";

//获取登录信息
export const reqIsLogin = () => ajax(BASE_URL + "/api/", {}, "GET")

//登录
export const reqLogin = (data) => ajax(BASE_URL + "/api/user/login", {
    data
}, "POST");

//获取验证码
export const reqCaptcha = () => ajax(BASE_URL + "/main/getcaptcha", {}, "GET")

/**jsonp请求的接口请求函数 */
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=94Tmshjhp03oul7xy95Gu3wwHkjGZvkk&mcode=EE:0C:C8:50:54:53:96:5A:55:8C:23:2F:93:7E:EB:AE:D8:C8:1B:F1;com.example.tangdekun.androidannotationsdemo——';
        jsonp(url, {}, (err, data) => {
            console.log(url, err, data)
            if (!err && data.status === 'success') {
                const {
                    dayPictureUrl,
                    weather
                } = data.results[0].weather_data[0]
                resolve({
                    dayPictureUrl,
                    weather
                })
            } else {
                message.error('获取天气失败')
            }
        })
    })

}


//获取分类列表
export const reqCategoryList = () => ajax(BASE_URL + '/admin/getcategorylist', {}, 'GET')

//添加商品分类
export const reqAddCategory = (data) => ajax(BASE_URL + "/admin/addcategory", data, "POST")

//获取商品列表
export const reqGoodsList = (condition) => ajax(BASE_URL + '/admin/getgoodslist', {
    condition
}, 'POST')

//获取订单列表
export const reqOrderList = (condition) => ajax(BASE_URL + '/admin/getorderlist', {
    condition
}, 'POST')

//搜索/查询订单
export const reqSearchOrder = (data) => ajax(BASE_URL + "/admin/searchorder",
    data, "POST")

//添加商品
export const reqAddGoods = (data) => ajax(BASE_URL + "/admin/addgoods",
    data, "POST")