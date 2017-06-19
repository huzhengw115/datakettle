<template>
  <div class="department">
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
      <el-button :plain="true" :disabled="true" class="head-button">批量删除</el-button>
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
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              @click="handleMapping(scope.$index, scope.row)">{{isMappings(scope.row.mappings)}}</el-button>
              <el-button
              size="small"
              @click="handleShow(scope.$index, scope.row)" v-if="scope.row.mappings">{{isShow(scope.row.isShow)}}</el-button>
              <el-button
              size="small"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
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
      tableData: [{
        date: '信息资源1',
        name: '表名称1',
        source: '上海市普陀区金沙江路 1518 弄',
        mappingsTitle: '未映射',
        mappings: 0,
        isShow: 0,
        time: '2017年6月2日13:36:01'
      }, {
        date: '信息资源2',
        name: '表名称2',
        source: '上海市普陀区金沙江路 1518 弄',
        mappingsTitle: '已映射',
        mappings: 1,
        isShow: 0,
        time: '2017年6月2日13:36:01'
      }, {
        date: '信息资源2',
        name: '表名称3',
        source: '上海市普陀区金沙江路 1518 弄',
        mappingsTitle: '已映射',
        mappings: 1,
        isShow: 1,
        time: '2017年6月2日13:36:01'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log('val: ', val)
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
    handleEdit (index, data) {
      this.$router.push('/departmentEdit')
    },
    handleMapping (index, data) {
      this.$message('映射成功')
      this.tableData[index].mappingsTitle = '已映射'
      this.tableData[index].mappings = 1
      console.log('映射')
    },
    handleShow (index, data) {
      this.$message('展示成功')
      this.tableData[index].isShow = 1
      console.log('展示')
    },
    handleDelete (index, data) {
      console.log('删除')
    },
    toSearch () {
      console.log('搜索的数据: ', this.search)
    }
  }
}
</script>

<style lang="scss">
.department {
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
}
</style>
