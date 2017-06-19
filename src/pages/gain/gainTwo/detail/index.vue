<template>
  <div class="mapping">
    <p>详情页面{{url}}</p>
  </div>
</template>

<script>
export default {
  name: 'mapping',
  data () {
    return {
      url: '000'
    }
  },
  created () {
    this.url = this.$route.query.id
    console.log('本页面的id : ', this.$route.query.id)
  }
}
</script>

<style lang="scss">

</style>
