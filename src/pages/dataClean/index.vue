<template lang="html">
  <div class="data-clean">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'dataClean',
  watch: {
    '$route': function (to, from) {
      if (this.$route.path === '/dataClean/list') {
        this.$router.push('/dataClean/list')
      }
    }
  }
}

</script>

<style lang="scss">

</style>
