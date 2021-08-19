import request from "./http";


export function getMvDetail(params){
    return request({
        url:'/mv/detail',
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


export function getCommentMv(params){
    return request({
        url:'/comment/mv',
        method:"get",
        params
    })
}