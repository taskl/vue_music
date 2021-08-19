<template>
  <div class="bigbox">
    <div class="bgcolor" :style="{ left: left }">
      <div class="top"  @click="editMage">
        <img :src="avatarUrl" alt="" v-if="avatarUrl"  />
        <div class="username">昵称:{{ nickname }}</div>
      </div>
      <div class="bottomImg">
        <ul class="mages">
          <li>
            <span class="iconfont icon-lingdang"></span>
            <p >我的消息</p>
          </li>
          <li>
            <span class="iconfont icon-huiyuan"></span>
            <p @click="editMage">我的收藏</p>
          </li>
          <li>
            <span class="iconfont icon-shangcheng"></span>
            <p>商城</p>
          </li>
          <li>
            <span class="iconfont icon-bofangye-gengduo-mianliuliang"></span>
            <p>在线听歌免流量</p>
          </li>
        </ul>
        <div class="grayline"></div>
        <ul class="myfriends">
          <li>
            <span class="iconfont icon-wodehaoyou"></span>
            <p>我的好友</p>
          </li>
          <li>
            <span class="iconfont icon-fujinderen"></span>
            <p>附近的人</p>
          </li>
        </ul>
        <div class="grayline"></div>
        <ul class="other">
          <li>
            <span class="iconfont icon-pifu"></span>
            <p>我的订单</p>
          </li>
          <li>
            <span class="iconfont icon-tinggeshiqu"></span>
            <p>个性换肤</p>
          </li>
          <li>
            <span class="iconfont icon-shizhong"></span>
            <p>我的客服</p>
          </li>
          <li>
            <span class="iconfont icon-saoyisao"></span>
            <p>分享网易云音乐</p>
          </li>
          <li>
            <span class="iconfont icon-bofangye-gengduo-mianliuliang"></span>
            <p>关于</p>
          </li>
        </ul>
        <!-- <div class="person_bottom">
          <div><span class="iconfont icon-yejian"></span> 夜间模式</div>
          <div><span class="iconfont icon-shezhi"></span> 设置</div> -->
          <!-- <span class="gvyd">个人中心</span>  -->
           <div class="gvyd" @click="$router.push('/login')"> 设置</div>
          <div @click="exit" class="rtry">
            <!-- <span>个人中心</span>  -->
            <button @click="btn">退出登入</button>
          </div>
        <!-- </div> -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from "../../api/base.js";

export default {
  props: ["left", "img", ],
  data() {
    return {
      leftoo: null,
      avatarUrl: [],
      nickname: null,
      bgimg: null,
    };
  },
  methods: {
    exit() {
      this.leftoo = "-100%";
      this.$emit("exit", this.leftoo);
    },
    btn(){
           // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
             window.localStorage.clear();
        
              this.$router.push('/login')
    },
    getUserDetailFn(id) {
      getUserDetail({ uid: id }).then((data) => {
        console.log("用户账号信息", data);
        this.avatarUrl = data.profile.avatarUrl;
        this.nickname = data.profile.nickname;
        this.bgimg = data.profile.backgroundUrl;
        // console.log("用户账号信息id", data.account.id);
      });
    },
    editMage() {
      this.leftoo = "-100%";
      this.$emit("exit", this.leftoo);
      this.$router.push("/editMages");
      // this.$emit("exit", { left: this.leftoo, show: this.show });
    },
  },
   created() {
    this.getUserDetailFn(window.localStorage.getItem("uid"));
  },
};
</script>

<style lang="less" scoped>
// .bigbox{
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background-color: gray;
// }
.bgcolor {
  width: 100%;
  background-color: #eee;
  position: fixed;
  top: 0px;
  left: -100%;
  z-index: 999;
  color: #4e4c4f;
  transition: left 0.5s;
  .top {
    width: 95%;
    height: 140px;
    // background: linear-gradient(to right, #070707, #bdbdbd);
    background: #fff;
    border-radius: 15px;
    position: relative;
    line-height: 160px;
    text-align: center;
    margin: 0 auto;
    img {
      width: 80px;
      height: 80px;
      background-color: pink;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
    }
    .username {
      color: #fff;
      font-size: 15px;
      margin-left: 50px;
    }
  }
  .bottomImg {
    width: 95%;
    margin: 0 auto;
     border-radius: 15px;
     background: #fff;
     margin-top: 10px;
    ul {
      padding: 0 10px;
      border-radius: 15px;
      font-weight: 400;
      li {
        width: 100%;
        height: 40px;
        // background: #ffff;
      // border-radius: 15px;
        display: flex;
        align-items: center;
        p {
          margin-left: 14px;
        }
      }
    }
  }
  .grayline {
    height: 10px;
    width: 100%;
    background-color: #f4f2f5;
  }
  .person_bottom {
    width: 100%;
    height: 60px;
    border-bottom: none;
    display: flex;
    margin-left: 10px;
    // justify-content: space-around;
    align-items: center;
    // padding: 0 10px;
    font-weight: 700;
    div {
      &:first-child {
        flex: 60%;
      }
      flex: 15%;
    }
  }
}
.rtry{
  width: 100%;
  height: 57px;
  background: #fff;
  position: relative;
  button{
    padding: 5px;
    background: #0000;
    border-radius: 15px;
    border: 1px solid;
    position: absolute;
    top: -35px;
    left: 250px;
    width: 100px;
  }
}
.gvyd{
   width: 80px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    // display: block;
    display: inline-block;
    border-radius: 15px;
    border: 1px solid;
    background: #0000;
    margin-top: 23px;
}
</style>