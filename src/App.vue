<template>
  <div id="app">
    <div class="main">
      <!-- 顶部组件 -->
      <header-nav
        v-if="$route.meta.headerNav"
        @gotoPerson="gotoPerson"
      ></header-nav>

      <!-- 路由视图 -->
      <router-view
        @get-player-id="getPlayerId"
        @get-play-all-id="getPlayAllId"
        @getPersonMages="getPersonMages"
      ></router-view>

      <!-- 播放音乐 -->
      <player
        @get-player-id="getPlayerId"
        v-show="playerId"
        :player-id="playerId"
        :list-id="listId"
      ></player>
      <personer
        :left="left"
        @exit="gotoPerson"
        :img="img"
        :nickname="nickname"
      ></personer>
    </div>
  </div>
</template>

<script>
import headerNav from "./components/base/headerNav.vue";
import player from "./components/base/player.vue";
import personer from "./components/base/person.vue";

export default {
  data() {
    return {
      playerId: null,
      listId: null,
      left: null,
      nickname: "",
      myId: "",
      img: "",
    };
  },
  components: {
    headerNav,
    player,
    personer,
  },
  created() {
    console.log(this);
  },
  methods: {
    getPersonMages(obj) {
      this.nickname = obj.nickname;
      this.myId = obj.myId;
      this.img = obj.img;
      console.log("name",this.nickname);
      console.log("myid",this.myId);
      console.log("img",this.img);
    },
    getPlayerId(id) {
      console.log("歌曲id：", id);
      this.playerId = id;
    },
    gotoPerson(left) {
      this.left = left;
    },
    getPlayAllId(id) {
      this.listId = id;
    },
  },
};
</script>

<style lang="less">
@import "./assets/css/base.css";
</style>