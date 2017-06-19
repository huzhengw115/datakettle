<template lang="html">
  <div class="collection-add">
    <div class="content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">

        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="采集目标" prop="url">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>

        <el-form-item label="采集分类" prop="category">
          <el-radio-group v-model="ruleForm.category" @change="changeCategory">
            <el-radio :label="1">单页采集</el-radio>
            <el-radio :label="2">列表采集</el-radio>
          </el-radio-group>
        </el-form-item>

      <div class="aa" v-if="isShow">
    
        <el-form-item label="列表页地址格式:" prop="beginAddress">
          <el-input v-model="ruleForm.beginAddress"></el-input>
        </el-form-item>


        <el-form-item label="列表页加载方式" prop="loadType">
          <el-radio class="radio" v-model="ruleForm.loadType" label="1">单页采集</el-radio>
          <el-radio class="radio" v-model="ruleForm.loadType" label="2">列表采集</el-radio>
          <el-radio class="radio" v-model="ruleForm.loadType" label="3">列表采集</el-radio>
        </el-form-item>
      </div>

      <div class="bb"  v-else>
         <el-form-item label="信息页加载方式" prop="loadType">
          <el-radio class="radio" v-model="ruleForm.loadType" label="1">单页采集</el-radio>
          <el-radio class="radio" v-model="ruleForm.loadType" label="2">列表采集</el-radio>
          <el-radio class="radio" v-model="ruleForm.loadType" label="3">列表采集</el-radio>
        </el-form-item>
      </div>

      <el-form-item label="是否自动采集" prop="isAuto">
        <el-checkbox v-model="ruleForm.isAuto">勾选此项后，系统将更具设定时间自动采集</el-checkbox>
      </el-form-item>

        <el-form-item label="活动时间" class="date-select" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.data" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"> -- </el-col>
          <el-col :span="11">
            <el-form-item prop="beginDate">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.beginDate" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="cycle" label="循环周期" prop="cycle">
          <el-input v-model="ruleForm.cycle">h</el-input>
        </el-form-item>

        <el-form-item class="contentRange" label="采集内容" prop="contentRange">
          <ul>
            <li class="li-name"><p>存储栏目名称</p></li>
            <li class="li-contentRange"><p>采集规则</p></li>
          </ul>
          <ul class="ul-input" v-for="(date, index) in ruleForm.contentRange">
            <li><el-input v-model="ruleForm.contentRange[index].title" placeholder="内容"></el-input></li>
            <li><el-input v-model="ruleForm.contentRange[index].contentRule" placeholder="Xpath"></el-input></li>
        <!--     <li><el-input v-model="ruleForm.contentRange[index].endTag" placeholder="终止符"></el-input></li> -->
            <li><el-checkbox v-model="ruleForm.contentRange[index].isIncluded">包含头尾</el-checkbox></li>
          </ul>
          <el-button type="primary" icon="plus" @click="addContentRange"></el-button>
        </el-form-item>

        <el-form-item label="是否采集图片" prop="image">
          <el-checkbox v-model="ruleForm.image">勾选此项后,将原地址保存图片</el-checkbox>
        </el-form-item>

        <el-form-item label="标签过滤" prop="filter">
          <el-input type="textarea" v-model="ruleForm.filter"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../../../api'
export default {
  data () {
    return {
      ruleForm: {
        id: '',
        name: '',
        url: '',
        category: 1,
        beginAddress: '',
        endAddress: '',
        loadType: '1',
        isAuto: false,
        data: '',
        beginDate: '',
        cycle: '',
        contentRange: [{title: '', contentRule: '', isIncluded: false}],
        image: false,
        filter: ''
      },
      isShow: false,
      rules: {
        url: [
          { required: true, message: '请输入采集目标', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (this.ruleForm.url === '' || this.ruleForm.beginDate === '') {
        this.$message.error('请完整填写配置')
        return
      }
      this.ruleForm.contentRange = JSON.stringify(this.ruleForm.contentRange)
      if (this.ruleForm.id !== '') {
        api.put('/spiderTask', this.ruleForm)
        .then(res => {     // axios的写法
          this.showStatus(res)
        })
      } else {
        api.post('/spiderTask', this.ruleForm)
        .then(res => {     // axios的写法
          this.showStatus(res)
        })
      }
    },
    // 显示提示信息
    showStatus (res) {
      switch (res.status) {
        case 201:
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.$router.push('/dataCollection/index')
          break
        case 204:
          this.$message({
            message: '编辑成功!',
            type: 'success'
          })
          this.$router.push('/dataCollection/index')
          break
        case 400:
          this.$message({
            message: '参数有误!',
            type: 'warning'
          })
          break
        case 500:
          this.$message.error('编辑失败!')
          break
      }
    },
    // 采集分类切换
    changeCategory () {
      this.isShow = !this.isShow
      // console.log(1111)
    },
    // 增加采集内容
    addContentRange () {
      this.ruleForm.contentRange.push({title: '', contentRule: '', isIncluded: false})
    },
    // 情况表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created () {
    let routeData = this.$store.state.routeData.routeData
    let contentRange = JSON.parse((routeData.contentRange).substring(1, routeData.contentRange.length - 1))
    let data = {
      title: contentRange.title,
      contentRule: contentRange.contentRule,
      isIncluded: contentRange.isIncluded
    }
    routeData.contentRange = [data]
    this.ruleForm = routeData
  }
}
</script>

<style lang="scss">
.collection-add {
  .content {
    .date-select {
      .line {
        text-align: center;
      }
    }
    .cycle {
      width: 150px;
    }
    ul {
      display: flex;
      li {
        list-style-type:none;
        .li-name > p {
          width: 100px;
        }
        .li-contentRange > p {
          width: 200px;
        }
      }
    }
    .ul-input input {
      width: 100px;
      margin: 5px 5px 5px 0;
    }
  }
}
</style>
