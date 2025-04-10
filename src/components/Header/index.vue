<script setup lang="ts">
import { onMounted, computed, ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import RightSide from "./components/RightSide.vue";
import useHeader from "../../hooks/header"

const { scrollTopNum } = useHeader();

defineProps<{ msg: string }>();


// 监听可视窗口距离顶部的位置
let scrollTopFlag = ref(false);
watch(scrollTopNum, (newVal, oldVal) => {
  if (newVal > 200) scrollTopFlag.value = true;
  else scrollTopFlag.value = false;
});
</script>

<template>
  <div class="container-fluid" :class="[scrollTopFlag ? 'fixed-scroll' : '']">
    <div class="container">
      <div class="row">
        <div class="p-0 col-lg-2 col-md-2 col-sm-2 col-2 logo-content">
          <img src="../../assets/image/logo.png" alt="图跑了" />
        </div>

        <nav class="p-0 col-lg-6 col-md-6 col-sm-5 col-5 nav-content">
          <ul style="list-style: none;" class="d-flex justify-content-end align-items-center">
            <!-- @click="onRoute('/')" -->
            <li>
              <a href="#" class="nav-txt">
              </a>
            </li>
          </ul>
        </nav>

        <div class="p-0 col-lg-4 col-md-4 col-sm-5 col-5 actions-content">
          <keep-alive>
            <RightSide></RightSide>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fixed-scroll {
  // 方案一
  // box-shadow: none;
  // transform: translateY(-80px);
  // transition: transform 0.3s, background-color 0.3s ease-out;

  // 方案二
  margin-top: 0px !important;
  // background-color: rgb(15, 10, 46,.6) !important;
  background-color: rgb(0, 0, 0, .08) !important;
  // background-color: rgb(255, 255, 255,.08) !important;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  // transition: background-color .2s .2s linear;
  // transition: margin-top .4s 0s linear;
  // transition: background-color .2s 0s linear;

  .logo-content img {
    width: 100px;
  }

  .nav-txt,
  .icon-box {
    text-shadow: 2px 1px 2px rgba(255, 255, 255, .3);
  }
}

.container-fluid {
  width: 100vw;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  margin-top: 10px;
  transition: all 0.2s 0s linear;
}

.logo-content {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 130px;
    filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
    transition: all 0.2s 0s linear;
  }

  .logo-txt {
    font-weight: bold;
    line-height: 80px;
    margin-left: 14px;

    span {
      margin: 0 2px;
    }
  }
}

.nav-content {

  ul {
    li {
      position: relative;
      height: 80px;

      &:hover {
        .dropdown {
          display: block;
        }
      }

      .nav-txt {
        display: inline-block;
        line-height: 80px;
        margin: 0 20px;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        text-shadow: 2px 1px 2px rgba(0, 0, 0, .3);
      }

      .act-menu {
        position: relative;
        padding-right: 16px;

        &::after {
          content: "\eb06";
          position: absolute;
          top: 50%;
          right: 0%;
          transform: translateY(-50%);
          font-size: 18px;
        }
      }

      .dropdown {
        position: absolute;
        top: 70px;
        left: 0;
        z-index: 999;
        display: none;
        min-width: 160px;
        padding: 10px;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 10px;

        &::before {
          content: "";
          position: absolute;
          top: -7px;
          left: 20%;
          margin-left: -8px;
          content: " ";
          width: 14px;
          height: 14px;
          background-color: #fff;
          transform: rotate(45deg);
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: transparent;
          border-right: transparent;
        }

        .menu {
          display: block;
          font-size: 14px;
          padding: 6px 0px;
          margin: 8px;
          color: #34495e;
          border-radius: 4px;
          transition: all 0.2s linear 0s;

          &:hover {
            transform: translateX(10px);
          }
        }
      }
    }
  }
}

// 右边区域
.actions-content {}
</style>
