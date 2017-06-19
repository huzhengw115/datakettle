<template lang="html">
  <div>
    <mapping :input="inputData" :output="outputData" :mappings="mappings.title" :mappingsData="mappings.data" @completed="getTableMapping" ref="formList"></mapping>
  </div>
</template>

<script type="text/ecmascript-6">
import Mapping from 'components/mapping'
import api from '../../api'
export default {
  name: 'CSTableMapping',
  components: {
    Mapping
  },
  data () {
    return {
      formData: {},
      inputData: [],
      outputData: [],
      mappings: {
        title: {
          inputTitle: '源数据库表',
          outputTitle: '目标数据库表',
          finishTitle: '表关联'
        },
        data: {
          finishData: [],
          finishDataId: []
        }
      },
      mappingsTitle: {
        inputTitle: '源数据库表',
        outputTitle: '目标数据库表',
        finishTitle: '表关联'
      }
    }
  },
  methods: {
    getTableMapping (data) {
      this.$store.commit('storedMappingsData', data)
      // console.log(`tableMapping: ${data}`)
    }
  },
  created () {
    // 判断数据库的配置是否发生变化
    // 首先去请求两个表格的数据，params为请求的参数
    let params = this.$store.state.collectionSetting.baseParams
    let forms = this.$store.state.collectionSetting.formsData
    if (forms.link === '') {
      // 分两次获取数据库表名
      console.log('params: ', params)
      api.getInputForms(params.in)
      .then(res => {
        // this.inputData = res.data.inputFormsName
        this.inputData = res.data
        this.$store.commit('storedForms', {type: 'input', data: this.inputData})
      })
      api.getOutputForms(params.out)
      .then(res => {
        // 连接的时候将后面去掉
        // this.outputData = res.data.outputFormsName
        this.outputData = res.data
        this.$store.commit('storedForms', {type: 'output', data: this.outputData})
      })
      this.mappings.data = this.$store.state.collectionSetting.mappingsData
      // this.$store.commit('storedForms', {input: this.inputData, output: this.outputData})
    } else {
      this.inputData = forms.data.input
      this.outputData = forms.data.output
      this.mappings.data = this.$store.state.collectionSetting.mappingsData
    }
  }
}
</script>

<style lang="scss">
</style>
