<template lang="html">
  <div class="direct-side-menu">
    <el-menu :default-active="index" class="el-menu-vertical-demo">
      <el-menu-item index="0" @click="routeTo(menu[0])"><i class="el-icon-message"></i>公共目录</el-menu-item>
      <el-menu-item index="1" @click="routeTo(menu[1])"><i class="el-icon-menu"></i>数据表管理</el-menu-item>
      <el-menu-item index="1" @click="routeTo(menu[2])"><i class="el-icon-menu"></i>数据库连接</el-menu-item>
      <el-menu-item index="2" @click="routeTo(menu[3])"><i class="el-icon-setting"></i>数据查询</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: ['gain', 'Department', 'Collect', 'query'],
      index: '0'
    }
  },
  created () {
    const matched = this.$route.matched
    this.matchRoute(matched)
  },
  methods: {
    routeTo (name) {
      console.log('name: ', name)
      this.$router.push(name)
    },
    // routeTo (name) {
    //   const matched = this.$route.matched
    //   let flag = false
    //   matched.forEach((item) => {
    //     if (name === item.name) {
    //       flag = true
    //     }
    //     this.index = this.menu.indexOf(item.name).toString()
    //   })
    //   if (!flag) {
    //     this.$router.push(name)
    //   }
    // },
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
.direct-side-menu {
  background-color: #eef1f6;
}
</style>
