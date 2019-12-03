import ajax from "./ajax";

const BASE_URL = "";

//获取登录信息
export const reqIsLogin = () => ajax(BASE_URL + "/api/", {}, "GET")

//登录
export const reqLogin = (data) => ajax(BASE_URL + "/api/user/login", {
    data
}, "POST");

//获取验证码
export const reqCaptcha = () => ajax(BASE_URL + "/main/getcaptcha", {}, "GET")