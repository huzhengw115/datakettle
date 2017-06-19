import {
  INIT_CONNECTION_OBJ,
  SET_CONNECTION_TEST,
  SET_CONNECTION_INPUT_TABLES,
  SET_CONNECTION_OUTPUT_TABLES
} from '../mutationTypes.js'

const state = {
  csInputObj: {},
  csOutputObj: {},
  baseParams: {},
  dataBase: [false, false],
  formMapping: [],
  // 获取的表名
  formsData: {
    data: {},
    link: ''
  },
  // 映射关系
  mappingsData: {
    finishData: [],
    finishDataId: []
  },
  // 映射关系
  mappingsParams: [],
  fieldsData: [],
  mappingsNumber: 0,
  // 梳理完的数据结构，最终上传的数据
  paramsData: {}
}

const getters = {
  csInputObj: (state) => { return state.csInputObj },
  csOutputObj: (state) => { return state.csOutputObj }
}

const mutations = {
  [INIT_CONNECTION_OBJ] (state, data) {
    const arr = [{}, {}] // 第一个是源数据库， 第二个是目标数据库
    const databaseDefine = {
      title: ['请选择源数据库', '请选择目标数据库'],
      type: {
        label: '数据库类型',
        options: ['ORACLE', 'MYSQL'],
        default: 1
      },
      server: {
        label: 'IP地址',
        default: '127.0.0.1'
      },
      port: {
        label: '端口号',
        default: '3306'
      },
      username: {
        label: '用户名',
        default: 'root'
      },
      password: {
        label: '密码',
        default: 'root'
      },
      database: {
        label: '数据库名',
        default: 'kettletest'
      }
    }
    Object.keys(databaseDefine).forEach((key) => {
      arr.forEach((database, index) => {
        if (key === 'title') {
          database[key] = databaseDefine[key][index]
        } else {
          database[key] = {}
          database[key].label = databaseDefine[key].label
          database[key].value = databaseDefine[key].default
          let options = databaseDefine[key].options
          if (options) {
            database[key].options = options
          }
        }
      })
    })
    state.csInputObj = {}
    state.csInputObj['connection'] = arr[0]
    state.csInputObj['test'] = false
    state.csInputObj['tables'] = {}

    state.csOutputObj = {}
    state.csOutputObj['connection'] = arr[1]
    state.csOutputObj['test'] = false
    state.csOutputObj['tables'] = {}
  },
  [SET_CONNECTION_TEST] (state, data) {
    if (data.index === 0) {
      state.csInputObj.test = data.test
    }
    if (data.index === 1) {
      state.csOutputObj.test = data.test
    }
  },
  [SET_CONNECTION_INPUT_TABLES] (state, data) {

  },
  [SET_CONNECTION_OUTPUT_TABLES] (state, data) {

  },
  // 页面加载初期将所有的数据清空
  cleanStore (state, data) {
    state.baseParams = {}
    state.dataBase = [false, false]
    state.formMapping = []
    state.formsData = {data: {}, link: ''}
    state.mappingsData = {finishData: [], finishDataId: []}
    state.mappingsParams = []
    state.fieldsData = []
    state.mappingsNumber = 0
    state.paramsData = {}
  },
  // 清空测试
  storedCsBase (state, data) {
    state.csInputObj.test = data
    state.csOutputObj.test = data
  },
  // 数据库是否配置的存储
  storedBase (state, data) {
    state.dataBase[data.index] = data.baseData
  },
  // 数据库提交数据存储
  storedParams (state, data) {
    state.baseParams = data
  },
  // 表名的存储
  storedForms (state, data) {
    if (data.type === 'input') {
      state.formsData.data.input = data.data
    } else if (data.type === 'output') {
      state.formsData.data.output = data.data
    }
    state.formsData.link = true
  },
  // 表映射关系
  storedMappingsData (state, data) {
    state.mappingsData = data
    state.mappingsParams = data.finishData
    console.log('表映射关系: ', state.mappingsData)
  },
  // 字段映射关系
  storedFieldsData (state, data) {
    // console.log('data: ', data)
    // state.mappingsNumber++
    // state.mappingsData.finishData[data.index].fieldsMappings = data.mappings
    // console.log('字段映射关系: ', state.mappingsData)
    // // 针对表名映射的数量来判断是否所有的字段映射完成
    // if (state.mappingsData.finishData[data.index].fieldsMappings.finishData.length === 0) {
    //   console.log('减去')
    //   state.mappingsNumber = state.mappingsNumber - 2
    // }
    // console.log('number: ', state.mappingsNumber)
    state.mappingsData.finishData[data.index].fieldsMappings = data.mappings
  },
  // 将最终的数据存储进来
  paramsStorage (state, data) {
    state.paramsData = data
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
