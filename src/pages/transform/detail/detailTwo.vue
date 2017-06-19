<template lang="html">
  <div class="transform-wrapper">
    <p @click="goto">这个是第二页面</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TransformIndex',
  methods: {
    goto () {
      this.$router.push('transformone')
    }
  }
}
</script>

<style lang="scss">
</style>
