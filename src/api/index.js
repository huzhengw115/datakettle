import Axios from 'axios'
import qs from 'qs'
// import { message } from 'element-ui'

// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const instance = Axios.create({
  // baseURL: 'http://localhost:8090/',
  baseURL: 'http://114.55.177.188:18080/',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded'
  },
  validateStatus: function (status) {
    return status >= 200 && status < 600 // default
  }
})

instance.interceptors.request.use(config => {
  return config
})

instance.interceptors.response.use(response => {
  if (response.status >= 200 && response.status <= 300) {
    return {
      data: response.data,
      success: true
    }
  } else {
    return {
      data: response.data,
      success: false
    }
  }
  // return response
}, error => {
  console.log(error)
  // message.error('请求出错')
  return Promise.reject(error)
})

export default {
  // getData: (params) => {
  //   return instance.get('news/get_list/keyword/', {params: params})
  // },
  // businessCreate: (params) => {
  //   return instance.post('/business/create', params)
  // },
  // 数据库连接测试
  baseDataPost (params) {
    return instance.post('/db/testConn', qs.stringify(params))
  },
  getForm (params) {
    return instance.get('/static/form.json', {params: params})
  },
  // input表名获取
  getInputForms (params) {
    return instance.get('/db/getTables', {params: params})
  },
  // output表名获取
  getOutputForms (params) {
    return instance.get('/db/getTables', {params: params})
  },
  // input字段获取
  getInputFields (params) {
    return instance.get('/db/getColumns', {params: params})
  },
  // output字段获取
  getOutputFields (params) {
    return instance.get('/db/getColumns', {params: params})
  },
  // 生成配置文件
  submitPost (params) {
    return instance.post('/creatktr', qs.stringify(params))
  },
  getField (params) {
    return instance.get('/static/field.json', {params: params})
  },
  // 登录
  login (params) {
    return instance.get('news/get_list/keyword/', {params: params})
  },
  getPost: (params) => {
    return instance.post('/asd', qs.stringify(params))
  },
  // dna连接
  getDnaTest (params) {
    return instance.post('', qs.stringify(params))
  },
  // DNA表名获取
  getDnaForm (params) {
    return instance.get('/static/dnaForm.json', {params: params})
  },
  // 获取目录列表
  getDirectList (params) {
    return instance.get('/gain/getDepart', {params: params})
  },
  // 获取目录列表搜索
  getDirectSearch (params) {
    return instance.get('/gain/getDepart', {params: params})
  },
  // 获取目录列表详情页面
  getDirectDetail (params) {
    return instance.get('/gain/getInfo', {params: params})
  },
  // 获取目录列表详情页面搜索
  getDirectDetailSearch (params) {
    return instance.get('/gain/getInfoByKey', {params: params})
  },
  // 数据库管理
  getManagement (params) {
    return instance.get('/static/management.json', {params: params})
  },
  // 获取数据元
  getDirectDetailTable (params) {
    return instance.get('/gain/getElement', {params: params})
  },
  // 数据采集
  get (url, params) {
    return instance.get(url, {params: params})
  },
  post (url, params) {
    return instance.post(url, qs.stringify(params))
  },
  put (url, params) {
    return instance.put(url, qs.stringify(params))
  }
}
