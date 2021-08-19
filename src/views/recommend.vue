<template>
  <div>
    <div class="banner">
      <div class="imgs">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in imgs" :key="index">
            <img :src="item.pic" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="remLists">
      <h4 class="title">推荐歌单</h4>
      <div class="content">
        <ul>
          <li
            v-for="(item, index) in personalized"
            :key="index"
            @click="run(item)"
          >
            <div class="img">
              <img :src="item.picUrl" alt="" />
            </div>
            <span
              ><i class="iconfont icon-icon-"></i
              >{{ item.playCount | playCountNum }}</span
            >
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 中间轮播图 -->
    <div class="likelist">
      <div class="title">为你推荐</div>
      <div class="content" ref="like">
        <ul>
          <li v-for="(item, index) in likelist" :key="index">
            <div class="img" @click="setId(item.id)">
              <img :src="item.picUrl" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="movie">
      <div class="title">最新MV</div>
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="(item, index) in getMv" :key="index">
          <img :src="item.picUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div> -->

    <!-- <div class="newCD">
      <div class="title">最新专辑</div>
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in getNewCD"
          :key="index"
          @click="$router.push({ path: '/zhuanji', query: { id: item.id } })"
        >
          <img :src="item.blurPicUrl" alt="" />
          <span>{{ item.name }}</span>
        </van-swipe-item>
      </van-swipe>
    </div> -->

    <!-- 最新音乐 -->
    <div class="latestMusic">
      <h4>最新音乐</h4>
      <div class="musicsort">
        <ul>
          <li
            v-for="(item, index) in latestMusic"
            :key="index"
            @click="setId(item.id)"
          >
            <div class="sortleft">
              <div>
                {{ item.name }} <span>{{ item.song.alias[0] }}</span>
              </div>
              <div>
                {{ item.song.artists[0].name }}- <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="sortright">
              <span class="iconfont icon-bofang"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  thelatestMusic,
  getMv,
  getNewCD,
} from "../api/recommend";
import BScroll from "@better-scroll/core";
import { getNewSong } from "../api/newsong.js";

