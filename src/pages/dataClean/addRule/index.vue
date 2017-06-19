<template lang="html">
  <div class="add-rule">
    <div class="head">
      <p class="title">添加规则</p>
    </div>

    <div class="content">
      <p class="title">请输入您想添加的规则: </p>
      <el-input v-model="input" placeholder="请输入您想添加的规则" class="input"></el-input>
    </div>

    <div class="footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'addRule',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    submit () {
      if (this.input === '') {
        this.$message.error('规则填写不能为空')
        return
      }
      this.$store.commit('storeRule', this.input)
      this.$message('保存成功')
      this.$router.push('/dataClean/list')
    },
    cancel () {
      this.$router.push('/dataClean/list')
    }
  }
}

</script>

<style lang="scss">
.add-rule {
  .head {
    border-bottom: 1px solid #eee;
    margin-bottom: 25px;
    .title {
      border-bottom: 3px solid #00a0ff;
      width: 65px;
      padding-bottom: 5px;
    }
  }
  .content {
    .title {
      margin-bottom: 15px;
    }
  }
  .footer {
    margin-top: 50px;
  }
}
</style>
