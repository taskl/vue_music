import request from "./http";
// http://127.0.0.1:3000/toplist

// 获取mv视频
export function getMvList(params){
    return request({
        url:'/mv/exclusive/rcmd',
        method:"get",
        params
    })
}

// 获取mv视频地址
export function getMvUrl(params){
    return request({
        url:'/mv/url',
        method:"get",
        params
    })
}

// MV推荐
// /personalized/mv
export function getrePersonalized(params){
    return request({
        url:'/personalized/mv',
        method:"get",
        params
    })
}