export default {
  data() {
    return {
      imgs: null,
      personalized: null,
      latestMusic: null,
      likelist: [],
      getMv: "",
      // id: null,
      getNewCD:""
    };
  },
  methods: {
    getBannerFun() {
      // 轮播图数据
      getBanner().then((data) => {
        if (data.code == 200) {
          this.imgs = data.banners;
        }
      });
    },
    getNewCDFun() {
      getNewCD().then((data) => {
        if (data.code == 200) {
          this.getNewCD = data.albums;
          console.log(data.albums[0].id);
        }
      });
    },
    getMvFun() {
      getMv().then((data) => {
        if (data.code == 200) {
          this.getMv = data.result;
          // console.log(data);
        }
      });
    },
    _initScroll(dom, flagx, flagy) {
      // 右侧滚动效果初始化
      // this.rights = new BScroll(this.$refs.right, {
      this.rights = new BScroll(dom, {
        click: true, //点击触发
        probeType: 3, //深针的效果，时时获取滚动高度
        scrollX: flagx,
        scrollY: flagy,
      });
      // console.log(this.$refs.right);
    },
    run(item) {
      let num = this.playCountNum(item.playCount);
      // console.log(item);
      this.$router.push({ path: "/tacit", query: { id: item.id, num: num } });
    },
    setId(id) {
      // console.log(id);
      this.$emit("get-player-id", id);
    },
    getPersonalizedFun() {
      // 热门歌单数据
      getPersonalized().then((data) => {
        if (data.code == 200) {
          // console.log(data);
          this.personalized = data.result;
        }
      });
    },
    playCountNum(value) {
      let w = value > 10000 ? value / 10000 : value; //万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
      return y;
    },
    sonalizedFun() {
      // 热门歌单数据
      thelatestMusic().then((data) => {
        if (data.code == 200) {
          // console.log(data);
          this.latestMusic = data.result;
        }
      });
    },
  },
  created() {
     this.getMvFun();
    this.getNewCDFun();
    this.getBannerFun();
    this.getPersonalizedFun();
    this.sonalizedFun();
    getNewSong({ limit: 15 }).then((data) => {
      // console.log("喜欢的",data);
      this.likelist = data.result;
      // console.log("喜欢的", data.result);
    });
  },
  filters: {
    playCountNum(value) {
      let w = value > 10000 ? value / 10000 : value; //万计算
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万"; //亿计算
      return y;
    },
  },

  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this._initScroll(this.$refs.like, true, false);
      }, 3000);
    });
    // autoplay;{
    //   disableOnInteraction:false,
    // },
    // observer:true,
    // observeParents:true,
  },
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  text-align: center;
  position: relative;
  &::after {
    background-color: #d4473c;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    width: 100%;
    height: 132px;
    content: "";
    display: block;
  }
  .imgs {
    margin: auto;
    min-height: 100px;
    background: turquoise;
    width: 96%;
    border-radius: 5px;
    .my-swipe {
      min-height: 100px;
      img {
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}
.movie {
  .title {
    height: 60px;
    line-height: 60px;
    text-indent: 5px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    // background-color: #39a9ed;
    margin-bottom: 10px;
    // margin-left: 10px;
    img {
      width: 375.2px;
      // height: 100%;
    }
  }
}
.newCD {
  .title {
    height: 60px;
    line-height: 60px;
    text-indent: 5px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 70px;
    text-align: center;
    // background-color: #39a9ed;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
    }
    span {
      font-size: 16px;
      color: #000;
    }
  }
}

.likelist {
  // position: relative;
  .title {
    height: 60px;
    line-height: 60px;
    padding-left: 5px;
    font-size: 16px;
    color: #000;
    font-size: 700;
    font-weight: bold;
  }
  .content {
    width: 100%;
    overflow: hidden;

    ul {
      display: flex;
      flex-wrap: nowrap;
      width: 492%;
      li {
        flex: 0 0 112.5px;
        position: relative;
        margin-left: 10px;
        span {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          font-size: 12px;
          i {
            font-size: 20px;
            vertical-align: middle;
          }
        }
        .img {
          // background-color: skyblue;
          min-width: 50px;
          height: 100px;
          width: 100%;
          border-radius: 13px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        p {
          font-size: 12px;
          color: #565658;
          line-height: 15px;
          padding: 5px 5px 0;
          margin-bottom: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}

.remLists {
  .title {
    height: 60px;
    line-height: 60px;
    text-indent: 5px;
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .content {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        flex: 0 0 33%;
        position: relative;
        span {
          position: absolute;
          top: 0px;
          right: 0px;
          color: #fff;
          font-size: 10px;
          i {
            font-size: 15px;
            vertical-align: middle;
          }
        }
        .img {
          background-color: aqua;
          min-height: 50px;
          width: 100%;
          border-radius: 3px;
          img {
            width: 100%;
            border-radius: 3px;
          }
        }
        p {
          font-size: 12px;
          color: #565658;
          line-height: 15px;
          padding: 5px;
          margin-bottom: 10px;
        }
      }
    }
  }
}

.latestMusic {
  width: 100%;
  display: flex;
  flex-direction: column;
  h4 {
    position: relative;
    padding-left: 9px;
    margin-bottom: 14px;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }
  .musicsort {
    width: 90%;
    // padding-left: 10px;
    margin-left: 10px;
    ul {
      width: 100%;
      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
        .sortleft {
          width: 80%;
          display: inline-block;
          display: flex;
          flex-direction: column;
          div:nth-child(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            margin-bottom: 2px;
            font-size: 15px;
            span {
              color: #888;
            }
          }
          div:nth-child(2) {
            font-size: 9px;
            color: #888;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
          }
        }
        .sortright {
          // width: 19%;
          display: inline-block;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>