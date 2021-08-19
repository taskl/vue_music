<template>
  <div>
    <div class="header">
      <div
        class="iconfont icon-arrow-left-bold"
        @click="$router.push('/newmv')"
      ></div>
      <div class="center">mv介绍</div>
    </div>


  <div>
    <div class="container">
      <div class="mvlists" ref="mvlists" >
            <div class="imgs"  v-show="show" :style="{'background-image':'url('+cover+')'}" >
                <span class="iconfont icon-bofang" @click="toshow()"></span>
            </div>
            <div class="imgs" style="display:none" v-show="!show">
              <video :src="mvlists" controls></video>
            </div>
        </div>
      </div>
      <div class="container2">
          <div class="text1"><span>MV</span>{{title}}</div>
          <div class="text2">歌手:{{name}}</div>
          <div class="text3">发布时间:{{time}}<span>播放:{{count}}次</span></div>
      </div>

      <div class="topSection">
        <div :class="[{ selects: flag }]" @click.stop="leftsDetails">MV推荐</div>
        <div :class="[{ selects: !flag }]" @click.stop="rightsComments">
          全部评论
        </div>
      </div>

       <div class="details" ref="content" v-show="flag">
        <div class="topList">最新热门MV推荐</div>
        <ul class="tuijian">
          <li v-for="(key, i) in list" :key="i">
            <!-- <video src=""></video> -->
            <img :src="key.picUrl" alt="" @click="gotoPlay(key.id, key.name)" />
            <div>
              <p>{{ key.name }}</p>
              <p>{{ key.artistName }}</p>
            </div>
          </li>
        </ul>
      </div>

  <div v-show="!flag">
    <div class="pinglun">
      <!-- <div class="box-header">精彩评论:</div> -->
      <div class="lang">
        <ul>
          <li v-for="(item, index) in userLists" :key="index">
            <div class="head"><img :src="item.user.avatarUrl" alt="" /></div>
            <p class="p1">{{ item.user.nickname }}</p>
            <p>{{ item.content }}</p>
            <p class="p2">
              <span class="span1">{{getDateStr(item.time)}}</span>
              <span class="span2"
                ><i :class="['iconfont', 'icon-zan2' , {red:item.liked}]"  @click="toggle_like(item.liked,index)"></i>({{item.likedCount}}) | <span>回复</span></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>

     <div class="pinglun">
      <div class="box-header"> 热门评论:</div> 
      <div class="lang">
        <ul>
          <li v-for="(item, index) in userHotLists" :key="index">
            <div class="head"><img :src="item.user.avatarUrl" alt="" /></div>
            <p class="p1">{{ item.user.nickname }}:{{ item.content }}</p>
            <p class="p2">
              <span class="span1">{{getDateStr(item.time)}}</span>
              <span class="span2" 
                ><i :class="['iconfont', 'icon-zan2' , {red:item.liked}]"  @click="toggle_like1(item.liked,index)"></i>({{item.likedCount}}) | <span>回复</span></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>


    
  </div>
</template>

<script>
import {getMvDetail,getCommentMv} from "../../api/geshou"
import{getMvUrl,getrePersonalized} from "../../api/mv.js"


