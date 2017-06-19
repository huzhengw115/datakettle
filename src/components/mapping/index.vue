<template>
  <div class="mapping">
    <div class="mapping-content">
      <div class="el-transfer-panel panel-input">
        <p class="el-transfer-panel__header">{{mappings.inputTitle}}</p>
        <div class="el-transfer-panel__body">
          <el-input
            class="el-transfer-panel__filter"
            v-model="inputSearchData"
            size="small"
            placeholder="请输入搜索内容"
            :icon="inputIcon"
            @mouseenter.native="inputHover = true"
            @mouseleave.native="inputHover = false"
            @click="clearInputQuery">
          </el-input>
          <div class="el-checkbox-group el-transfer-panel__list">
            <label class="el-checkbox el-transfer-panel__item" v-for="(data, index) in inputData" :class="isInputSelected === index ? 'itemSelected' : ''" @click="inputSelected(index)">
              <span class="el-checkbox__label input-item">
                <el-tooltip class="item" effect="dark" :content="data.note" placement="top" :open-delay="openDelay">
                  <span>{{data.tbName}}</span>
                </el-tooltip>
              </span>
            </label>
          </div>
        </div>
      </div>

      <i class="el-icon-plus mappings-add"></i>

      <div class="el-transfer-panel panel-output">
        <p class="el-transfer-panel__header">{{mappings.outputTitle}}</p>
        <div class="el-transfer-panel__body">
          <!-- <el-input
            class="el-transfer-panel__filter"
            v-model="outputSearchData"
            size="small"
            placeholder="请输入搜索内容"
            :icon="outputIcon"
            @focus="focus"
            @blur="blur"
            @mouseenter.native="outputHover = true"
            @mouseleave.native="outputHover = false"
            @click="clearOutputQuery">
          </el-input> -->
          <el-select v-model="outputSearchData" filterable placeholder="请选择" @change="requestForm" size="mini" class="output-select">
            <el-option
              v-for="item in departmentData"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <div class="el-checkbox-group el-transfer-panel__list">
            <label class="el-checkbox el-transfer-panel__item" v-for="(data, index) in outputData" :class="isOutputSelected === index ? 'itemSelected' : ''" @click="outputSelected(index)">
              <span class="el-checkbox__label output-item">
                <el-tooltip class="item" effect="dark" :content="data.note" placement="top" :open-delay="openDelay">
                  <span>{{data.tbName}}</span>
                </el-tooltip>
              </span>
            </label>
          </div>
        </div>
      </div>

      <el-button :plain="true" @click="completed">映射</el-button>

      <div class="el-transfer-panel panel-finish">
        <p class="el-transfer-panel__header">{{mappings.finishTitle}}</p>
        <div class="el-transfer-panel__body">
          <div class="el-checkbox-group el-transfer-panel__list">
            <label class="el-checkbox el-transfer-panel__item finish-list" v-for="(data, index) in finishData">
              <span class="el-checkbox__label finish-item">
                <span class="item-input">
                  <el-tooltip class="item" effect="dark" :content="data.input" placement="top" :open-delay="openDelay">
                    <p class="item-data">{{data.input}}</p>
                  </el-tooltip>
                </span>

                <span class="item-middle">
                  <span class="icon-transf"></span>
                </span>

                <span class="item-output">
                  <el-tooltip class="item" effect="dark" :content="data.output" placement="top" :open-delay="openDelay">
                    <p class="item-data">{{data.output}}</p>
                  </el-tooltip>
                </span>
              </span>
              <span class="el-icon-close finish-close" @click="cancelFinishData(index)"></span>
            </label>
          </div>
        </div>
        <div class="el-transfer-panel__footer finish-footer">
          <p class="footer-number">共 {{finishData.length}} 项</p>
          <span class="footer-delete">
            <el-button type="text" @click="deleteFinishData" class="delete-button" :class="{'allow-delete': finishData.length}"><i class="el-icon-delete"></i></el-button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mapping',
  props: ['input', 'output', 'mappings', 'mappingsData'],
  data () {
    return {
      inputData: this.input,
      outputData: this.output,
      departmentData: [{name: '公安局'}, {name: '社保局'}, {name: '土地局'}, {name: '这个是名字比较长的局1'}, {name: '这个是名字比较长的局2'}, {name: '这个是名字比较长的局3'}, {name: '这个是名字比较长的局4'}, {name: '这个是名字比较长的局5'}, {name: '这个是名字比较长的局6'}, {name: '这个是名字比较长的局7'}, {name: '这个是名字比较长的局8'}, {name: '这个是名字比较长的局9'}, {name: '这个是名字比较长的局0'}],
      // 页面上面选中的表名
      isInputSelected: -1,
      isOutputSelected: -1,
      // 用来传值的，原因为下面的问题，只为了填坑
      inputValue: -1,
      outputValue: -1,
      // 搜索的值
      inputSearchData: '',
      outputSearchData: '',
      mappingData: {
        finishData: [],
        finishDataId: []
      },
      // finishData: this.mappings.data.finishData,
      // finishDataId: this.mappings.data.finishDataId,
      finishData: [],
      finishDataId: [],
      openDelay: 1000
    }
  },
  methods: {
    clearInputQuery () {
      if (this.inputIcon === 'circle-close') {
        this.inputSearchData = ''
      }
    },
    clearOutputQuery () {
      if (this.outputIcon === 'circle-close') {
        this.outputSearchData = ''
      }
    },
    // input表名选中的点击
    inputSelected (index) {
      // for (let i = 0; i < this.input.length; ++i) {
      //   if (this.inputData[index].tbName === this.input[i].tbName) {
      //     this.inputValue = i
      //     this.isInputSelected = index
      //   }
      // }
      this.isInputSelected = index
    },
    // output表名选中的点击
    outputSelected (index) {
      // for (let i = 0; i < this.output.length; ++i) {
      //   if (this.outputData[index].tbName === this.output[i].tbName) {
      //     this.outputValue = i
      //     this.isOutputSelected = index
      //   }
      // }
      this.isOutputSelected = index
    },
    // input搜索的功能
    inputSearch (queryString) {
      let restaurants = this.input
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      this.inputData = results
    },
    // output搜索的功能
    // outputSearch (queryString) {
    //   let restaurants = this.output
    //   let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    //   this.outputData = results
    // },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.tbName.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    // output根据输入框内容进行数据列表的搜索
    requestForm () {
      // api.get
      this.outputData = [{id: 23, tbName: 'role', remark: '角色表'}, {id: 34, tbName: 'menu', remark: '菜单表'}]
      console.log('lll: ', this.outputSearchData)
    },
    // 点击映射
    completed () {
      // 首先判断两个表名是否都选择完毕
      if (this.isInputSelected === -1 || this.isOutputSelected === -1) {
        this.$message('请正确选择')
        return
      }
      // finishDataId 代表着已经完成的映射
      let finishDataId = this.finishDataId
      // let inputValue = this.inputValue
      // let outputValue = this.outputValue
      let inputValue = this.inputData[this.isInputSelected].id
      let outputValue = this.outputData[this.isOutputSelected].id
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].output === outputValue) {
          let inputDataId = finishDataId[i].input
          for (let m = 0; m < inputDataId.length; ++m) {
            if (inputValue === inputDataId[m]) {
              this.$message('此条转换已存在')
              return
            }
          }
        }
      }
      let input = this.inputData[this.isInputSelected].tbName
      let output = this.outputData[this.isOutputSelected].tbName
      let dataObject = {}
      dataObject.input = input
      dataObject.output = output
      dataObject.number = {input: inputValue, output: outputValue}
      this.finishData.push(dataObject)
      let isExistence = false
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].output === outputValue) {
          this.finishDataId[i].input.push(inputValue)
          isExistence = true
        }
      }
      if (isExistence === false) {
        let data = {}
        data.input = []
        data.output = outputValue
        data.input.push(inputValue)
        this.finishDataId.push(data)
      }
      let finsihObj = {}
      finsihObj.finishData = this.finishData
      finsihObj.finishDataId = this.finishDataId
      this.$emit('completed', finsihObj)
      // 将数据归零
      this.inputValue = -1
      this.outputValue = -1
      this.isInputSelected = -1
      this.isOutputSelected = -1
    },
    // 删除选中的数据
    cancelFinishData (index) {
      let finishData = this.finishData
      let finishDataId = this.finishDataId
      let input = finishData[index].number.input
      let output = finishData[index].number.output
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].output === output) {
          let inputData = finishDataId[i].input
          for (let m = 0; m < inputData.length; ++m) {
            if (inputData[m] === input) {
              inputData.splice(m, 1)
              this.finishDataId[i].input = inputData
            }
          }
        }
      }
      this.finishData.splice(index, 1)
      let finsihObj = {}
      finsihObj.finishData = this.finishData
      finsihObj.finishDataId = this.finishDataId
      this.$emit('completed', finsihObj)
    },
    // 删除所有的数据
    deleteFinishData () {
      if (this.finishData.length === 0) {
        return
      }
      this.$confirm('是否删除所有数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.finishData = []
        this.finishDataId = []
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        let finsihObj = {}
        finsihObj.finishData = this.finishData
        finsihObj.finishDataId = this.finishDataId
        this.$emit('completed', finsihObj)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    dataSubmit () {
      return this.finishData
    }
  },
  computed: {
    inputIcon () {
      return this.inputSearchData.length > 0 && this.inputHover
      ? 'circle-close'
      : 'search'
    },
    outputIcon () {
      return this.outputSearchData.length > 0 && this.outputHover
      ? 'circle-close'
      : 'search'
    }
  },
  watch: {
    inputSearchData () {
      if (this.inputSearchData === '') {
        this.inputData = this.input
      } else {
        this.inputSearch(this.inputSearchData)
      }
    },
    // outputSearchData () {
    //   if (this.outputSearchData === '') {
    //     this.outputData = this.output
    //   } else {
    //     this.outputSearch(this.outputSearchData)
    //   }
    // },
    input () {
      this.inputData = this.input
    },
    output () {
      this.outputData = this.output
    }
  },
  created () {
    this.finishData = this.mappingsData.finishData
    this.finishDataId = this.mappingsData.finishDataId
    // console.log('created前的input: ', this.input)
  }
}
</script>

