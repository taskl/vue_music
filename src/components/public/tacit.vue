<template>
  <div>
    <div class="topheader">
      <div class="img">
        <img :src="img" alt="" />
      </div>
      <div class="title">
        {{ name }}
          <p
              ><i class="iconfont icon-erji"></i>
              {{ num | playCountNum }}</p
            >
      </div>
      <div class="button" @click="run()">
        <span class="iconfont icon-arrow-left-bold"></span>
        歌单
      </div>
    </div>

    <dl class="musicList">
      <dt>
        <i class="iconfont icon-bofang"></i> 播放全部
        <span>(共{{ commentCount }}首)</span>
        <i :class="['iconfont',' icon-xin1','xin',{red:nformation}]" @click="nformation =!nformation"></i>
      </dt>
      <dd v-for="(item, index) in playlists" :key="index"  @click='setId(item.id)'> 
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.name}}</h2>
          <h3>
            <span v-for="(key, index) in item.ar" :key="index"
              >{{ key.name }}&nbsp;</span
            >
          </h3>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { getPlaylist } from "../../api/tuijian";
export default {
  data() {
    return {
      playlists: null,
      id: null,
      name: null,
      img: null,
      num: null,
      commentCount:null,
      nformation:false,
    };
  },
  methods: {
    run() {
      this.$router.push({ path: "/recommend" });
    },
     setId(id){
         console.log(id);
                this.$emit("get-player-id",id);
            },
    getPlaylistFun() {
      let id = this.id;
      getPlaylist({ id }).then((data) => {
        if (data.code == 200) {
          this.playlists = data.playlist.tracks;
          this.num = data.playlist.playCount;
          this.name = data.playlist.name;
          this.img = data.playlist.coverImgUrl;
          this.commentCount =  this.playlists.length;
          console.log(data);
        }
      });
    },
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.num = this.$route.query.num;
    console.log(this.num);
    this.getPlaylistFun();
  },
  filters: {
    playCountNum(value) {
      let w = value > 10000 ? value / 10000 : value;
      let y = w > 10000 ? parseInt(w / 10000) + "亿" : parseInt(w) + "万";
      return y;
    },
  },
};
</script>

<style lang="less" scoped>
.topheader {
  width: 100%;
  height: 270px;
  position: relative;

  .img {
    background-color: aqua;
    width: 100%;
    height: 270px;
    position: relative;
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      width: 100%;
    }
  }
  .title {
    font-size: 18px;
    position: absolute;
    left: 18px;
    bottom: 18px;
    color: #fff;
    p {
          font-size: 10px;
          color: #fff;
          i {
            font-size: 15px;
            vertical-align: middle;
          }
        }
  }
  .button {
    font-size: 18px;
    position: absolute;
    left: 12px;
    top: 12px;
    color: #fff;
  }
}

.musicList {
  background-color: #fff;
  width: 100%;
  border-radius: 7px;
  position: relative;
  top: -7px;
  dt {
    height: 36px;
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
     .red{
        color: red;
      }
    .xin{
      float: right;
     
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
</style>