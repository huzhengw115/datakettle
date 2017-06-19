<template lang="html">
  <div class="connection-wrapper">
    <div class="content">
      <el-form ref="form" label-width="100px" v-for="(form, index) in forms" :key="index">
        <el-form-item>
          <el-tag>{{ form.title }}</el-tag>
        </el-form-item>
        <el-form-item :label="form.type.label" required>
          <el-select v-model="form.type.value" placeholder="">
            <el-option
              v-for="(option, index) in form.type.options"
              :label="option"
              :value="index"
              :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="form.server.label" required>
          <el-input v-model="form.server.value"></el-input>
        </el-form-item>
        <el-form-item :label="form.port.label" required>
          <el-input v-model="form.port.value"></el-input>
        </el-form-item>
        <el-form-item :label="form.username.label" required>
          <el-input v-model="form.username.value"></el-input>
        </el-form-item>
        <el-form-item :label="form.password.label" required>
          <el-input v-model="form.password.value" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="form.database.label" required>
          <el-input v-model="form.database.value"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="onTest(index)" :loading="isTesting[index]" :plain="true">测试</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import api from '../../api'
export default {
  name: 'CSConnection',
  data () {
    return {
      forms: [],
      isTesting: [false, false],
      passTest: []
    }
  },
  computed: {
    ...mapState({
      csInputObj: state => state.collectionSetting.csInputObj,
      csOutputObj: state => state.collectionSetting.csOutputObj
    })
  },
  mounted () {
  },
  methods: {
    onTest (index) {
      // 首先判断是否都填写完了
      let params = this.forms
      if (params[index].server.value === '' || params[index].port.value === '' || params[index].username.value === '' || params[index].database.value === '') {
        console.log('params[index]: ', params[index])
        this.$message.error('请正确填写数据库配置')
        return
      }
      // 将数据库配置打包进行post请求
      let inputData = this.$store.state.collectionSetting.csInputObj
      let outputData = this.$store.state.collectionSetting.csOutputObj
      let inputConnection = inputData.connection
      let outputConnection = outputData.connection
      let paramsData = {}
      paramsData.in = {
        sType: inputConnection.type.options[inputConnection.type.value],
        sHost: inputConnection.server.value,
        sPort: inputConnection.port.value,
        sUName: inputConnection.username.value,
        sPWD: inputConnection.password.value,
        sDBName: inputConnection.database.value
      }
      paramsData.out = {
        sType: outputConnection.type.options[outputConnection.type.value],
        sHost: outputConnection.server.value,
        sPort: outputConnection.port.value,
        sUName: outputConnection.username.value,
        sPWD: outputConnection.password.value,
        sDBName: outputConnection.database.value
      }
      console.log('paramsData: ', paramsData)
      this.$store.commit('storedParams', paramsData)
      // 页面的动画
      this.$set(this.isTesting, index, true)
      // post请求判断是否连接上
      let repData = {}
      if (index === 0) {
        repData = paramsData.in
      } else if (index === 1) {
        repData = paramsData.out
      }
      console.log('repData: ', repData)
      api.baseDataPost(repData)
      .then(res => {
        console.log(res)
        if (res.data === true) {
          this.$set(this.isTesting, index, false)
          this.$store.commit('SET_CONNECTION_TEST', {test: true, index})
          this.$message({
            message: '成功连接数据库',
            type: 'success'
          })
        }
      })
      // 模拟延时
      // setTimeout(() => {
      //   // 页面动画关闭
      //   this.$set(this.isTesting, index, false)
      //   this.$store.commit('SET_CONNECTION_TEST', {test: true, index})
      //   this.$message({
      //     message: '成功连接数据库',
      //     type: 'success'
      //   })
      // }, 2000)
      // 没有通过测试的提示
      // this.$message.error('连接数据库错误，请重试')
    }
  },
  created () {
    // 每次进入这张页面首先将测试清空
    this.$store.commit('storedCsBase', false)
    this.forms.push(this.csInputObj.connection)
    this.forms.push(this.csOutputObj.connection)
    this.passTest.push(this.csInputObj.test)
    this.passTest.push(this.csOutputObj.test)
  }
}
</script>

<style lang="scss">
.connection-wrapper {

  .content {
    display: flex;
    width: 100%;
    form {
      // width: 350px;
      flex: 0 1 auto;
      &:not(:first-child) {
        margin-left: 70px;
      }
      el-form-item {
        el-select {
          width: 100%;
        }
      }
    }
  }

}
</style>
