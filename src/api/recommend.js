import request from "./http";
// http://192.168.100.59:3000/banner?type=3

// 获取轮播图数据
export function getBanner(){
    return request({
        url:'/banner?type=3',
        method:"get"
    })
}

// 获取推荐歌单接口

export function getPersonalized(){
    return request({
        url:'/personalized?limit=6',
        method:"get"
    })
}

// 获取最新音乐接口
export function getNewsong(){
    return request({
        url:'/personalized/newsong',
        method:"get"
    })
}

export function getMv(){
    return request({
        url:'/personalized/mv',
        method:"get"
    })
}

export function thelatestMusic() {
    return request({
        url: "/personalized/newsong",
        method: "get"
    })
}



export function getNewCD(){
    return request({
        url:'/album/newest',
        method:"get"
    })
}
