<template lang="html">
  <div class="collection-setting">
    <el-steps :space="200" :active="step">
      <!-- <el-step title="步骤 1 － 连接配置" description="这是一段描述性文字"></el-step>
      <el-step title="步骤 2 － 表映射" description="这是一段描述性文字"></el-step>
      <el-step title="步骤 3 － 字段映射" description="这是一段描述性文字"></el-step>
      <el-step title="步骤 4 － 完成" description="这是一段描述性文字"></el-step> -->
      <el-step title="步骤 1 － 连接配置" description="数据库配置" @click.native="stepTo(1)"></el-step>
      <el-step title="步骤 2 － 表映射" description="表映射" @click.native="stepTo(2)"></el-step>
      <el-step title="步骤 3 － 字段映射" description="这是一段描述性文字" @click.native="stepTo(3)"></el-step>
      <el-step title="步骤 4 － 完成" description="这是一段描述性文字" @click.native="stepTo(4)"></el-step>
      <el-step title="步骤 5 － 完成" description="这是一段描述性文字" @click.native="stepTo(5)"></el-step>
    </el-steps>
    <router-view class="view" ref="dataSubmit"></router-view>
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
const KEY_STEP = 4
const MAX_STEP = 5 // 完成页面
import api from '../../api'
// import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'CSIndex',
  data () {
    return {
      radio: {
        index: 3
      },
      step: INIT_STEP,
      showPreStep: false,
      showNextStep: true,
      showComplete: false,
      viewsName: ['CSConnection', 'CSTableMapping', 'CSFieldMapping', 'CSFillKey', 'CSComplete']
    }
  },
  created () {
    this.$router.push({name: 'CSIndex'})
    this.step = INIT_STEP
    this.$store.commit('INIT_CONNECTION_OBJ')
  },
  methods: {
    preStep () {
      if (this.step > INIT_STEP) {
        this.stepTo(--this.step)
      }
    },
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
        // 判断表映射是否为空，若为空不能跳转
        let mappingsData = this.$store.state.collectionSetting.mappingsData
        console.log('mappingsData: ', mappingsData)
        if (mappingsData.finishData.length === 0) {
          this.$message.error('请至少填写一段映射关系')
          return
        }
        this.stepTo(++this.step)
      } else if (this.step === FEILD_STEP) {
        // 判断是否所有的字段映射都完成了
        let number = this.$store.state.collectionSetting.mappingsNumber
        let mappingsData = this.$store.state.collectionSetting.mappingsData.finishData
        console.log('mappings: ', this.$store.state.collectionSetting.mappingsData)
        if (number < mappingsData.length) {
          this.$message.error('请填写完所有的字段映射关系')
          return
        }
        this.stepTo(++this.step)
      } else if (this.step === KEY_STEP) {
        this.stepTo(++this.step)
      } else if (this.step === MAX_STEP) {
        this.$refs.dataSubmit.storedData()
        this.stepTo(++this.step)
      }
    },
    complete () {
      // 所有的数据完成之后进行遍历，将多对一的表映射提取出来
      let outputFormName = this.$store.state.collectionSetting.formsData.data.output
      let params = {}
      // 数据库配置信息
      let formMappings = this.$store.state.collectionSetting.mappingsData
      // 进行遍历
      params.base = this.$store.state.collectionSetting.baseParams
      params.moreForm = []
      params.oneForm = []
      let data = formMappings
      // moreForm中的下标，用来识别存储的对象
      let a = 0
      for (let i = 0; i < data.finishDataId.length; ++i) {
        let outputName = outputFormName[data.finishDataId[i].output].tbName
        // 如果input大于1，就是多对一，放在moreForm中
        if (data.finishDataId[i].input.length > 1) {
          console.log('进来了几次')
          params.moreForm[a] = []
          // 然后去遍历表映射，取到映射关系
          for (let m = 0; m < data.finishData.length; ++m) {
            if (data.finishData[m].output === outputName) {
              let mapping = {}
              mapping.input = data.finishData[m].input
              mapping.output = data.finishData[m].output
              mapping.mappings = data.finishData[m].fieldsMappings.finishData
              params.moreForm[a].push(mapping)
            }
          }
          ++a
        } else {
          // 不大于1就是一对多或者一对一，放在oneForm中
          for (let m = 0; m < data.finishData.length; ++m) {
            if (data.finishData[m].output === outputName) {
              let mapping = {}
              mapping.input = data.finishData[m].input
              mapping.output = data.finishData[m].output
              mapping.mappings = data.finishData[m].fieldsMappings.finishData
              params.oneForm.push(mapping)
            }
          }
        }
      }
      // console.log('submitData: ', params)
      params = JSON.stringify(params)
      let ktrParams = {}
      ktrParams.params = params
      console.log('params: ', params)
      // params.base = JSON.stringify(params.base)
      // params.oneForm = JSON.stringify(params.oneForm)
      // params.moreForm = JSON.stringify(params.moreForm)
      api.submitPost(ktrParams)
      .then(res => {
        console.log('res: ', res)
      })
      // 完成之后的跳转
      // this.$router.push({name: 'TransformIndex'})
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
}
</style>
