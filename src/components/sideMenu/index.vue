<template lang="html">
  <div class="gmdata-side-menu">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <el-menu-item index="0" @click="routeTo(menu[0])" class="message-item"><i class="el-icon-message"></i>获取目录</el-menu-item>
      <el-menu-item index="1" @click="routeTo(menu[1])" class="message-item" style="display: none;"><i class="el-icon-message"></i>数据表管理</el-menu-item>
      <el-menu-item index="2" @click="routeTo(menu[2])" class="message-item"><i class="el-icon-message"></i>数据采集</el-menu-item>
      <el-menu-item index="3" @click="routeTo(menu[3])" class="message-item"><i class="el-icon-message"></i>网页采集</el-menu-item>
      <el-menu-item index="4" @click="routeTo(menu[4])" class="message-item" style="display: none;"><i class="el-icon-message"></i>数据查询</el-menu-item>
      <el-menu-item index="5" @click="routeTo(menu[5])" class="message-item"><i class="el-icon-message"></i>数据接口</el-menu-item>
      <el-menu-item index="6" @click="routeTo(menu[6])" class="message-item"><i class="el-icon-message"></i>数据清洗</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      // menu: ['CSIndex', 'TransformIndex', 'MonitoringIndex'],
      menu: ['Directory', 'Management', 'DataCollection', 'HtmlCollection', 'DataQuery', 'DataDisplay', 'DataClean'],
      index: '0'
    }
  },
  created () {
    const matched = this.$route.matched
    this.matchRoute(matched)
  },
  methods: {
    routeTo (name) {
      this.$router.push({name: name})
      // console.log('name: ', name)
      // const matched = this.$route.matched
      // let flag = false
      // // console.log('match: ', matched)
      // matched.forEach((item) => {
      //   if (name === item.name) {
      //     flag = true
      //   }
      //   this.index = this.menu.indexOf(item.name).toString()
      // })
      // if (!flag) {
      //   this.$router.push({name: name})
      // }
    },
    matchRoute (matched) {
      matched.forEach((item) => {
        if (this.menu.indexOf(item.name) > -1) {
          this.index = this.menu.indexOf(item.name).toString()
        }
      })
    }
  },
  watch: {
    '$route': function (to, from) {
      const matched = to.matched
      this.matchRoute(matched)
    }
  }
}
</script>

<style lang="scss">
.gmdata-side-menu {
  background-color: #eef1f6;
  .el-menu-item:first-child {
    margin-left: 30px;
  }
  .message-item {
    text-align: left;
    margin-left: 30px;
  }
}
</style>
