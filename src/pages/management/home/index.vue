<template>
  <div class="management-home">
    <div class="head">
      <el-input v-model="search.formName" placeholder="输入表名称搜索" class="head-input"></el-input>
      <el-input v-model="search.departmengName" placeholder="输入部门名称搜索" class="head-input"></el-input>
      <el-select v-model="search.mappingsState" placeholder="映射状态" class="head-select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="head-button" @click="toSearch()">搜索</el-button>
      <el-button :plain="true" :disabled="isAllDelete" class="head-button" @click="allDelete">批量删除</el-button>
      <el-button type="primary" class="head-button">创建新表</el-button>
      <el-button type="primary" class="head-button">Excel导入</el-button>
    </div>

    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          label="信息资源名称"
          width="120"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="表名称"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="source"
          label="来源部门"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mappingsTitle"
          label="映射状态"
          width="95"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建时间"
          width="175"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template scope="scope">
            <el-button
              size="small">
              <router-link :to="{path:'/management/edit',query: {id: scope.row.id}}">编辑</router-link></el-button>
            <el-button
              size="small"
              @click="handleMapping(scope.$index, scope.row)">{{isMappings(scope.row.mappings)}}</el-button>
              <el-button
              size="small"
              @click="handleShow(scope.$index, scope.row.isShow)" v-if="scope.row.mappings">{{isShow(scope.row.isShow)}}</el-button>
              <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

  </div>
</template>

<script>
import api from '../../../api'
export default {
  name: 'mapping',
  data () {
    return {
      search: {
        formName: '',
        departmengName: '',
        mappingsState: ''
      },
      options: [{
        value: '0',
        label: '已映射'
      }, {
        value: '1',
        label: '未映射'
      }],
      value: '',
      tableData: [],
      multipleSelection: [],
      isAllDelete: false,
      pages: 100,
      currentPage: 1
    }
  },
  methods: {
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val: ', val)
    },
    // 批量删除
    allDelete () {
      console.log('批量删除')
    },
    isMappings (data) {
      if (data === 0) {
        return '映射'
      } else {
        return '重新映射'
      }
    },
    isShow (data) {
      if (data === 0) {
        return '展示'
      } else {
        return '取消展示'
      }
    },
    handleMapping (index, data) {
      this.$message('映射成功')
      this.tableData[index].mappingsTitle = '已映射'
      this.tableData[index].mappings = 1
      console.log('映射')
    },
    handleShow (index, data) {
      if (data === 0) {
        this.$message('展示成功')
        this.tableData[index].isShow = 1
      } else {
        this.$message('取消成功')
        this.tableData[index].isShow = 0
      }
    },
    handleDelete (index, data) {
      this.tableData.splice(index, 1)
      console.log('删除: ', index)
    },
    toSearch () {
      console.log('搜索的数据: ', this.search)
    },
    // 分页
    handleSizeChange (row) {
      console.log(row)
    },
    // 页面的跳转
    handleCurrentChange (val) {
      console.log('val: ', val)
    }
  },
  created () {
    api.getManagement()
    .then(res => {
      this.tableData = res.data.index
    })
  }
}
</script>

<style lang="scss">
.management-home {
  .head {
    display: flex;
    .head-input {
      width: 20%;
      margin-right: 20px;
    }
    .head-select {
      width: 12%;
      margin-right: 20px;
    }
    .head-button {
      margin-right: 10px;
    }
  }
  .content {
    margin-top: 20px;
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
