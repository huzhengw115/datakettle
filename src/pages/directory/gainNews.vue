<template lang="html">
  <div class="direct">
   <div class="search">
     <span class="title">来源部门：<u>公安局</u></span>
     <el-input class="sinput" placeholder="请输入信息资源名称搜索" icon="search" v-model="input2">
      </el-input>
      <el-button  class="sbtn" @click="search" size="small">搜索</el-button>
      <el-button  class="cbtn" @click="createClick" size="small">批量创建</el-button>
   </div>
    <div class="tables">
      <el-table
      :data="tableData"
      border
      style=""
      max-height="250">
      <el-table-column
      type="selection"
      width="65">
    </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="信息资源名称"
        width="180">
      </el-table-column>
      <el-table-column
        fixed
        prop="date"
        label="获取时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="185">
        <template scope="scope">
          <el-button @click="dialogTableVisible = true" size="small">详情</el-button>
          <el-button size="small" @click="edit(scope.$index, scope.row)">{{isEdit(scope.row.isEdit)}}</el-button>
          <!-- <el-button size="small" @click="edit(scope.$index, scope.row)">创建表</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-dialog  style="width:1000px" title="查看" :visible.sync="dialogTableVisible">
         <el-table class="tblist" :data="tableData" border style="width: 100%">
          <el-table-column property="type" label="类型名称" width="160"></el-table-column>
          <el-table-column property="rname" label="名称" width="200"></el-table-column>
        </el-table>
  </el-dialog>
  </div>
</template>

<script>
// import api from '../../api'
export default {
  name: 'gain',
  methods: {
    search () {
      console.log(1)
    },
    createClick () {
      console.log(2)
    },
    open () {
      console.log(3)
    },
    edit (index, row) {
      if (this.tableData[index].isEdit === 1) {
        console.log('已创建')
        return
      }
      this.tableData[index].isEdit = 1
      console.log(index, row)
    },
    isEdit (data) {
      if (data === 0) {
        return '创建表'
      } else {
        return '已创建'
      }
    }
  },
  data () {
    return {
      input2: '',
      tableData: [{
        type: '数据源名称',
        name: '人口信息',
        rname: '姓名',
        date: '2017-06-01 11:33',
        isEdit: 0
      }, {
        type: '数据源名称',
        name: '居民身份证信息',
        rname: '身份证号',
        date: '2017-06-02 12:33',
        isEdit: 0
      }, {
        type: '数据源名称',
        name: '户口申请审批信息',
        rname: '年龄',
        date: '2017-05-31 14:33',
        isEdit: 0
      }, {
        type: '数据源名称',
        name: '王小虎',
        rname: '学历',
        date: '2017-05-11 15:33',
        isEdit: 0
      }],
      dialogTableVisible: false
    }
  },
  created () {
    // api.getList()
    // .then(res => {
    //   console.log('res: ', res)
    // })
    let url = this.$route.query.id
    console.log('url: ', url)
  }
}
</script>

<style lang="scss">
 .direct{
   .search{
     u{
      text-decoration: underline;
     }
     .sinput{
      width: 200px;
      margin-left: 60px;
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
