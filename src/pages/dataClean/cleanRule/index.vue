<template lang="html">
  <div class="clean-rule">
    <div class="head">
      <div class="title">
        <p class="name">添加规则</p>
        <!-- <el-button type="primary" class="button" size="small">
          <router-link to="/dataClean/add" style="color: #fff;">新增规则</router-link>
        </el-button> -->
      </div>
    </div>

    <div class="content">
      <div class="list" v-for="data in tableData.field">
        <span class="name">{{data.name}}</span>
        <span class="remark">{{data.remark}}</span>
        <el-select v-model="data.rule" placeholder="请选择" class="rule">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
            change="change">
          </el-option>
        </el-select>
      </div>  
    </div>

    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      options: [],
      id: 0
    }
  },
  methods: {
    submit () {
      let data = {}
      data.id = this.id
      data.list = this.tableData
      // this.$store.commit('storeList', data)
      this.$message('保存成功！！！')
      this.$router.push('/dataClean/list')
    },
    cancel () {
      // this.$store.commit('storeCache', {})
      console.log('data: ', this.$store.state.dataClean.list)
      this.$router.push('/dataClean/list')
    },
    change () {
      // this.$store.commit('storeCache', this.tableData)
    }
  },
  created () {
    this.options = this.$store.state.dataClean.rule
    // if (this.$store.state.dataClean.cache !== {}) {
    //   this.tableData = this.$store.state.dataClean.cache
    // }
    this.id = this.$route.query.id
    let data = this.$store.state.dataClean.list
    for (let i = 0; i < data.length; ++i) {
      if (this.id === data[i].id) {
        this.tableData = data[i]
        console.log('res: ', this.tableData)
      }
    }
  }
}

</script>

<style lang="scss">
.clean-rule {
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
  .content {
    .list {
      display: flex;
      margin-bottom: 15px;
      .name {
        width: 250px;
      }
      .remark {
        width: 250px;
      }
      .rule {
        width: 300px;
      }
    }
  }
  .footer {
    margin-top: 50px;
  }
}
</style>
