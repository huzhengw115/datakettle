<template lang="html">
  <div class="field-mapping-wrapper">
    <el-collapse v-model="activeName" accordion v-for="(item, index) in requestData" :key="index">
    <div @click="replaceForm(index)">
      <el-collapse-item :title="itemTitle(item.input, item.output)" :name="item.index">
        <mapping :input="item.inputFields" :output="item.outputFields" :mappings="mappings.title" :mappingsData="item.fieldsMappings" @completed="getTableMapping">
        </mapping>
      </el-collapse-item>
    </div>
    </el-collapse>

  </div>
</template>

<script type="text/ecmascript-6">
import mapping from 'components/mapping/field.vue'
import moreFormTemplate from 'components/moreForm'
import api from '../../../api'
export default {
  name: 'CSFieldMapping',
  components: {
    mapping,
    moreFormTemplate
  },
  data () {
    return {
      selectIndex: 0,
      mappings: {
        title: {
          inputTitle: '源表字段',
          outputTitle: '目标表字段',
          finishTitle: '映射关系'
        },
        data: {
          finishData: [],
          finishDataId: []
        }
      },
      requestData: [],
      activeName: 1,
      baseParams: this.$store.state.collectionSetting.baseParams
    }
  },
  created () {
    // 首先取到上个表格中的表名映射
    this.requestData = this.$store.state.collectionSetting.mappingsData.finishData
    // 去获取到表格对应的字段，首先获取第一个
    this.replaceForm(0)
    for (let i = 0; i < this.requestData.length; ++i) {
      if (this.requestData[i].fieldsMappings === '' || this.requestData[i].fieldsMappings === undefined) {
        this.requestData[i].fieldsMappings = {finishData: [], finishDataId: []}
      }
    }
    console.log('this.requestData: ', this.requestData)
  },
  methods: {
    getTableMapping (mappings) {
      let data = {}
      data.index = this.selectIndex
      data.mappings = mappings
      this.$store.commit('storedFieldsData', data)
    },
    // 模拟请求字段名，部分操作无法模拟
    // replaceForm (index) {
    //   this.selectIndex = index
    //   if (this.requestData[index].inputFields === undefined) {
    //     api.getInputFields()
    //     .then(res => {
    //       let dataObj = this.requestData[index]
    //       dataObj.inputFields = res.data
    //       this.$set(this.$data.requestData, index, dataObj)
    //     })
    //     api.getOutputFields()
    //     .then(res => {
    //       let dataObj = this.requestData[index]
    //       dataObj.outputFields = res.data
    //       this.$set(this.$data.requestData, index, dataObj)
    //     })
    //   }
    // },
    // 请求字段名
    replaceForm (index) {
      this.selectIndex = index
      if (this.requestData[index].inputFields === undefined) {
        let inputParams = this.baseParams.in
        inputParams.tbName = this.requestData[index].input
        api.getInputFields(inputParams)
        .then(res => {
          let dataObj = this.requestData[index]
          dataObj.inputFields = res.data
          this.$set(this.$data.requestData, index, dataObj)
        })
        let outputParams = this.baseParams.out
        outputParams.tbName = this.requestData[index].output
        api.getOutputFields(outputParams)
        .then(res => {
          let dataObj = this.requestData[index]
          dataObj.outputFields = res.data
          this.$set(this.$data.requestData, index, dataObj)
        })
      }
    },
    itemTitle (input, output) {
      return input + ' <=> ' + output
    },
    // 字段关系选择完了之后对数据进行梳理，为多对一关联字段提供数据
    nextStep () {
      // 所有的数据完成之后进行遍历，将多对一的表映射提取出来
      let outputFormName = this.$store.state.collectionSetting.formsData.data.output
      console.log('outputFormName: ', outputFormName)
      let params = {}
      // 数据库配置信息
      let formMappings = this.$store.state.collectionSetting.mappingsData
      // 进行遍历
      params.moreForm = []
      params.oneForm = []
      let data = formMappings
      // moreForm中的下标，用来识别存储的对象
      let a = 0
      console.log('data.finishDataId: ', data.finishDataId)
      for (let i = 0; i < data.finishDataId.length; ++i) {
        // outputName
        let outputName = outputFormName[data.finishDataId[i].output].tbName
        console.log('outputName: ', outputName)
        // 如果input大于1，就是多对一，放在moreForm中
        if (data.finishDataId[i].input.length > 1) {
          params.moreForm[a] = []
          // 然后去遍历表映射，取到映射关系
          for (let m = 0; m < data.finishData.length; ++m) {
            console.log('data.finishData[m].output: ', data.finishData[m].output)
            if (data.finishData[m].output === outputName) {
              let mapping = {}
              mapping.input = data.finishData[m].input
              mapping.output = data.finishData[m].output
              mapping.key = ''
              mapping.mappings = data.finishData[m].fieldsMappings.finishData
              params.moreForm[a].push(mapping)
            }
          }
          ++a
        } else {
          // 不大于1就是一对多或者一对一，放在oneForm中
          console.log('jinlai')
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
      this.$store.commit('paramsStorage', params)
      console.log('params: ', params)
      return params
    }
  }
}
</script>

<style lang="scss">
.field-mapping-wrapper {
  position: relative;
  .el-collapse {
    min-width: 800px;
  }
}
</style>
