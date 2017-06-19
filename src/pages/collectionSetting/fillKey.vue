<template lang="html">
  <div class="fill-key">
  <p>填写主键</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      paramsData: {},
      isMoreShow: false
    }
  },
  methods: {
    mappingsHandle () {
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
      console.log('submitData: ', params)
      this.paramsData = params
      // 处理完之后判断多对一是否存在
      // 大于0即存在多对一，需要添加主键
      if (params.moreForm.length > 0) {
        this.isMoreShow = true
      }
    }
  },
  created () {
    this.mappingsHandle()
  }
}
</script>

<style lang="scss">
.fill-key {

}
</style>
