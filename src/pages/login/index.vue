<template lang="html">
  <div class="login" ref="login">
    <div class="head">
      <p class="title">国脉数据共享平台</p>
    </div>

    <div class="content">
      <div class="login-input">
        <form class='login-form'>
          <span class="login-title">账号: </span>
          <el-input v-model="loginData.loginName" placeholder="请输入用户名" class="name-input"></el-input>
        </form>
        <form class='login-form'>
          <span class="login-title">密码: </span>
          <el-input v-model="loginData.loginPassword" placeholder="请输入密码" class="password-input" type="password"></el-input>
        </form>
        <el-checkbox label="记住账号密码" name="type" v-model="isLocal" class="login-checkbox"></el-checkbox>
        <el-button type="primary" class="login-button" @click="loginSubmit">登录</el-button>
      </div>
    </div>
      
  </div>
</template>

<script type="text/ecmascript-6">
// import api from '../../api'
export default {
  name: 'index',
  data () {
    return {
      loginData: {
        loginName: '',
        loginPassword: ''
      },
      isLocal: false
    }
  },
  methods: {
    loginSubmit () {
      // console.log('loginData: ', this.loginData)
      // api.login(this.loginData)
      // .then(res => {
      //   console.log('res: ', res)
      //   // this.$router.push('/csindex')
      // })
      this.$router.push('/directory')
    },
    registerSubmit () {
      console.log('注册')
    }
  },
  created () {
    setTimeout(() => {
      let height = (window.screen.height - 30) + 'px'
      this.$refs.login.style.height = height
    }, 0)
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: url('./background.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  .head {
    .title {
      color: #fff;
      text-align: center;
      margin-top: 70px;
      font-size: 50px;
    }
  }
  .content {
    background-color: #fff;
    width: 400px;
    margin: auto;
    margin-top: 100px;
    border: 2px solid #ddd;
    border-radius: 10px;
    .login-input {
      width: 90%;
      margin: auto;
      .login-form {
        margin: 20px 0;
        display: flex;
        .login-title {
          width: 60px;
          line-height: 36px;
        }
      }
      .login-checkbox {
        margin-bottom: 20px;
      }
      .login-button {
        width: 100%;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
