<template lang="html">
  <div class="query" id="query">
    <div class="dlist">
     <div class="search">
     	 <el-input class="sinput" placeholder="请输入部门名称搜索" icon="search" v-model="input2"></el-input>
			 <el-button  class="sbtn" @click="search" size="small">搜索</el-button>
     </div>
    	<div class="list">
    		<ul>
          <li v-for="data in list"><router-link :to="{path:'/dataQuery/list',query: {id: data.id}}">{{data.name}}</router-link></li>
   		 </ul>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'query',
  methods: {
    search () {
      console.log(1)
    }
  },
  data () {
    return {
      input2: '',
      list: [{
        id: 111,
        name: '公安局'
      }, {
        id: 112,
        name: '海事局'
      }, {
        id: 113,
        name: '审计局'
      }, {
        id: 114,
        name: '社保局'
      }, {
        id: 115,
        name: '教育局'
      }, {
        id: 116,
        name: '环保局'
      }, {
        id: 117,
        name: '气象局'
      }, {
        id: 118,
        name: '交通局'
      }, {
        id: 119,
        name: '税务局'
      }, {
        id: 120,
        name: '物价局'
      }]
    }
  }
}

</script>

<style lang="scss">
.query {
  .dlist{
    .search{
      margin-bottom: 20px;
      .sinput{
        width: 200px;
      }
      .sbtn{
        height: 36px;
        background-color: blue;
        color: white;
      }
    }
    .list{
      float: left;
      border: 1px solid #ccc;
      ul{
        li{
        flex-wrap: wrap;
        text-align:center;
        line-height:30px;
        float: left;
        width: 30%;
        margin: 10px;
      }
     }
    }
  }
}
</style>
