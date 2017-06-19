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
              <span class="el-checkbox__label input-item" :class="data.show ? 'isInputNotAllow' : ''">
                <el-tooltip class="item" effect="dark" :content="data.note" placement="top" :open-delay="openDelay">
                  <span>{{data.colName}}</span>
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
          <el-input
            class="el-transfer-panel__filter"
            v-model="outputSearchData"
            size="small"
            placeholder="请输入搜索内容"
            :icon="outputIcon"
            @mouseenter.native="outputHover = true"
            @mouseleave.native="outputHover = false"
            @click="clearOutputQuery">
          </el-input>
          <div class="el-checkbox-group el-transfer-panel__list">
            <label class="el-checkbox el-transfer-panel__item" v-for="(data, index) in outputData" :class="isOutputSelected === index ? 'itemSelected' : ''" @click="outputSelected(index)">
              <span class="el-checkbox__label output-item" :class="data.show ? 'isOutputNotAllow' : ''">
                <el-tooltip class="item" effect="dark" :content="data.note" placement="top" :open-delay="openDelay">
                  <span>{{data.colName}}</span>
                </el-tooltip>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div class="middle-button">
        <el-button :plain="true" @click="completed" class="mapping">映射</el-button>
        <el-button :plain="true" @click="guess">猜一猜</el-button>
      </div>

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
      isInputSelected: -1,
      isOutputSelected: -1,
      inputValue: -1,
      outputValue: -1,
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
    // 列表中的字段选中
    inputSelected (index) {
      console.log('inputSelected开始')
      if (this.inputData[index].show === true) {
        return
      }
      for (let i = 0; i < this.input.length; ++i) {
        if (this.inputData[index].colName === this.input[i].colName) {
          this.inputValue = i
          this.isInputSelected = index
        }
      }
      console.log('inputSelected结束')
    },
    outputSelected (index) {
      if (this.outputData[index].show === true) {
        return
      }
      for (let i = 0; i < this.output.length; ++i) {
        if (this.outputData[index].colName === this.output[i].colName) {
          this.outputValue = i
          this.isOutputSelected = index
        }
      }
    },
    inputSearch (queryString) {
      let restaurants = this.input
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      this.inputData = results
    },
    outputSearch (queryString) {
      let restaurants = this.output
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      this.outputData = results
    },
    createFilter (queryString) {
      return (restaurant) => {
        // colName为接收到之后的字段名
        return (restaurant.colName.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    // 映射字段，并且将映射的关系保存到store中
    completed () {
      if (this.isInputSelected === -1 || this.isOutputSelected === -1) {
        this.$message('请正确选择')
        return
      }
      let finishDataId = this.finishDataId
      let inputValue = this.inputValue
      let outputValue = this.outputValue
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].input === inputValue) {
          let outputDataId = finishDataId[i].output
          for (let m = 0; m < outputDataId.length; ++m) {
            if (outputValue === outputDataId[m]) {
              this.$message('此条转换已存在')
              return
            }
          }
        }
      }
      let input = this.input[inputValue].colName
      let output = this.output[outputValue].colName
      let dataObject = {}
      dataObject.input = input
      dataObject.output = output
      dataObject.number = {input: inputValue, output: outputValue}
      this.finishData.push(dataObject)
      let isExistence = false
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].input === inputValue) {
          this.finishDataId[i].output.push(outputValue)
          isExistence = true
        }
      }
      if (isExistence === false) {
        let data = {}
        data.input = inputValue
        data.output = []
        data.output.push(outputValue)
        this.finishDataId.push(data)
      }
      let finsihObj = {}
      finsihObj.finishData = this.finishData
      finsihObj.finishDataId = this.finishDataId
      this.$emit('completed', finsihObj)
      // 将列表中的字段样式改变，禁止选择
      let inputObj = this.inputData[this.isInputSelected]
      inputObj.show = true
      this.$set(this.inputData, this.isInputSelected, inputObj)
      let outputObj = this.outputData[this.isOutputSelected]
      outputObj.show = true
      this.$set(this.outputData, this.isOutputSelected, outputObj)
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
        if (finishDataId[i].input === input) {
          let outputData = finishDataId[i].output
          for (let m = 0; m < outputData.length; ++m) {
            if (outputData[m] === output) {
              // finishDataId[i].input是前面input列表的下标
              // finishDataId[i].output[m]是后面output列表的下标，按这个进行样式恢复操作
              this.inputData[finishDataId[i].input].show = false
              this.outputData[finishDataId[i].output[m]].show = false
              outputData.splice(m, 1)
              this.finishDataId[i].output = outputData
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
        // 并且将前面的所有样式进行恢复
        for (let i = 0; i < this.inputData.length; ++i) {
          this.inputData[i].show = false
        }
        for (let i = 0; i < this.outputData.length; ++i) {
          this.outputData[i].show = false
        }
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
    },
    // 猜一猜
    guess () {
      // 首先是从output开始遍历
      let inputData = this.input
      let outputData = this.output
      for (let i = 0; i < outputData.length; ++i) {
        for (let m = 0; m < inputData.length; ++m) {
          if (outputData[i].colName === inputData[m].colName) {
            // 若两者的名字相同，就直接执行映射
            this.isInputSelected = m
            this.inputValue = m
            this.isOutputSelected = i
            this.outputValue = i
            this.completed()
          }
        }
      }
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
    outputSearchData () {
      if (this.outputSearchData === '') {
        this.outputData = this.output
      } else {
        this.outputSearch(this.outputSearchData)
      }
    },
    input () {
      this.inputData = this.input
      console.log('this.input', this.input)
    },
    output () {
      this.outputData = this.output
    }
  },
  created () {
    this.finishData = this.mappingsData.finishData
    this.finishDataId = this.mappingsData.finishDataId
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
      .isInputNotAllow {
        cursor: not-allowed;
        color: #ccc;
        background-color: #fff;
        margin-left: -20px;
        width: 198px;
        padding-left: 20px;
      }
      .input-item {
        // padding: 0;
        .item {
          // padding: 5px 0;
        }
      }
    }
    .panel-output {
      .itemSelected {
        background-color: #e4e8f1;
      }
      .isOutputNotAllow {
        cursor: not-allowed;
        color: #ccc;
        background-color: #fff;
        margin-left: -20px;
        width: 198px;
        padding-left: 20px;
      }
      .output-item {
        // padding: 0;
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
    .middle-button {
      display: inline-block;
      width: 76px;
      button {
        margin: 0;
        margin-bottom: 5px
      }
      .mapping {
        margin-left: 7px;
      }
    }
  }
}

</style>
