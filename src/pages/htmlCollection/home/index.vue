<template lang="html">
  <div class="data-collection">
    <div class="control">
      <el-form :inline="true" :model="select" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="select.name" placeholder="输入任务名称搜索" class="search-input"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="select.url" placeholder="输入采集地址搜索" class="search-input"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="select.category" placeholder="分类" class="search-input">
            <el-option label="全部分类" value="0"></el-option>
            <el-option label="列表采集" value="1"></el-option>
            <el-option label="单页采集" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="select.status" placeholder="状态" class="search-input">
            <el-option label="全部状态" value="0" ></el-option>
            <el-option label="计划任务" value="1"></el-option>
            <el-option label="采集成功" value="2"></el-option>
            <el-option label="采集失败" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="delTask(multipleSelection)">批量删除</el-button>
      <el-button type="primary" @click="routeTo()">新增任务</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table ref="multipleTable"
        :data="taskList"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="任务ID" width="100">
          <template scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" width="100"></el-table-column>
        <el-table-column prop="url" label="采集地址" width="100"></el-table-column>
        <el-table-column prop="category" label="分类" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100"></el-table-column>
        <el-table-column prop="beginDate" label="采集时间" width="100"></el-table-column>
        <el-table-column prop="operate" label="操作" show-overflow-tooltip>
          <template scope="scope">
            <el-button @click="editTask(scope.$index)" class="content-button" size="small" >编译</el-button>
            <el-button @click="copyTask" class="content-button" size="small">复制</el-button>
            <el-button @click="delTask(scope.row.id)" class="content-button" size="small">删除</el-button>
            <el-button @click="startTask(scope.row)" class="content-button" size="small">采集</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--   分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../api'
export default {
  data () {
    return {
      select: {
        name: '',
        url: '',
        category: '',
        status: ''
      },
      taskList: [{
        id: null,
        name: '',
        url: '',
        category: '',
        status: '',
        beginDate: ''
      }],
      multipleSelection: [],
      total: 0, // 分页总条数
      currentPage: '' // 当前页
    }
  },
  methods: {
    // 查询表单提交
    onSubmit () {
      console.log('submit!', this.select)
      // list.postList(this.formInline)
      this.getList('/spiderTask', this.select)
      // .then(res => {
      //   console.log(res)
      // })
    },
    // 新增任务
    routeTo () {
      this.$router.push('/htmlCollection/add')
    },
    // 多选框
    handleSelectionChange (val) {
      // let this.multipleSelection = new Array()
      this.multipleSelection = []
      for (let i in val) {
        this.multipleSelection[i] = val[i].id
      }
    },
    copyTask () {

    },
    delTask (id) {
      if (id.length === 0 || id === '') {
        this.$message('请选择需要删除的任务！')
        return
      }
      if (typeof (id) === 'number') {
        this.multipleSelection[0] = id
      }
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {ids: this.multipleSelection.toString(), _method: 'DELETE'}
        api.post('/spiderTask', params)
        .then(res => {
          if (res.success) {
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.data)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editTask (index) {
      this.$store.commit('storageData', this.taskList[index])
      this.$router.push('/htmlCollection/add')
    },
    startTask (val) {
      console.log(val)
      // api.post('/rest/spiderTask/spider', val)
    },
    // 分页
    handleSizeChange (row) {
      console.log(row)
    },
    handleCurrentChange (val) {
      this.getList('/spiderTask', {page: val})
      this.currentPage = val
    },
    // 获取列表
    getList (url, params) {
      api.get(url, params)
      .then(res => {
        this.total = res.data.total
        this.taskList = []
        if (res.success) {
          for (var i in res.data.rows) {
              // this.taskList[i] = res.data.rows[i] 这个方法因为渲染顺序原因，页面刷新后无法显示值
            this.$set(this.taskList, i, res.data.rows[i])
          }
        } else {
          // this.$message.error(res.data)
        }
      })
    }
  },
  created () {
    this.getList('/spiderTask', {page: 1})
  }
}
</script>
<style lang="scss">
.data-collection {
  .control {
    margin-bottom: 15px;
    display: flex;
    height: 35px;
    .search-input {
      width: 150px;
    }
    .content-button {

    }
  }
  .block {
    margin-top: 15px;
    text-align: center;
    .el-pagination__sizes {
      display: none;
    }
  }
}
</style>
