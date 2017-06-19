<template lang="html">
  <div class="direct">
    <div class="search">
      <div class="search-left">
        <el-button class="sbtn" type="primary" size="small" @click="returnBtn">返回</el-button>
        <span class="title">来源部门：<u>{{pageName}}</u></span>
      </div>
      <div class="search-right">
        <el-input class="sinput" placeholder="请输入信息资源名称搜索" icon="search" v-model="inputSearch">
        </el-input>
        <el-button class="sbtn" @click="search" type="primary" size="small">搜索</el-button>
        <el-button class="cbtn" @click="createClick" type="primary" size="small">批量创建</el-button>
      </div>
    </div>
    <div class="tables">
      <el-table
      :data="tableData"
      border
      style=""
      max-height="650">
        <el-table-column
        type="selection"
        width="65">
        </el-table-column>
        <el-table-column
          prop="name"
          label="信息资源名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="获取时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="shareType"
          label="是否共享"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isOpen"
          label="是否开放"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button @click="tableShow(scope.row.id)" size="small">数据元</el-button>
            <el-button size="small" @click="edit(scope.$index, scope.row)">{{isEdit(scope.row.isEdit)}}</el-button>
            <el-button @click="update" size="small">更新表</el-button>
            <el-button @click="look(scope.row)" size="small">查看SQL</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--   分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages">
      </el-pagination>
    </div>

    <el-dialog  style="width:1000px" title="查看" :visible.sync="dialogTableVisible">
      <el-table class="tblist" :data="formData" border style="width: 100%">
      <el-table-column property="nameCh" label="中文名称"></el-table-column>
      <el-table-column property="nameEn" label="英文名称"></el-table-column>
      <el-table-column property="type" label="数据类型"></el-table-column>
      <el-table-column property="length" label="数据长度"></el-table-column>
      </el-table>
      <!--   分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages1">
      </el-pagination>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../../api'
export default {
  name: 'gain',
  methods: {
    search () {
      api.getDirectDetailSearch({id: this.$route.query.id, q: this.inputSearch})
      .then(res => {
        this.tableData = res.data.rows
      })
    },
    createClick () {
      console.log(2)
    },
    open () {
      console.log(3)
    },
    edit (index, row) {
      if (this.tableData[index].isEdit === 1) {
        this.$message.error('已创建表格，请勿重复操作！！！')
        console.log('已创建')
        return
      }
      api.get('/gain/createTab', {id: row.id, tb: row.tb})
      // api.get('/gain/createTab', {info: row})
      .then(res => {
        // if (res.status === 201) {
        if (res.success === true) {
          let data = this.tableData[index]
          data.isEdit = 1
          // this.tableData[index].isEdit = 1
          this.$set(this.tableData, index, data)
        }
      })
    },
    isEdit (data) {
      if (data === 1) {
        return '已创建'
      } else {
        return '未创建'
      }
    },
    returnBtn () {
      this.$router.go(-1)
    },
    // 分页
    handleSizeChange (row) {
      console.log(row)
    },
    // 页面的跳转
    handleCurrentChange (val) {
      api.get('/gain/getInfo', {id: this.$route.query.id, page: val})
      .then(res => {
        this.tableData = res.data.totaltableData = res.data.rows
      })
      this.currentPage = val
    },
    // 分页
    handleSizeChange1 (row) {
      console.log(row)
    },
    // 页面的跳转
    handleCurrentChange1 (val) {
      console.log('val: ', val)
      api.get('/gain/getElement', {id: this.popupNumer, page: val})
      .then(res => {
        this.formData = res.data.rows
      })
      this.currentPage1 = val
    },
    look (data) {
      // this.$alert(111)
      api.get('/gain/lookSql', {id: data.id, tb: data.tb})
      .then(res => {
        console.log('res: ', res)
        this.$msgbox({
          title: '查看SQL语句',
          message: res.data
        })
      })
    },
    // 更新表
    update () {
      console.log(111)
    },
    // 显示表格
    tableShow (index) {
      this.dialogTableVisible = true
      this.popupNumer = index
      api.getDirectDetailTable({id: index})
      .then(res => {
        this.formData = res.data.rows
        this.pages1 = res.data.total
      })
    }
  },
  data () {
    return {
      inputSearch: '',
      tableData: [],
      dialogTableVisible: false,
      pages: 0,
      currentPage: 1,
      pageName: '',
      formData: [],
      pages1: 0,
      currentPage1: 1,
      popupNumer: -1
    }
  },
  created () {
    let params = {id: this.$route.query.id}
    this.pageName = this.$route.query.name
    api.getDirectDetail(params)
    .then(res => {
      console.log('res: ', res)
      this.tableData = res.data.totaltableData = res.data.rows
      this.pages = res.data.total
    })
    // console.log('url: ', url)
  },
  watch: {
    dialogTableVisible () {
      if (!this.dialogTableVisible) {
        this.popupNumer = -1
      }
    }
  }
}
</script>

<style lang="scss">
.direct{
  .search{
    display: flex;
    justify-content: space-between;
    .search-left {
      u {
        text-decoration: underline;
      }
      .sbtn{
        margin-right: 20px;
        padding: 0 15px;
        height: 36px;
        font-size: 16px;
      }
    }
    .search-right {
      .sinput{
        width: 200px;
        margin-right: 15px;
      }
      .sbtn{
        padding: 0 15px;
        height: 36px;
        font-size: 16px;
      }
      .cbtn{
        height: 36px;
        font-size: 16px;
      }
    }
  }
  .block {
    margin-top: 15px;
    text-align: center;
    .el-pagination__sizes {
      display: none;
    }
  }
  .tables{
    width: 100%;
    margin-top: 30px;
  }
}
</style>
