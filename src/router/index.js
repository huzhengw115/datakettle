import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

const Index = require('../pages/index')
// 获取目录
const Directory = require('../pages/directory')
const DirectoryIndex = require('../pages/directory/list')
const DirectoryDetail = require('../pages/directory/detail')
// 数据表管理
const Management = require('../pages/management')
const ManagementIndex = require('../pages/management/home')
const ManagementEdit = require('../pages/management/edit')
// 数据采集
const DataCollection = require('../pages/dataCollection')
const DataBase = require('../pages/dataCollection/add/index.vue')
const CSConnection = require('../pages/dataCollection/add/connection.vue')
const CSTableMapping = require('../pages/dataCollection/add/tableMapping.vue')
const CSFieldMapping = require('../pages/dataCollection/add/fieldMapping.vue')
const CSComplete = require('../pages/dataCollection/add/complete.vue')
// 页面采集
const HtmlCollection = require('../pages/htmlCollection')
const HtmlCollectionIndex = require('../pages/htmlCollection/home')
const HtmlCollectionAdd = require('../pages/htmlCollection/add')
// 数据查询
const DataQuery = require('../pages/dataQuery')
const DataQueryIndex = require('../pages/dataQuery/home')
const DataQueryList = require('../pages/dataQuery/dataList')
const DataQueryDetail = require('../pages/dataQuery/detail')
// 数据接口
const DataDisplay = require('../pages/dataDisplay')
// 数据清洗
const DataClean = require('../pages/dataClean')
const DataCleanList = require('../pages/dataClean/cleanList')
const DataCleanRule = require('../pages/dataClean/cleanRule')
const DataCleanAdd = require('../pages/dataClean/addRule')
// 登录
const Login = require('../pages/login')

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/directory',
      children: [{
        // 获取目录
        path: 'directory',
        name: 'Directory',
        component: Directory,
        redirect: '/directory/index',
        children: [{
          path: 'index',
          name: 'DirectoryIndex',
          component: DirectoryIndex
        }, {
          path: 'detail',
          name: 'DirectoryDetail',
          component: DirectoryDetail
        }]
      }, {
        // 数据表管理
        path: 'management',
        name: 'Management',
        component: Management,
        redirect: '/management/index',
        children: [{
          path: 'index',
          name: 'ManagementIndex',
          component: ManagementIndex
        }, {
          path: 'edit',
          name: 'ManagementEdit',
          component: ManagementEdit
        }]
      }, {
        // 数据采集首页
        path: 'dataCollection',
        name: 'DataCollection',
        component: DataCollection
      // }, {
      }, {
        // 数据采集新建任务
        path: 'dataBase',
        name: 'DataBase',
        component: DataBase,
        redirect: '/dataBase/connection',
        children: [{
          path: 'connection',
          name: 'CSConnection',
          component: CSConnection
        }, {
          path: 'tablemapping',
          name: 'CSTableMapping',
          component: CSTableMapping
        }, {
          path: 'fieldmapping',
          name: 'CSFieldMapping',
          component: CSFieldMapping
        }, {
          path: 'complete',
          name: 'CSComplete',
          component: CSComplete
        }]
      }, {
        // 页面采集
        path: 'htmlCollection',
        name: 'HtmlCollection',
        component: HtmlCollection,
        redirect: '/htmlCollection/index',
        children: [{
          path: 'index',
          name: 'HtmlCollectionIndex',
          component: HtmlCollectionIndex
        }, {
          path: 'add',
          name: 'HtmlCollectionAdd',
          component: HtmlCollectionAdd
        }]
      }, {
        // 数据查询
        path: 'dataQuery',
        name: 'DataQuery',
        component: DataQuery,
        redirect: '/dataQuery/index',
        children: [{
          path: 'index',
          name: 'DataQueryIndex',
          component: DataQueryIndex
        }, {
          path: 'list',
          name: 'DataQueryList',
          component: DataQueryList
        }, {
          path: 'detail',
          name: 'DataQueryDetail',
          component: DataQueryDetail
        }]
      }, {
        // 数据接口
        path: 'dataDisplay',
        name: 'DataDisplay',
        component: DataDisplay
      }, {
        path: 'dataClean',
        name: 'DataClean',
        component: DataClean,
        redirect: '/dataClean/list',
        children: [{
          path: 'list',
          name: 'DataCleanList',
          component: DataCleanList
        }, {
          path: 'rule',
          name: 'DataCleanRule',
          component: DataCleanRule
        }, {
          path: 'add',
          name: 'DataCleanAdd',
          component: DataCleanAdd
        }]
      }]
    }
  ]
})
