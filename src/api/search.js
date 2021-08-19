import request from "./http";


export function getSearchHot(params){
    return request({
        url:'/search/hot',
        method:"get",
        params
    })
}

export function getCloudsearch(params){
    return request({
        url:'/cloudsearch',
        method:"get",
        params
    })
}