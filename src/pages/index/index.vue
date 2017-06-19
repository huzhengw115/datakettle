<template lang="html">
  <div class="index">
    <gmdata-header class="header"></gmdata-header>
    <div class="main">
      <gmdata-side-menu class="main-left"></gmdata-side-menu>
      <!-- <transition name="el-fade-in-linear"> -->
      <router-view class="main-right"></router-view>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import gmdataHeader from 'components/header'
import gmdataSideMenu from 'components/sideMenu'
// import api from '../../api'

export default {
  components: {
    gmdataHeader,
    gmdataSideMenu
  },
  created () {
    // this.$api.getData().then(function (response) {
    //   console.log('response: ', response)
    // })
    // .catch(function (err) {
    //   console.log('err: ', err)
    // })
    console.log('api: ', this)
  }
}
</script>

<style lang="scss" scoped>
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
      padding: 50px 45px;
      border: 30px solid #e9ecf1;
      background-color: #fff;
    }
  }
}
</style>
