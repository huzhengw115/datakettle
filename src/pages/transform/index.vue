<template lang="html">
  <div class="transform-wrapper">

  <p @click="toRouter(0)">第一页面</p><p @click="toRouter(1)">第二页面</p>
  <router-view class="view"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TransformIndex',
  methods: {
    toRouter (index) {
      let url = ['transformone', 'transformtwo']
      this.$router.push(url[index])
    }
  }
}
</script>

<style lang="scss">
.transform-wrapper {
  .view {
    border: 2px solid #ddd;
  }
}
</style>
