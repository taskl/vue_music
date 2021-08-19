<template>
  <div class="bigbox">
    <div class="magestop">
      <span class="iconfont icon-arrow-left-bold" @click="retn"></span>
      <div class="titles">
        <img :src="avatarUrl" alt="" />
        <div class="level">
          <div>{{ nickname }}</div>
          <div>LV{{ level }}</div>
        </div>
      </div>
    </div>
    <ul class="centers">
      <li :class="{ reds: type == 1 }" @click="mainshow">主页</li>
      <li :class="{ reds: type == 2 }" @click="doningshow">动态</li>
      <li :class="{ reds: type == 3 }" @click="bokeshow">博客</li>
    </ul>
    <!-- 主页 -->
    <div class="mainbox" v-show="type == 1">
      <div>
        <p class="base">
          <span>基本信息</span>
          <span>编辑资料</span>
        </p>
        <div class="col">
          <p>
            ID：<span>{{ id }}</span>
          </p>
          <p>乐龄：{{ createDays }}天</p>
          <p>地区：广东省</p>
        </div>
        <div class="hoby">
          <p>粉丝勋章</p>
          <p>暂未获得粉丝勋章~~~</p>
        </div>
        <div class="hoby">
          <p>现场成就</p>
          <p>暂未获得现场成就~</p>
        </div>
      </div>
    </div>
    <!-- 动态 -->
    <div class="doningbox" v-show="type == 2">
      <div>
        <!-- <div class="imags">
          <img :src="avatarUrl" alt="" />
          <span>{{nickname}}</span>
        </div> -->
        <div class="hott">
          <p>收藏歌单</p>
          <div
            class="vhot"
            v-for="(item, index) in userList"
            :key="index"
            @click="playlist(item.id)"
          >
            <img :src="item.coverImgUrl" alt=""/>
            <div class="singerhot">
              <p>{{ item.name }}</p>
              <p>
                <span>{{ item.description }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="hott">
          <p>收藏歌曲</p>
          <div
            class="vhot"
            v-for="(item, index) in songsList"
            :key="index"
            @click="songPlay(item.id)"
          >
            <img :src="item.coverImgUrl" alt="" />
            <div class="singerhot">
              <p class="names">{{ item.name }}</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- 博客 -->
    <div class="bokebox" v-show="type == 3">
      <div>暂无</div>
    </div>
  </div>
</template>

<script>
import { getUserDetail, getUserPlaylist } from "../../api/base.js";

export default {
  data() {
    return {
      type: 1,
      avatarUrl: null,
      nickname: null,
      id: null,
      level: null,
      createDays: null,
      userList: [],
      songsList: [],
    };
  },
  methods: {
    // 登录后调用此接口 ,可获取用户账号信息
    getUserDetailFn(id) {
      getUserDetail({ uid: id }).then((data) => {
        // console.log("用户账号信息", data);
        this.avatarUrl = data.profile.avatarUrl;
        this.nickname = data.profile.nickname;
        this.level = data.level;
        this.id = data.profile.userId;
        this.createDays = data.createDays;
      });
    },
    // 可以获取用户歌单
    getUserPlaylistFn(id) {
      getUserPlaylist({ uid: id }).then((data) => {
        data.playlist.forEach((item) => {
          if (item.ordered) {
            this.userList.push(item);
          } else {
            this.songsList.push(item);
          }
        });
        // this.userList = data.playlist;
        console.log("用户歌单", this.songsList);
        // console.log("用户歌单", this.userList);
      });
    },
    // 主页
    mainshow() {
      this.type = 1;
    },
    // 动态
    doningshow() {
      this.type = 2;
    },
    // 博客
    bokeshow() {
      this.type = 3;
    },
    // 返回
    retn() {
      this.$router.push("/recommend");
    },
    // 歌单跳转
    playlist(id) {
      this.$router.push({ path: "/rank/ranklist", query: { id } });
    },
    // 歌曲播放
    // songPlay(id) {
    //   this.$emit("get-player-id", id);
    // },
  },
  created() {
    this.getUserDetailFn(window.localStorage.getItem("uid"));
    this.getUserPlaylistFn(window.localStorage.getItem("uid"));
  },
};
</script>

<style lang="less" scoped>
.magestop {
  height: 220px;
  background: url("../../assets/img/bg.png") no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 0px 0px #fff;
  color: #fff;
  position: relative;
  .icon-arrow-left-bold {
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    font-size: 20px;
    color: #fff;
    padding: 10px;
  }
  .titles {
    position: absolute;
    top: 50%;
    left: 60px;
    display: flex;
    transform: translateY(-50%);
    .level {
      padding: 5px 0;
      box-sizing: border-box;
    }
    img {
      width: 80px;
      height: 80px;
      background-color: pink;
      border-radius: 50%;
      box-shadow: 0px 0px 15px 10px pink;
      margin-right: 20px;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
.bigbox {
  position: relative;
  .centers {
    width: 90%;
    height: 60px;
    background-color: #f3f3f3;
    border-radius: 12px;
    position: absolute;
    top: 192px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
    }
    .reds {
      color: #d4473c;
      font-size: 18px;
      font-weight: 700;
    }
  }
}
.mainbox {
  padding: 48px 10px 0;
  background: #fff;
  .base {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      color: #000;
      font-weight: 700;
      &:nth-child(2) {
        font-size: 14px;
        color: #333;
        font-weight: normal;
      }
    }
  }
}
.col {
  color: #555;
  font-size: 14px;
  p {
    padding: 10px 0;
  }
}
.hoby {
  p {
    font-size: 16px;
    color: #000;
    font-weight: 700;
    padding: 10px 0;
    box-sizing: border-box;
    &:nth-child(2) {
      color: #555;
      font-size: 14px;
      font-weight: normal;
    }
  }
}
.doningbox {
  padding: 48px 10px 0;
  background: #fff;
  .imags {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;

    img {
      width: 40px;
      height: 40px;
      background: pink;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .hott {
    p {
      height: 60px;
      color: #000;
      font-size: 16px;
      padding: 10px 0;
      font-weight: 700;
      box-sizing: border-box;
    }
    .vhot {
      height: 60px;
      display: flex;
      box-sizing: border-box;
      margin-bottom: 10px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        background: pink;
        margin-right: 20px;
      }
      .singerhot {
        overflow: hidden;

        box-sizing: border-box;
        .names {
          margin-top: 16px;
        }
        p {
          height: auto;
          font-weight: normal;
          color: #333;
          padding: 4px 0;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
.bokebox {
  padding: 48px 10px 0;
  background: #fff;
  div {
    color: #333;
    text-align: center;
    margin-top: 120px;
  }
}
</style>