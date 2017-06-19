<template lang="html">
  <div class="baseConfig">

    <div class="content">
      <el-form :label-position="labelPosition" label-width="100px" :model="baseForm">
        <el-form-item label="数据库类型" required>
          <el-select v-model="baseForm.sType" placeholder="请选择" class="form-input">
            <el-option
              v-for="item in baseType"
              :label="item.type"
              :value="item.value"
              :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="IP地址" required>
          <el-input v-model="baseForm.sHost" class="form-input"></el-input>
        </el-form-item>

        <el-form-item label="端口号" required>
          <el-input v-model="baseForm.sPort" class="form-input"></el-input>
        </el-form-item>

        <el-form-item label="用户名" required>
          <el-input v-model="baseForm.sUName" class="form-input"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="baseForm.sPWD" class="form-input" type="password"></el-input>
        </el-form-item>

        <el-form-item label="数据库名" required>
          <el-input v-model="baseForm.sDBName" class="form-input"></el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" class="form-link" @click="submit">下一步</el-button>
        </el-form-item>
        
      </el-form>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      labelPosition: 'right',
      baseForm: {
        sType: '',
        // 类型
        sHost: '',
        // IP地址
        sPort: '',
        // 端口号
        sUName: '',
        // 用户名
        sPWD: '',
        // 密码
        sDBName: ''
        // 数据库名
      },
      baseType: [{
        type: 'Oracle',
        value: 0
      }, {
        type: 'Mysql',
        value: 1
      }, {
        type: 'DB2',
        value: 2
      }, {
        type: 'Sqlserver',
        value: 3
      }]
    }
  },
  methods: {
    submit () {
      if (this.baseForm.sType === '' || this.baseForm.sHost === '' || this.baseForm.sPort === '' || this.baseForm.sUName === '' || this.baseForm.sPWD === '' || this.baseForm.sDBName === '') {
        this.$message.error('请完整填写数据库配置')
        return
      }
      console.log('submit: ', this.baseForm)
      this.$router.push('/baseDetail')
    }
  }
}
</script>

<style lang="scss">
.baseConfig {
  .content {
    width: 370px;
    margin: auto;
    .form-input {
      width: 250px;
    }
    .form-link {
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
}
</style>
