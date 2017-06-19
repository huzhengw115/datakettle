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
      isInputSelected: -1,
      isOutputSelected: -1,
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
    inputSelected (index) {
      this.isInputSelected = index
    },
    outputSelected (index) {
      this.isOutputSelected = index
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
        return (restaurant.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    completed () {
      if (this.isInputSelected === -1 || this.isOutputSelected === -1) {
        this.$message('请正确选择')
        return
      }
      let finishDataId = this.finishDataId
      let isInputSelected = this.isInputSelected
      let isOutputSelected = this.isOutputSelected
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].output === isOutputSelected) {
          let inputDataId = finishDataId[i].input
          for (let m = 0; m < inputDataId.length; ++m) {
            if (isInputSelected === inputDataId[m]) {
              this.$message('此条转换已存在')
              return
            }
          }
        }
      }
      let input = this.inputData[isInputSelected].tbName
      let output = this.outputData[isOutputSelected].tbName
      let dataObject = {}
      dataObject.input = input
      dataObject.output = output
      dataObject.number = {input: isInputSelected, output: isOutputSelected}
      this.finishData.push(dataObject)
      this.isInputSelected = -1
      this.isOutputSelected = -1
      let isExistence = false
      for (let i = 0; i < finishDataId.length; ++i) {
        if (finishDataId[i].output === isOutputSelected) {
          this.finishDataId[i].input.push(isInputSelected)
          isExistence = true
        }
      }
      if (isExistence === false) {
        let data = {}
        data.input = []
        data.output = isOutputSelected
        data.input.push(isInputSelected)
        this.finishDataId.push(data)
      }
      let finsihObj = {}
      finsihObj.finishData = this.finishData
      finsihObj.finishDataId = this.finishDataId
      this.$emit('completed', finsihObj)
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