export default {
  data() {
    return {
      lists:null,
      cover:null,
      name:null,
      title:null,
      time:null,
      count:null,
      mvlists:null,
      userLists:null,
      userHotLists:null,
      show:true,
      liked: false,
      flag: true,
      list: [],
      // like_count: 10,
      index:0,
    };
  },
  methods: {
    gotoPlay(id, item) {
      this.getMvUrlFn(id);
      this.getCommentMvFn(id);
      this.title = item;
    },
     // 点击详情显示
    leftsDetails() {
      this.flag = true;
    },
      // 点击评论显示
    rightsComments() {
      this.flag = false;
    },
      toggle_like(temp,index){   
        console.log(temp);
        if(!temp){
          this.userLists[index].liked = true;
          this.userLists[index].likedCount +=1;
        }else{
          this.userLists[index].liked = false;
          this.userLists[index].likedCount -=1;
        }
      },
      toggle_like1(temp,index){   
        console.log(temp);
        if(!temp){
          this.userHotLists[index].liked = true;
          this.userHotLists[index].likedCount +=1;
        }else{
          this.userHotLists[index].liked = false;
          this.userHotLists[index].likedCount -=1;
        }
      },
    toshow(){
        this.show = false;
    },
     getMvDetailFun() {
      let mvid = this.id;
      getMvDetail({ mvid }).then((data) => {
        console.log(data);
        if (data.code == 200) {
        //  console.log(data.data.cover); 
         this.lists= data.data;
         this.cover = data.data.cover;
         this.name  = data.data.artistName;
         this.title = data.data.name;
         this.time = data.data.publishTime;
         this.count = data.data.shareCount;
        }
      });
    },
    getMvUrlFun(){
      let id = this.id;
      getMvUrl({id}).then(data=>{
        if(data.code == 200){
          console.log(data);
          
          this.mvlists= data.data.url
          // this.userLists = data.comments;
          // this.userHotLists = data.hotComments;
        }
      })
    },
      getCommentMvFun(){
      let id = this.id
    getCommentMv({id}).then(data =>{
      if(data.code == 200){
        console.log(data);
          this.userLists = data.comments;
          this.userHotLists = data.hotComments;
      }
    })
  },
   getDateStr (seconds) {
      let date = new Date(seconds)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      let currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      return currentTime
    },  
  },

  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getMvDetailFun()
    this.getMvUrlFun()
    this.getCommentMvFun()
     getrePersonalized().then((data) => {
      this.list = data.result;
      console.log("mvid", this.list);
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  display: flex;
  background-color: #d4473c;
  color: #fff;
  text-align: center;
  line-height: 40px;
  .center {
    flex: 1;
  }
  .left{
    margin-left: 10px;
  }
}

 .topSection {
    width: 100%;
    height: 50px;
    line-height: 45px;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    font-size: 18px;
    color: #333;
    display: flex;
    align-items: center;
     div {
      flex: 1;
      text-align: center;
      &.selects {
        background: #eee;
        font-weight: 700;
      }
    }
 }

.container {
  height: 220px;
  .mvlists {
    width: 100%;
      .imgs {
        width: 100%;
        height: 211px;
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
        span {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          margin: auto;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          color: #fff;
          font-size: 24px;
        }
        video {
          height: 211px;
          margin: 0 auto;
          display: block;
          width: 375px;
        }
      }
    }
}

.container2{
  width: 345px;
  display: block;
  padding: 15px;
  .text1{
    // letter-spacing: 2px;
    color: gray;
    span{
    width: 32px;
    height: 16px;
    border: 1px solid red;
    color: red;
    margin-right: 10px;
    }
  }
  .text2{
    color: #81A1C5;
    font-size: 14px;
    margin-top: 10px;
  }
  .text3{
    color: #999999;
    font-size: 14px;
    margin-top: 10px;
    span{
      margin-left: 30px;
    }
  }
}

.container3{
  width: 100%;
  .span1{
    font-size: 16px;
    width: 100%;
    height: 30px;
    background-color: #EEEFF0;
    color: #858586;
    line-height: 30px;
  }
  .xiangxi{
    margin-top: 10px;
    ul{
      padding-left: 6px;
      li{
        margin-top: 5px;  
        width: 98%;
        height: 66px;
        .imgs{
          float: left;
          width: 107px;
          height: 60px;
          background-color: red;
          position: relative;
          img{
            width: 100%;
            height: 100%;
          }
          span{
              position: absolute;
              right: 0;
              top: 0;
              color: white;
              font-size: 12px;
          }
        }
        .box{
          float: right;
          width: 248px;
          p{
            color: #858586;
            font-size: 14px;
          }
        }
      }
    }
  }
}
.pinglun {
  margin-top: 20px;
  width: 100%;
  .box-header{
      color: #d4473c;
      text-align: left;
      margin-bottom: 20px ;
      margin-left: 20px;
  }
  .lang {
    ul {
      color: grey;
      li {
        width: 90%;
        height: 80px;
        border-bottom: 1px solid #e3e3e3;
        position: relative;
        font-size: 10px;
        padding-bottom: 5px;
        // margin: 0 auto;
        left: 10px;
        .head {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 10px;
          left: 0px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .p1 {
          width: 60%;
          position: absolute;
          top: 8px;
          left: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          // font-weight: bold;
          color: #507daf;
          // span{
          //   position: absolute;
          // }
        }
         p{
            position: absolute;
            top: 30px;
            left: 53px;
            color: #323232;
          }
        .p2 {
          position: absolute;
          top: 55px;
          left: 50px;
          width: 150px;
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          font-size: 5px;
          .span2 {
            position: absolute;
            right: -90%;
            top: -3px;
            .red{
              color: red;
            }
          }
        }
      }
    }
  }
}

 .details {
    padding: 10px;
   
    .topList {
      height: 40px;
      line-height: 40px;
      // background: #eee;
      font-size: 16px;
      // font-weight: 700;
      color: #333;
    }
    .tuijian {
      li {
        display: flex;
        margin: 10px 0;
        box-sizing: border-box;

        img {
          width: 30%;
          // height: 60px;
          background: pink;
          border-radius: 12px;
          margin-right: 10px;
        }
        div {
          padding: 5px 0;
          box-sizing: border-box;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            &:nth-child(1) {
              display: block;
              font-size: 18px;
              color: #333;
              overflow: hidden;
              box-sizing: border-box;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &:nth-child(2) {
              font-size: 16px;
              color: #ccc;
              overflow: hidden;
              box-sizing: border-box;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }

</style>