<style lang="scss">

.mapping {
  .mapping-content {
    .panel-input {
      .itemSelected {
        background-color: #e4e8f1;
      }
      .input-item {
        padding: 0;
        .item {
          padding: 5px 0;
        }
      }
    }
    .panel-output {
      .itemSelected {
        background-color: #e4e8f1;
      }
      .output-item {
        padding: 0;
      }
      .output-select {
        width: 90%;
        margin: 10px 0 0 10px;
      }
    }
    .mappings-add {
      margin: 10px;
    }
    .panel-finish{
      width: 250px;
      .finish-list {
        display: flex;
        padding: 0;
        .finish-item {
          padding: 0 0 0 10px;
          display: flex;
          .item-input, .item-output {
            flex: 1;
            padding: 0 10px;
            .item-data {
              padding: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 81px;
            }
          }
          .item-input {
            .item-data {
              text-align: right;
            }
          }
        }
        .finish-close {
          font-size: 12px;
          height: 32px;
          line-height: 32px;
          margin-right: 10px;
          color: #999;
        }
      }
      .finish-footer {
        display: flex;
        height: 36px;
        line-height: 36px;
        .footer-number {
          flex: 1;
          text-align: left;
          padding-left: 10px;
          font-size: 14px;
        }
        .footer-delete {
          padding-right: 10px;
          .delete-button {
            color: #ccc;
          }
          .allow-delete {
            color: #20a0ff;
          }
        }
      }
    }
    .item-middle {
      margin-top: 2px;
    }
  }
}

</style>
