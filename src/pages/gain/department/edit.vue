<template>
  <div class="edit">
    <div class="head">
      <span class="state">状态：已映射</span>
      <el-checkbox label="展示数据" name="type" v-model="store" class="checkbox"></el-checkbox>
    </div>

    <div class="content">
      <div class="table">
        <p class="title">信息资源详情</p>
        <el-table
          border
          :data="newsData"
          style="width: 100%;">
          <el-table-column
            prop="name"
            label="来源"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="data"
            label="xx信息基因系统"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>

      <div class="table">
        <p class="title">数据表详情</p>
        <el-table
          border
          :data="tableData"
          style="width: 100%;">
          <el-table-column
            prop="name"
            label="日期"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="data"
            label="姓名">
            <template scope="scope">
              <input v-model="tableData[scope.$index].data" placeholder="请输入内容" class="table-input"></input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="footer">
      <el-button @click="saveData">保存</el-button>
      <el-button>重新映射</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      store: '',
      newsData: [{
        name: '部门',
        data: '技术部'
      }, {
        name: '信息资源名称',
        data: 'XXX'
      }, {
        name: '数据元名称',
        data: 'XXX'
      }],
      tableData: [{
        name: '展示分类',
        data: '技术部'
      }, {
        name: '表名称',
        data: ''
      }, {
        name: '字段名称',
        data: ''
      }, {
        name: '',
        data: ''
      }]
    }
  },
  methods: {
    saveData () {
      console.log('saveData: ', this.tableData)
    }
  },
  watch: {
    store () {
      console.log('store: ', this.store)
    }
  }
}
</script>

<style lang="scss">
.edit {
  .head {
    .state {
      font-size: 20px;
    }
    .checkbox {
      margin-left: 100px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    text-align: center;
    .table {
      width: 48%;
      .title {
        background: #eee;
        padding: 15px 0;
        margin-bottom: 10px;
        text-align: center;
      }
      .table-input {
        border: 0;
        outline: medium;
        height: 30;
        line-height: 30px;
        width: 100%;
      }
    }
  }
  .footer {
    margin-top: 30px;
  }
}
</style>
