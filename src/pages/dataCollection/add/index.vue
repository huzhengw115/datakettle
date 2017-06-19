<template lang="html">
  <div class="collection-setting">
    <el-steps :space="200" :active="step">
      <el-step title="步骤 1 － 连接配置" description="数据库配置"></el-step>
      <el-step title="步骤 2 － 表映射" description="表映射选择"></el-step>
      <el-step title="步骤 3 － 字段映射" description="字段映射选择"></el-step>
      <el-step title="步骤 4 － 完成" description="完成配置执行转换"></el-step>
      <!-- <el-step title="步骤 1 － 连接配置" description="数据库配置" @click.native="stepTo(1)"></el-step>
      <el-step title="步骤 2 － 表映射" description="表映射选择" @click.native="stepTo(2)"></el-step>
      <el-step title="步骤 3 － 字段映射" description="字段映射选择" @click.native="stepTo(3)"></el-step>
      <el-step title="步骤 4 － 完成" description="完成配置执行转换" @click.native="stepTo(4)"></el-step> -->
    </el-steps>
    <router-view class="view" ref="dataSubmit" v-if="!isPopupShow"></router-view>

    <!-- 多对一字段的选择 -->
    <div class="form-template" v-if="isPopupShow">
      <more-form-template class="content" :moreFormData="moreFormData" ref="moreForm"></more-form-template>
      <el-button class="button-cancel" @click="cancelPopup">取 消</el-button>
      <el-button class="button-submit" @click="submitPopup">确 定</el-button>
    </div>

    <div class="btn-group">
      <el-button icon="arrow-left" @click.native.prevent="preStep" v-show="showPreStep">上一步</el-button>
      <el-button type="primary" @click.native.prevent="nextStep" v-show="showNextStep" :plain="true">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      <el-button type="primary" icon="circle-check" @click.native.prevent="complete" v-show="showComplete">完成</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const INIT_STEP = 1 // 数据库配置页面
const FORM_STEP = 2 // 表格页面
const FEILD_STEP = 3 // 字段映射页面
const MAX_STEP = 4 // 完成页面
import api from '../../../api'
import moreFormTemplate from 'components/moreForm'
export default {
  name: 'CSIndex',
  components: {
    moreFormTemplate
  },
  data () {
    return {
      radio: {
        index: 3
      },
      step: INIT_STEP,
      showPreStep: false,
      showNextStep: true,
      showComplete: false,
      isPopupShow: false,
      moreFormData: {},
      viewsName: ['CSConnection', 'CSTableMapping', 'CSFieldMapping', 'CSComplete']
    }
  },
  created () {
    console.log('ll')
    this.$router.push({name: 'DataBase'})
    this.step = INIT_STEP
    this.$store.commit('INIT_CONNECTION_OBJ')
  },
  methods: {
    // 上一步
    preStep () {
      if (this.step > INIT_STEP) {
        this.stepTo(--this.step)
      }
    },
    // 下一步
    nextStep () {
      // 数据库配置页面
      if (this.step === INIT_STEP) {
        // 首先检测是否已经经过测试
        let inputData = this.$store.state.collectionSetting.csInputObj
        let outputData = this.$store.state.collectionSetting.csOutputObj
        if (inputData.test === false || outputData.test === false) {
          this.$message.error('请先通过数据库连接测试')
          return
        }
        let params = this.$store.state.collectionSetting.baseParams
        console.log('params: ', params)
        // api.allBasePost()
        this.stepTo(++this.step)
      } else if (this.step === FORM_STEP) {
        // 判断是否存在多对一的情况，无即跳转，有即替换页面
        let mappingsData = this.$store.state.collectionSetting.mappingsData
        if (mappingsData.finishData.length === 0) {
          this.$message.error('请至少填写一段映射关系')
          return
        }
        this.stepTo(++this.step)
      } else if (this.step === FEILD_STEP) {
        this.moreFormData = this.$refs.dataSubmit.nextStep()
        console.log('moreFormData: ', this.moreFormData)
        if (this.moreFormData.moreForm.length > 0) {
          this.$message('存在表格多对一映射关系，请选择关联字段')
          this.isPopupShow = true
          this.showNextStep = false
          this.showPreStep = false
          this.showComplete = false
          return
        }
        console.log('可以跳转')
        this.stepTo(++this.step)
      } else if (this.step === MAX_STEP) {
        this.$refs.dataSubmit.storedData()
        this.stepTo(++this.step)
      }
    },
    // 完成
    complete () {
      let params = this.$store.state.collectionSetting.paramsData
      params.base = this.$store.state.collectionSetting.baseParams
      params.name = this.$refs.dataSubmit.mappingsTitle
      console.log('2: ', params)
      params = JSON.stringify(params)
      let ktrParams = {}
      ktrParams.params = params
      console.log('ktrParams: ', ktrParams)
      api.post('/dataTask', ktrParams)
      .then(res => {
        console.log(res)
        if (res.success) {
          this.$message.success(res.data)
          this.$router.push('/dataCollection')
        } else {
          this.$message.error(res.data)
        }
      })
      // this.$router.push('/dataCollection')
    },
    stepTo (step) {
      this.step = step
      if (this.step === MAX_STEP) {
        this.showNextStep = false
        this.showComplete = true
        this.showPreStep = true
      } else if (this.step === INIT_STEP) {
        this.showNextStep = true
        this.showPreStep = false
        this.showComplete = false
      } else if (this.step === FORM_STEP) {
        this.showNextStep = true
        this.showPreStep = false
        this.showComplete = false
      } else {
        this.showNextStep = true
        this.showComplete = false
        this.showPreStep = true
      }
      this.$router.push({name: this.viewsName[this.step - 1]})
    },
    cancelPopup () {
      this.showNextStep = true
      this.showPreStep = true
      this.showComplete = false
      this.isPopupShow = false
    },
    submitPopup () {
      // 提交
      this.$refs.moreForm.submitParmas()
      console.log('paramsData: ', this.$store.state.collectionSetting.paramsData)
      this.stepTo(++this.step)
      this.isPopupShow = false
    }
  },
  watch: {
    '$route': function (to, from) {
      if (this.$route.path === '/dataBase/connection') {
        this.stepTo(1)
      }
    }
  }
}
</script>

<style lang="scss">
.collection-setting {
  position: relative;
  .el-steps {
    .el-step {
      // cursor: pointer;
    }
  }
  .el-step__title,
  .el-step__description {
    // margin-left: -50px;
  }
  .view {
    margin: 40px 0 50px 0;
    // padding: 20px 0 20px 0;
    // border: 1px solid #eaeefb;
    // border-radius: 4px;
    // transition: .2s;
  }
  .btn-group {
    position: absolute;
    bottom: 50px;
    left: 70px;
  }
  .form-template {
    margin: 40px 0 50px 0;
    background-color: #fff;
    .content {

    }
    .button-submit {
      position: absolute;
      bottom: 50px;
      left: 150px;
    }
    .button-cancel {
      position: absolute;
      bottom: 50px;
      left: 70px;
    }
  }
}
</style>
