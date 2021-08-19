import request from "./http";

export function getNewSong(params){
    return request({
        url:'/personalized/newsong',
        method:"get",
        params
    })
}

