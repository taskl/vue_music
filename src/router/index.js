import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from "../views/recommend.vue";  //同步路由加载
import guidePage from "../components/public/guidePage.vue";  //同步路由加载
import tacit from '../components/public/tacit.vue';
import search from '../components/public/search.vue';
import zhuanji from '../components/public/zhuanji.vue';
import geshou from '../components/public/geshou.vue';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/recommend"
  },
  {
    path: '/tacit',
    name: 'tacit',
    component: tacit
  },  
  {
    path:"/guidePage",
    name:"guidePage",
    component:guidePage
  },
  {
    path:"/recommend",
    name:"recommend",
    // 添加路由元信息
    meta:{
        headerNav:true
    },
    component:recommend
  },
  {
    path: '/zhuanji',
    name: 'zhuanji',

    component: zhuanji
  },  
  {
    path: "/editMages",
    name: "editMages",
    component: () => import("../components/base/editMages.vue")
  },
  {
    path: '/geshou',
    name: 'geshou',

    component: geshou
  }, 
  {
    path:"/singer",
    name:"singer",
    meta:{
        headerNav:true
    },
    component:()=>import("../views/singer.vue")  //懒加载
  },
  {
    path:"/rank",
    name:"rank",
    meta:{
        headerNav:true
    },
    component:()=>import("../views/rank.vue")
  },
   
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path:'/login',
    name:"login",
    component:()=>import("../components/base/login.vue")
  },
  {
    path:"/rank/ranklist",
    name:"ranklist",
    component:()=>import("../components/rank/ranklist.vue")
  },
  {
    path:"/newmv",
    name:"newmv",
    meta:{
        headerNav:true
    },
    component:()=>import("../views/newmv.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   let login = window.localStorage.getItem("login");
//   // 登录界面
//   if(to.path == "/login"){
//     next();
//     return;
//   }else{
//     // 判断登录情况
//     if(!login){
//       next("/login");
//       return;
//     }else{
//       next();
//     }
//   }
// })
export default router
