import request from "./http";


export function getBlbum(params){
    return request({
        url:'/album',
        method:"get",
        params
    })
}


export function getCommentAlbum(params){
    return request({
        url:'/comment/album',
        method:"get",
        params
    })
}

