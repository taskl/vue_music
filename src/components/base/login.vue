<template>
  <div class="login">
    <h1>欢迎登录</h1>
    <div class="form">
      <div class="item">
        <span class="iconfont icon-search"></span>
        <input type="text" placeholder="手机号码" v-model="phone" />
      </div>
      <div class="item">
        <span class="iconfont icon-search"></span>
        <input type="password" placeholder="密码" v-model="password" />
      </div>
      <div class="item">
        <span class="iconfont icon-search"></span>
        <input type="text" placeholder="验证码" v-model="code"/>
        <button class="getCode" @click="getCode">发送</button>
      </div>
      <div class="item">
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
    <div class="grgd">
      <span  @click="$router.push('/recommend')">游客登录</span>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";
import {
  getCaptcha,
  getCaptchaVerify,
  getLoginCellphone,
} from "../../api/base";
// import {getCaptcha} from "../../api/base"
export default {
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      nickname: "",
      myId: "",
      img: "",
    };
  },
  methods: {
    getCode() {
      // 1.验证手机号
      let reg =
        /^(19[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!reg.test(this.phone)) {
        Notify({ type: "warning", message: "请输入正确手机号码" });
        return;
      }

      // 请求验证码接口
      getCaptcha({ phone: this.phone }).then((data) => {
        console.log(data);
        if (data.data) {
          Notify({ type: "success", message: "验证码发送成功" });
        } else {
          Notify({ type: "danger", message: "验证码发送失败" });
        }
      });
    },
    submit() {
      // window.localStorage.setItem("login","true");
      // // 个人中心判断是否登录
      // // this.$router.push("/userInfo")
      // // 必须登录才能使用
      // if(window.localStorage.getItem("guidePage")){
      //     this.$router.push("/recommend")
      // }else{
      //     this.$router.push("/guidePage")
      // }

      let reg = /^[0-9]{4}$/;
      if (!reg.test(this.code)) {
        Notify({ type: "warning", message: "请输入正确验证码" });
        return;
      }

      getCaptchaVerify({
        phone: this.phone,
        captcha: this.code,
      })
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            getLoginCellphone({
              password: this.password,
              phone: this.phone,
            }).then((info) => {
              console.log(info);

              // this.nickname = info.account.userName;
              // this.myId = info.account.id;
              // this.img = info.profile.avatarUrl;

              // console.log("name", this.nickname);
              // console.log("myid", this.myId);
              // console.log("img", this.img);

              // this.$emit("getPersonMages", {
              //   nickname: this.nickname,
              //   myId: this.myId,
              //   img: this.img,
              // });
              Notify({ type: "success", message: "登录成功" });
              window.localStorage.setItem("uid",info.account.id)

              window.localStorage.setItem("login", info.cookie);
              window.localStorage.setItem("token", info.token);
              // 个人中心判断是否登录
              // this.$router.push("/userInfo")
              // 必须登录才能使用
              if (window.localStorage.getItem("guidePage")) {
                this.$router.push("/recommend");
              } else {
                this.$router.push("/guidePage");
              }
            });
          } else {
            Notify({ type: "danger", message: "登录失败" });
          }
        })
        .catch(function () {
          Notify({ type: "danger", message: "登录失败" });
        });
    },
  },
};
</script>

<style lang="less" >
.login {
  background-color: #d4473c;
  width: 100%;
  height: 667px;
  color: #fff;
}
h1 {
  font-size: 48px;
  text-align: center;
  height: 48px;
  padding: 150px 0 40px 0;
}
.form {
  .item {
    width: 76%;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    background-color: #f47378;
    border-radius: 30px;
    margin-bottom: 12px;
    input {
      background-color: transparent;
      border: 0px;
      outline: none;
      text-indent: 0.5em;
      font-size: 14px;
      color: #fff;
    }
    span {
      font-size: 20px;
      margin-left: 10px;
      display: inline-block;
      vertical-align: middle;
    }
    .getCode {
      border: 1px solid #fff;
      height: 20px;
      line-height: 20px;
      width: 50px;
      border-radius: 20px;
      font-size: 12px;
      color: #808080;
      float: right;
      margin: 5px;
    }
    .submit {
      font-size: 15px;
      background-color: #fff;
      text-align: center;
      color: #d4473c;
      border-radius: 15px;
    }
  }
}
.grgd{
  width: 100%;
  height: 80px;
  // background: #ffff;
  position: relative;
  span{
    padding: 10px;
    border: 1px solid;
    border-radius: 15px;
    position: absolute;
    top: 10px;
    left: 140px;
    // color: #0000;
  }
}
</style>