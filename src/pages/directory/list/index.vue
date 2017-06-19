<template lang="html">
  <div class="direct">
    <div class="dlist">
     <div class="search">
       <el-input class="sinput" placeholder="请输入部门名称搜索" icon="search" v-model="inputSearch"></el-input>
       <el-button class="sbtn" @click="search" size="small">搜索</el-button>
     </div>
      <div class="list">
        <ul>
          <li v-for="data in list"><router-link :to="{path:'/directory/detail',query: {id: data.id, name: data.name}}">{{data.name}}<span class="red">({{data.count}})</span></router-link></li>
       </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../api'
export default {
  name: 'gain',
  methods: {
    linkTo (id) {
      console.log('id: ', id)
      this.$router.push('/news')
    },
    search () {
      let queryString = this.inputSearch
      let restaurants = this.storeData
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      this.list = results
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.name.indexOf(queryString) > -1)
      }
    }
  },
  data () {
    return {
      inputSearch: '',
      list: [],
      storeData: []
    }
  },
  created () {
    api.getDirectList()
    .then(res => {
      console.log(res)
      this.list = res.data
      this.storeData = res.data
    })
  }
}

</script>

<style lang="scss">
.direct {
  .dlist{
    .search{
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      float: left;
      .sinput{
        width: 200px;
        margin-right: 20px;
      }
      .sbtn{
        padding: 0 15px;
        height: 36px;
        background-color: #20A0FF;
        color: white;
        font-size: 14px;
      }
    }
    .list{
      float: left;
      border-top: 1px solid #ccc;
      width: 100%;
      ul{
        li{
        flex-wrap: wrap;
        text-align: left;
        line-height: 30px;
        float: left;
        width: 25%;
        margin-top: 10px;
        // list-style-type: disc;
        .red{
          color: red;
        }
      }
     }
    }
  }
}
</style>
