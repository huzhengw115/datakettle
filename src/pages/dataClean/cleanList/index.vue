<template lang="html">
  <div class="clean-list">
    <div class="head">
      <div class="title">
        <p class="name">数据清洗</p>
        <el-button type="primary" class="button" size="small">
          <router-link to="/dataClean/add" style="color: #fff;">新增规则</router-link>
        </el-button>
      </div>
    </div>

    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="department"
          label="部门名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="表名">
        </el-table-column>
        <el-table-column
          prop="number"
          label="字段数量"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="finishNumber"
          label="已完成规则配对"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template scope="scope">
            <router-link :to="{ path: '/dataClean/rule', query: {id: scope.row.id}}" style="color: #00a0ff;">编辑</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'cleanList',
  data () {
    return {
      tableData: this.$store.state.dataClean.list
    }
  }
}

</script>

<style lang="scss">
.clean-list {
  .head {
    margin-bottom: 15px;
    .title {
      position: relative;
      border-bottom: 1px solid #eee;
      .name {
        width: 65px;
        display: inline-block;
        padding-bottom: 10px;
        border-bottom: 3px solid #00a0ff;
      }
      .button {
        position: absolute;
        right: 15px;
        top: -5px;
      }
    }
  }
}
</style>
