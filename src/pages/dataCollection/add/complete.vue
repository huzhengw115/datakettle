<template lang="html">
  <div class="complete-wrapper">
    <div class="message" v-for="(item, index) in messages" :key="index">
      <el-alert
        :title="alertTitle(item)"
        :type="alertType[item.type]"
        :description="item.description"
        show-icon
        :closable="false"></el-alert>
    </div>
    <el-form>
      <el-form-item label="标题" required>
        <el-input v-model="mappingsTitle"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" placeholder="这里填写该转换的描述"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CSComplete',
  data () {
    return {
      alertType: ['success', 'info', 'warning', 'error'],
      messages: [{
        title: '数据库连接',
        type: 0,
        description: ''
      }, {
        title: '表映射',
        type: 0,
        description: ''
      }, {
        title: '字段映射',
        type: 0,
        description: ''
      }],
      data: [{
        asd: 'asd'
      }]
    }
  },
  computed: {
    mappingsTitle () {
      let date = new Date()
      return this.$store.state.collectionSetting.baseParams.in.sDBName + '<=>' + this.$store.state.collectionSetting.baseParams.out.sDBName + '(' + date.toLocaleString() + ')'
    }
  },
  methods: {
    alertTitle (item) {
      if (this.alertType[item.type] === 'success') {
        return `${item.title}成功`
      }
      if (this.alertType[item.type] === 'error') {
        return `${item.title}失败`
      }
    }
  }
}
</script>

<style lang="scss">
.complete-wrapper {
  width: 720px;
  .message {
    padding: 10px 0;
  }
}
</style>
