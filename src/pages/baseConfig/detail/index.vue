<template lang="html">
  <div class="base-detail">
    <div class="head">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="all-check">全选</el-checkbox>
    </div>
    <div class="content">
      <el-checkbox-group v-model="checkedData" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="data in formData" :label="data" :key="data" class="checkbox">{{data}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submit" class="sbt">提交</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../api'
export default {
  data () {
    return {
      checkAll: true,
      checkedData: [],
      isIndeterminate: true,
      formData: []
    }
  },
  methods: {
    handleCheckAllChange (event) {
      this.checkedData = event.target.checked ? this.formData : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.formData.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.formData.length
    },
    submit () {
      console.log('提交checkedData: ', this.checkedData)
    }
  },
  created () {
    api.getDnaForm()
    .then(res => {
      let data = res.data.baseForm
      for (let i = 0; i < data.length; ++i) {
        this.$set(this.formData, i, data[i].tbName)
        // this.formData[i] = data[i].tbName
      }
      console.log('this.formData: ', this.formData)
    })
  }
}
</script>

<style lang="scss">
.base-detail {
  .head {
    height: 20px;
    margin-bottom: 20px;
    .all-check {
      margin: 0 0 20px 15px;
    }
  }
  .content {
    .checkbox {
      margin: 0 0 20px 15px;
      width: 15%;
    }
  }
  .footer {
    position: relative;
    .sbt {
      position: absolute;
      top: 50px;
      right: 100px;
    }
  }
}
</style>
