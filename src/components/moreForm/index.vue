<template>
  <div class="more-form">
    <div class="key-select">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="'目标表名: ' + data[0].output" :name="index" v-for="(data, index) in paramsData.moreForm">
          <div class="list" v-for="list in data">
            <div class="item">
              <span class="title">{{list.input}}: </span>
              <el-select v-model="list.key" filterable placeholder="请选择">
                <el-option
                  v-for="item in list.mappings"
                  :key="item.input"
                  :label="item.input"
                  :value="item.input">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
export default {
  name: 'moreForm',
  props: ['moreFormData'],
  data () {
    return {
      paramsData: this.moreFormData,
      isMoreShow: false,
      inputFormName: []
    }
  },
  methods: {
    submitParmas () {
      this.paramsData.base = this.$store.state.collectionSetting.baseParams
      this.$store.commit('paramsStorage', this.paramsData)
    }
  },
  created () {
    console.log('data: ', this.paramsData.moreForm)
  }
}
</script>

<style lang="scss">
.more-form {
  .key-select {
    .el-collapse-item__content {
      display: flex;
      flex-wrap: wrap;
      .list {
        width: 50%;
        .item {
          margin-bottom: 15px;
        }
      }
    }
  }
}
</style>
