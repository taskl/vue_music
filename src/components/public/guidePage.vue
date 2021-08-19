<template>
  <div>
    <div class="guidePage">
      <!-- Swiper -->
      <div class="swiper-container guidePage-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div
              class="guidePageslide"
              style="
                background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F1d90edc16f3c01020c27d3183d91133a82a5731535070-4pHWdt_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630062050&t=afba3156f4504a6597b7a85728ef8625');
              "
            >
              <!-- <img src="../../assets/1.webp" alt=""> -->
              <!-- <h3>渐进式javascript框架</h3> -->
            </div>
          </div>
          <div class="swiper-slide">
            <div
              class="guidePageslide"
              style="
                background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F16473d347f692488e7af9d838a1301b43d0ced23161328-sEg5TD_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630062019&t=752715ce56252849fdd3e47f44ec0a69');
              "
            >
              <!-- <img src="../../assets/2.webp" alt=""> -->
              <!-- <h3>渐进式javascript框架</h3> -->
            </div>
          </div>
          <div class="swiper-slide">
            <div
              class="guidePageslide"
              style="
                background-image: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0187b55c4991eba801213f2640f41a.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630062019&t=baaf6af15ecf7b7b360590c20f9463d1');
              "
            >
              <!-- <img src="../../assets/3.webp" alt=""> -->
              <!-- <h3>渐进式javascript框架</h3> -->

              <button class="btn1" @click="gogo">立即进入</button>
              
            </div>
          </div>
        </div>
        <!-- Add Pagination -->
        <!-- <div class="swiper-pagination guidePage-pagination"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
// https://www.swiper.com.cn/
// $cnpm install swiper@5.3.6 -S
import Swiper from "swiper";
export default {
  mounted() {
    new Swiper(".guidePage-container", {
      pagination: {
        el: ".guidePage-pagination",
      },
    });
  },
  methods: {
    gogo() {
      this.$router.push("/");
      window.localStorage.setItem("guidePage", true);
    },
  },
};
</script>

<style lang="less" >
.swiper-container {
  position: fixed !important;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.guidePageslide {
  width: 100%;
  height: 667px;
  // text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  h3 {
    color: #595959;
  }
}
.btn1 {
  position: absolute !important;
  width: 100px;
  height: 40px;
  line-height: 40px;
  top: 320px;
  right: 120px;
  text-align: center;
//   background: linear-gradient(to right, #3b466f 0%, #54575c 40%, #464356 100%);
background-color: #d79b4f;
  outline: none;
  border-radius: 20px;
  border: 1px solid #d79b4f;
  color: #2d3e78;
//   font-weight: bold;
  // z-index: 99999;
}
</style>