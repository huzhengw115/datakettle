<template lang="html">
  <div class="querylist">
   <div class="search">
     <span class="title">来源部门：<u>公安局</u></span>
     <el-input class="sinput" placeholder="请输入表名称搜索" icon="search" v-model="input2">
      </el-input>
      <el-button class="sbtn" @click="search" size="small">搜索</el-button>
   </div>
    <div class="tables">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
      type="selection"
      width="65">
    </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="表名称"
        width="180">
      </el-table-column>
      <el-table-column
        fixed
        prop="date"
        label="最近数据采集时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="185">
        <template scope="scope">
          <el-button size="small">
          <router-link :to="{path:'/dataQuery/detail',query: {id: scope.row.id}}">查阅数据</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
// import api from '../../api'
export default {
  name: 'querylist',
  methods: {
    search () {
      console.log(1)
    }
  },
  data () {
    return {
      input2: '',
      tableData: [{
        id: 0,
        name: '表名称1',
        date: '2017-06-01 11:33'
      }, {
        id: 1,
        name: '表名称2',
        date: '2017-06-02 12:33'
      }, {
        id: 2,
        name: '表名称3',
        date: '2017-05-31 14:33'
      }, {
        id: 3,
        name: '表名称4',
        date: '2017-05-11 15:33'
      }]
    }
  }
}
</script>

<style lang="scss">
 .querylist{
   .search{
     u{
      text-decoration: underline;
     }
     .sinput{
      width: 200px;
      margin-left: 100px;
     }
     .sbtn{
      height: 36px;
      font-size: 16px;
     }
     .cbtn{
      height: 36px;
      font-size: 16px;
     }
   }
   .tables{
    width: 612px;
    margin-top: 30px;
   }
 }
</style>
