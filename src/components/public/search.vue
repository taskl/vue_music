<template>
  <div>
    <div class="header">
      <span class="iconfont icon-arrow-left-bold" @click="run"></span>
      <input
        class="ipt"
        type="text"
        placeholder="搜索歌曲、歌手"
        @keyup.enter="btneunf(), getvnfd(text), (tack = true)"
        v-model="text"
        style=“outline:none;”
      />
      <div
        class="del"
        v-show="tack"
        @click="(tack = false), (text = '')"
      >
        ×
      </div>
    </div>

    <div class="best" v-show="tack">
      <p>最佳推荐</p>
      <dl class="musicList" v-for="(item, index) in searchdgn" :key="index">
        <dd>
          <div class="info" @click="setId(item.id)">
            <h2>{{ searchdgn[index].name }}</h2>
            <h3>
              <span>{{ searchdgn[index].ar[0].name }}&nbsp;</span>
            </h3>
          </div>
        </dd>
      </dl>
    </div>

    <div class="container" v-show="!tack">
      <span>热门搜索</span>
      <ul>
        <li v-for="(item, index) in lists" :key="index">
          {{ lists[index].first }}
        </li>
      </ul>
    </div>

    <div class="box" v-show="!tack">
      <div class="box1">
        <span>搜索历史</span>
        <i @click="clear()"></i>
      </div>

      <div class="box2">
        <ul>
          <li v-for="(item, index) in newlists" :key="index">
            {{ item
            }}<i class="iconfont icon-shanchu" @click="del(item.id)"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 搜索
import { getSearchHot, getCloudsearch } from "../../api/search";
export default {
  data() {
    return {
      lists: null,
      searchdgn: null,
      newlists: [],
      id: null,
      text: null,
      tack: false,
    };
  },
  methods: {
    run() {
      this.$router.push({ path: "/recommend" });
    },
    btneunf() {
      this.newlists.push(this.text);
    },
    del(id) {
      let index = this.newlists.findIndex((item) => item.id == id);
      this.newlists.splice(index, 1);
    },
    clear() {
      this.newlists = [];
    },
    setId(id) {
      console.log(id);
      this.$emit("get-player-id", id);
    },
    getSearchHotFun() {
      getSearchHot().then((data) => {
        if (data.code == 200) {
          // console.log(data);
          this.lists = data.result.hots;
          console.log(data.result.hots);
        }
      });
    },
    getvnfd(keywords) {
      getCloudsearch({ keywords }).then((data) => {
        if (data.code == 200) {
          console.log(data);
          this.searchdgn = data.result.songs;
          console.log(data.result.songs[0].al.name);
          console.log(data.result.songs[0].ar[0].name);
        }
      });
    },
  },
  created() {
    this.getSearchHotFun();
    this.getvnfd();
  },
};
</script>


<style lang="less">
.header {
  width: 100%;
  height: 60px;
  // background-color: #d4473c;
  position: relative;
  border-bottom: solid 1px #ebecec;

  .del {
    float: right;
    font-size: 28px;
    position: fixed;
    position: absolute;
    top: 15px;
    right: 30px;
  }
  span {
    display: block;
    width: 28px;
    height: 28px;
    font-size: 18px;
    color: #ebecec;
    position: absolute;
    top: 20px;
    left: 5px;
  }
  .ipt {
    width: 80%;
    height: 30px;
    font-size: 12px;
    position: absolute;
    top: 15px;
    left: 30px;
    background: #ebecec;
    border: solid 1px #ebecec;
    // border: 1px solid transparent;
    // border-bottom: 1px solid #e19994;
    padding: 0 15px;
    border-radius: 30px;
  }
}
.container {
  width: 100%;
  height: 250px;
  position: relative;
  span {
    color: #b3b4b5;
    font-size: 14px;
    position: absolute;
    top: 15px;
    left: 15px;
  }
  ul {
    position: absolute;
    top: 40px;
    left: 15px;
    display: flex;
    flex-wrap: wrap;
    width: 350px;
    li {
      margin: 7px 0 0 7px;
      border: 1px solid #e1e1e2;
      border-radius: 30px;
      padding: 8px;
    }
  }
}

.box {
  width: 95%;
  margin: 0 auto;
  .box1 {
    width: 95%;
    height: 18px;
    span {
      float: left;
      font-size: 14px;
      color: #b3b4b5;
    }
    i {
      float: right;
    }
  }
  .box2 {
    ul {
      li {
        width: 90%;
        height: 18px;
        float: left;
        margin-top: 10px;
        margin-left: 19px;
        i {
          float: right;
        }
      }
    }
  }
}
.best {
  position: relative;
  p {
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 10px;
    color: red;
  }
  .musicList {
    background-color: #fff;
    width: 100%;
    border-radius: 7px;
    position: relative;
    top: -7px;
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
        margin-left: 5px;
        h2 {
          font-size: 16px;
          color: #1b1c1c;
          margin-top: 10px;
          font-weight: bold;
        }
        h3 {
          font-size: 12px;
          color: #929393;
          margin-top: 5px;
          // margin-left: 20px;
        }
      }
    }
  }
}
</style>

