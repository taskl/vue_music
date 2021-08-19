<template>
  <div>
    <div class="header">
      <div
        class="left iconfont icon-shangyiji"
        @click="$router.push('/recommend')"
      ></div>
      <div class="center">最新专辑</div>
    </div>

    <div class="container">
      <div class="box">
        <div class="box1">
          <img src="../../assets/img/1.png" alt="" />
        </div>
        <div class="box2">
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="singer">
        <p>专辑名:{{ songs }}</p>
        <p>歌手:{{ name }}</p>
      </div>
    </div>

    <dl class="musicList">
      <dt>
        <i class="iconfont icon-bofang"></i> 播放全部
        <span>(共{{ commentCount }}首)</span>
        <!-- <div class="count">收藏(9980)次</div> -->
      </dt>
      <dd v-for="(item, index) in lists" :key="index" @click="setId(item.id)">
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.name }}</h2>
          <h3>
            <span>{{ item.ar[0].name }}&nbsp;</span>
          </h3>
        </div>
      </dd>
    </dl>

    <div class="jieshao">
      <h1>专辑介绍:</h1>
      <p class="jieshao11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ Description }}</p>
      <div class="more" v-if="!isShowAll && isRoll" @click="toDown">
        展开<i class="iconfont icon-down"></i>
      </div>
      <div class="more" v-if="!isShowAll && !isRoll" @click="toUp">
        收起<i class="iconfont icon-up"></i>
      </div>
    </div>

    <div class="pinglun">
      <h1>精彩评论:</h1>
      <div class="lang">
        <ul>
          <li v-for="(item, index) in userLists" :key="index">
            <div class="head"><img :src="item.user.avatarUrl" alt="" /></div>
            <p class="p1">{{ item.user.nickname }}:{{ item.content }}</p>
            <p class="p2">
              <span class="span1">{{ getDateStr(item.time) }}</span>
              <span class="span2" @click.stop="getreSourceLikeFn(index)"
                ><i :class="['iconfont', 'icon-zan2' , {red:item.liked}]"  @click="toggle_like(item.liked,index)"  ></i>({{ item.likedCount }}) |
                <span>回复</span></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="pinglun">
      <h1>热门评论:</h1>
      <div class="lang">
        <ul>
          <li v-for="(item, index) in userHotLists" :key="index">
            <div class="head"><img :src="item.user.avatarUrl" alt="" /></div>
            <p class="p1">{{ item.user.nickname }}:{{ item.content }}</p>
            <p class="p2">
              <span class="span1">{{ getDateStr(item.time) }}</span>
              <span class="span2"
                ><i :class="['iconfont', 'icon-zan2' , {red:item.liked}]" @click="toggle_like1(item.liked,index)"></i>({{ item.likedCount }}) |
                <span>回复</span></span
              >
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlbum, getCommentAlbum } from "../../api/zhuanji";

