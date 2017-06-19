const state = {
  list: [{
    id: 0,
    department: '公安局',
    name: 'GAJ_XINGSHIANJIAN',
    number: 6,
    finishNumber: 6,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '居民姓名',
      rule: '必须是汉字'
    }, {
      name: 'nationality',
      remark: '国籍',
      rule: '必须是国际认可的国家'
    }, {
      name: 'nation',
      remark: '民族',
      rule: '必须是该国籍下存在的民族'
    }, {
      name: 'sex',
      remark: '性别',
      rule: '男或者是女'
    }, {
      name: 'education',
      remark: '文化水平',
      rule: '文盲、小学、中学、大学'
    }]
  }, {
    id: 1,
    department: '公安局',
    name: 'GAJ_MINSHIANJIAN',
    number: 5,
    finishNumber: 5,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '居民姓名',
      rule: '必须是汉字'
    }, {
      name: 'nationality',
      remark: '国籍',
      rule: '必须是国际认可的国家'
    }, {
      name: 'nation',
      remark: '民族',
      rule: '必须是存在的民族'
    }, {
      name: 'sex',
      remark: '性别',
      rule: '男或者是女'
    }, {
      name: 'education',
      remark: '文化水平',
      rule: '文盲、小学、中学、大学'
    }]
  }, {
    id: 2,
    department: '民政局',
    name: 'JIEHUNDENGJIXINXI',
    number: 3,
    finishNumber: 3,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'manName',
      remark: '男方姓名',
      rule: '必须是汉字'
    }, {
      name: 'womenName',
      remark: '女方姓名',
      rule: '必须是汉字'
    }]
  }, {
    id: 3,
    department: '民政局',
    name: 'LIHUNDENGJIXINXI',
    number: 3,
    finishNumber: 3,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'manName',
      remark: '男方姓名',
      rule: '必须是汉字'
    }, {
      name: 'womenName',
      remark: '女方姓名',
      rule: '必须是汉字'
    }]
  }, {
    id: 4,
    department: '土地局',
    name: 'TUDIZHENGYONGXINXI',
    number: 3,
    finishNumber: 3,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '土地承包人姓名',
      rule: '必须是汉字'
    }, {
      name: 'measure',
      remark: '征用土地面积',
      rule: '必须是数字'
    }]
  }, {
    id: 5,
    department: '教育局',
    name: 'XIAOXUESHENGXUEXINXI',
    number: 6,
    finishNumber: 6,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '学生姓名',
      rule: '必须是汉字'
    }, {
      name: 'sex',
      remark: '学生性别',
      rule: '男或者是女'
    }, {
      name: 'school',
      remark: '入学学校名称',
      rule: '必须是汉字'
    }, {
      name: 'achievement',
      remark: '学生成绩',
      rule: '必须是数字'
    }, {
      name: 'class',
      remark: '学生班级',
      rule: '必须是数字'
    }]
  }, {
    id: 6,
    department: '教育局',
    name: 'ZHONGXUESHENGXUEXINXI',
    number: 6,
    finishNumber: 6,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '学生姓名',
      rule: '必须是汉字'
    }, {
      name: 'sex',
      remark: '学生性别',
      rule: '男或者是女'
    }, {
      name: 'school',
      remark: '入学学校名称',
      rule: '必须是汉字'
    }, {
      name: 'achievement',
      remark: '学生成绩',
      rule: '必须是数字'
    }, {
      name: 'class',
      remark: '学生班级',
      rule: '必须是数字'
    }]
  }, {
    id: 7,
    department: '教育局',
    name: 'DAXUESHENGXUEXINXI',
    number: 6,
    finishNumber: 6,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '学生姓名',
      rule: '必须是汉字'
    }, {
      name: 'sex',
      remark: '学生性别',
      rule: '男或者是女'
    }, {
      name: 'school',
      remark: '入学学校名称',
      rule: '必须是汉字'
    }, {
      name: 'achievement',
      remark: '学生成绩',
      rule: '必须是数字'
    }, {
      name: 'class',
      remark: '学生班级',
      rule: '必须是数字'
    }]
  }, {
    id: 8,
    department: '卫生院',
    name: 'WSY_XIANGZHENXINXI',
    number: 5,
    finishNumber: 5,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '医院名称',
      rule: '必须是汉字'
    }, {
      name: 'address',
      remark: '医院地址',
      rule: '必须是汉字'
    }, {
      name: 'number',
      remark: '医院医生数量',
      rule: '必须是数字'
    }, {
      name: 'grade',
      remark: '医院等级',
      rule: '必须是数字'
    }]
  }, {
    id: 9,
    department: '卫生院',
    name: 'WSY_QUANSHENGYISHENGXINXI',
    number: 5,
    finishNumber: 5,
    field: [{
      name: 'id',
      remark: '主键',
      rule: '必须是数字'
    }, {
      name: 'name',
      remark: '医院名称',
      rule: '必须是汉字'
    }, {
      name: 'address',
      remark: '医院地址',
      rule: '必须是汉字'
    }, {
      name: 'number',
      remark: '医院医生数量',
      rule: '必须是数字'
    }, {
      name: 'grade',
      remark: '医院等级',
      rule: '必须是数字'
    }]
  }],
  rule: ['必须是数字', '必须是汉字', '必须是国际认可的国家', '必须是存在的民族', '男或者是女', '文盲、小学、中学、大学'],
  cache: {}
}

const getters = {
}

const mutations = {
  storeList (state, data) {
    for (let i = 0; i < state.list.length; ++i) {
      if (data.id === state.list[i].id) {
        state.list[i] = data.list
      }
    }
    state.cache = {}
  },
  storeRule (state, data) {
    state.rule.push(data)
  },
  storeCache (state, data) {
    state.cache = data
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
