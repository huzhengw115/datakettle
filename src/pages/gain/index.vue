<template>
  <div class="index">
    <gmdata-header class="header"></gmdata-header>
    <div class="main">
      <gmdata-side-menu class="main-left" style="width: 200px;"></gmdata-side-menu>
      <!-- <transition name="el-fade-in-linear"> -->
      <router-view class="main-right"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import gmdataHeader from 'components/header'
import gmdataSideMenu from 'components/sideMenu/gain'
export default {
  name: 'mapping',
  components: {
    gmdataHeader,
    gmdataSideMenu
  }
}
</script>

<style lang="scss">
.index {
  .main {
    display: flex;
    min-height: 680px;
    background-color: #fcfcfc;
    .main-left {
      text-align: center;
      flex: 0 0 220px;
    }
    .main-right {
      flex: 1;
      padding: 40px 40px;
      border: 30px solid #e9ecf1;
      background-color: #fff;
    }
  }
}
</style>