export default {
  data() {
    return {
      lists: null,
      playlists: null,
      id: null,
      img: null,
      songs: null,
      name: null,
      userLists: null,
      userHotLists: null,
      commentCount: null,
      isShowAll: true,
      isRoll: true,
      playListDetail: {},
      Description: null,
      liked: false,
     
    };
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getBlbumFun();
    this.getCommentAlbumFun();
  },

  methods: {
    toggle_like1(temp,index){   
        // console.log(temp);
        if(!temp){
          this.userHotLists[index].liked = true;
          this.userHotLists[index].likedCount +=1;
        }else{
          this.userHotLists[index].liked = false;
          this.userHotLists[index].likedCount -=1;
        }
      },
      toggle_like(temp,index){   
        // console.log(temp);
        if(!temp){
          this.userLists[index].liked = true;
          this.userLists[index].likedCount +=1;
        }else{
          this.userLists[index].liked = false;
          this.userLists[index].likedCount -=1;
        }
      },
    getBlbumFun() {
      let id = this.id;
      getBlbum({ id }).then((data) => {
        if (data.code == 200) {
          this.lists = data.songs;
          // console.log(data.album);
          //   console.log(data.album.artist.name);
          this.img = data.album.artist.picUrl;
          this.songs = data.album.name;
          this.name = data.album.artist.name;
          this.commentCount = this.lists.length;
          this.Description = data.album.description;
          this.playListDetail = data.album;
        }
      });
    },
    getCommentAlbumFun() {
      let id = this.id;
      getCommentAlbum({ id }).then((data) => {
        if (data.code == 200) {
          console.log(data);
          this.userLists = data.comments;
          this.userHotLists = data.hotComments;
        }
      });
    },
    toDown() {
      this.Description = this.playListDetail.description;
      this.isRoll = false;
    },
    // 点击按钮收起歌单介绍
    toUp() {
      this.Description = this.playListDetail.description.slice(0, 200) + "...";
      this.isRoll = true;
    },

    getDateStr(seconds) {
      let date = new Date(seconds);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let currentTime =
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      return currentTime;
    },
    setId(id) {
      console.log(id);
      this.$emit("get-player-id", id);
    },
    getreSourceLikeFn(index) {
      this.flag2 = !this.flag2;
      if (this.flag2) {
        this.num[index] += 1;
        this.index2 = index;
      } else {
        this.num[index] -= 1;
        this.index2 = null;
      }
    },
  },
  watch: {
    "playListDetail.description": function () {
      if (this.playListDetail.description.length > 200) {
        this.Description = this.playListDetail.description.substr(0, 200);
        this.isShowAll = false;
      } else {
        this.isShowAll = true;
      }
    },
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
    font-weight: bold;
  }
  .left {
    margin-left: 10px;
  }
}

.container {
  width: 100%;
  position: relative;
  .box {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 10px;
    margin-left: 10px;
    .box1 {
      width: 150px;
      height: 150px;
      position: absolute;
      top: 0;
      left: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .box2 {
      width: 130px;
      height: 150px;
      position: absolute;
      top: 0px;
      left: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .singer {
    float: right;
    text-align: center;
    line-height: 30px;
    padding: 50px;
    color: rgb(161, 109, 109);
  }
}
.musicList {
  background-color: #fff;
  width: 100%;
  border-radius: 7px;
  position: relative;
  top: -40px;
  dt {
    height: 40px;
    line-height: 36px;
    font-size: 16px;
    color: #454747;
    border-bottom: 1px solid #e3e3e3;
    span {
      font-size: 14px;
      color: #797b7a;
    }
    i {
      width: 44px;
      text-align: center;
      display: inline-block;
    }
    .count {
      float: right;
      border: 1px solid #000;
      border-radius: 20px;
      background-color: #9192ef;
      color: #e3e3e3;
    }
  }
  dd {
    border-bottom: 1px solid #e3e3e3;
    height: 53px;
    display: flex;
    h1 {
      flex: 0 0 44px;
      line-height: 53px;
      text-align: center;
      font-size: 16px;
      color: #6d6e6e;
    }
    .info {
      flex: 1;
      h2 {
        font-size: 16px;
        color: #1b1c1c;
        margin-top: 10px;
      }
      h3 {
        font-size: 12px;
        color: #929393;
      }
    }
  }
}
.jieshao {
  // margin-bottom: 20px;
  // margin-top: 10px;
  // width: 90%;
  // margin: auto;
  word-wrap: break-word;
  position: relative;
  .more {
    position: absolute;
    bottom: -20px;
    right: 0px;
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    color: rgb(26, 76, 212);
  }
  h1 {
    // font-weight: bold;
    margin-left: 10px;
  }
  .jieshao11 {
    margin-top: 10px;
    color: rgb(119, 76, 76);
    margin: 10px 10px;
    font-size: 14px;
  }
}
.pinglun {
  margin-top: 20px;
  width: 100%;
  h1 {
    color: #d4473c;
    margin-left: 10px;
  }
  .lang {
    ul {
      li {
        width: 100%;
        height: 60px;
        border-top: 1px solid #e3e3e3;
        position: relative;

        .head {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 10px;
          left: 10px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .p1 {
          width: 60%;
          position: absolute;
          top: 8px;
          left: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .p2 {
          position: absolute;
          width: 150px;
          top: 33px;
          left: 60px;
          justify-content: space-between;
          .span2 {
            position: absolute;
            right: -100%;
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
</style>

