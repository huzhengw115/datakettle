<template>
  <div class="mapping">
  <p @click="lalal(0)">我要去home</p>
  <p @click="lalal(1)">我要去news</p>
  <p @click="lalal(2)">department</p>
  <p v-for="data in urlData" @click="goPages(data.id)">
    <!-- <router-link :to="{path:'/gainDetail/data.id'}">{{data.name}}</router-link> -->
    <router-link :to="{path:'/gainDetail',query: {id: data.id}}">{{data.name}}</router-link>
  </p>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mapping',
  data () {
    return {
      linkData: ['gainHome', 'gainNews', 'gainDepartment'],
      urlData: [{
        id: 111,
        name: '第一页'
      }, {
        id: 222,
        name: '第二页'
      }, {
        id: 333,
        name: '第三页'
      }, {
        id: 444,
        name: '第四页'
      }]
    }
  },
  methods: {
    lalal (name) {
      let url = this.linkData[name]
      this.$router.push(url)
    },
    goPages (id) {
      console.log('id: ', id)
    }
  }
}
</script>

<style lang="scss">

</style>
