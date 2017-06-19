<template lang="html">
  <div class="direct">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'direct',
  watch: {
    '$route': function (to, from) {
      if (this.$route.path === '/directory/index') {
        this.$router.push('/directory/index')
      }
    }
  }
}

</script>

<style lang="scss">

</style>
