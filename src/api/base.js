import request from "./http";

// 调用此接口 ,传入手机号码, 可发送验证码 
// /captcha/sent?phone=13xxx
export function getCaptcha(params) {
    return request({
        url: '/captcha/sent',
        method: "get",
        params
    })
}
export function getSongUrl(params){
    return request({
        url:'/song/url',
        method:"get",
        params
    })
}
// 通过id 获取歌曲详情
// /song/detail?ids=1854142292
export function getSongDetail(params){
    return request({
        url:'/song/detail',
        method:"get",
        params
    })
}
// 通过id 获取歌词
// http://localhost:3000/lyric?id=33894312
export function getLyric(params){
    return request({
        url:'/lyric',
        method:"get",
        params
    })
}
// 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
// /captcha/verify?phone=13xxx&captcha=1597
export function getCaptchaVerify(params) {
    return request({
        url: '/captcha/verify',
        method: "get",
        params
    })
}


// 通过id 手机验证码验证
export function getLoginCellphone(params) {
    return request({
        url: '/login/cellphone',
        method: "get",
        params
    })
}
// 登录后调用此接口 ,可获取用户账号信息
// /user/account
export function getUserDetail(params) {
    return request({
        url: '/user/detail',
        method: "get",
        params
    })
}
// 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// /user/playlist?uid=32953014
export function getUserPlaylist(params) {
    return request({
        url: '/user/playlist',
        method: "get",
        params
    })
}