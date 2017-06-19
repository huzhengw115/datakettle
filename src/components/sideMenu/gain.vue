<template lang="html">
  <div class="gmdata-side-menu">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <el-menu-item index="0" @click="routeTo(menu[0])"><i class="el-icon-message"></i>采集配置</el-menu-item>
      <el-menu-item index="1" @click="routeTo(menu[1])"><i class="el-icon-menu"></i>转换执行</el-menu-item>
      <el-menu-item index="2" @click="routeTo(menu[2])"><i class="el-icon-setting"></i>状态监控</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-setting"></i>定时任务</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      menu: ['Gain', 'GainTwo', 'GainThree'],
      index: '0'
    }
  },
  created () {
    const matched = this.$route.matched
    this.matchRoute(matched)
  },
  methods: {
    // routeTo (name) {
    //   console.log('name: ', name)
    //   this.$router.push(name)
    // },
    routeTo (name) {
      const matched = this.$route.matched
      let flag = false
      matched.forEach((item) => {
        if (name === item.name) {
          flag = true
        }
        this.index = this.menu.indexOf(item.name).toString()
      })
      if (!flag) {
        this.$router.push({name: name})
      }
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
}
</style>
