import request from "./http";


export function getPlaylist(params){
    return request({
        url:'/playlist/detail',
        method:"get",
        params
    })
}