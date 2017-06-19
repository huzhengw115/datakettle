<template lang="html">
  <div class="data-display">
    <div class="head">
      <div class="title">
        <p class="name">接口列表</p>
        <el-button type="primary" class="button" size="small">新接口申请中</el-button>
      </div>
      <div class="search">
        <span class="title">接口名称: </span>
        <el-input v-model="dataSearch" class="input" placeholder="请输入接口名称进行搜索"></el-input>
        <el-button type="primary" class="button" size="small">搜索</el-button>
      </div>
    </div>

    <div class="content">
      <p class="title">为您找到相关接口<span class="search-number">{{total}}</span>个</p>
      <div class="list">
        <div class="item" v-for="data in listData">
          <div class="status">
            <div class="information">
              <span class="name">{{data.name}}</span>
              <el-tag color="#20a0ff">{{data.department}}</el-tag>
            </div>
            <span class="remark">{{data.remark}}</span>
          </div>
          <el-button type="primary" size="small" class="details-button">查看详情</el-button>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagesTotal"
        class="pagination">
      </el-pagination>
    </div>

  </div>
</template>

<script>
// import api from '../../api'
export default {
  name: 'dataDisplay',
  data () {
    return {
      dataSearch: '',
      total: 234,
      list: [{
        id: 0,
        name: '人口信息查询',
        remark: '提供个人信息',
        department: '省公安局'
      }, {
        id: 1,
        name: '婚姻登记信息查询',
        remark: '提供婚姻状况的信息',
        department: '省民政厅'
      }, {
        id: 2,
        name: '房地产申请信息查询',
        remark: '提供个人住房申请信息，包括姓名、地址',
        department: '省地税局'
      }, {
        id: 3,
        name: '保安员查询',
        remark: '提供保安员信息查询',
        department: '安保部'
      }, {
        id: 4,
        name: '离婚登记信息',
        remark: '提供离婚信息查询功能',
        department: '省民政厅'
      }, {
        id: 5,
        name: '适龄儿童上学信息',
        remark: '提供适应儿童上学即所在地查询',
        department: '省教育局'
      }, {
        id: 6,
        name: '税务查询',
        remark: '提供纳税信息查询',
        department: '省税务局'
      }, {
        id: 7,
        name: '医保信息查询',
        remark: '提供全省医保人员医保信息查询',
        department: '省卫生院'
      }, {
        id: 8,
        name: '人口出生登记',
        remark: '提供全省最近出生人口的等级信息查询',
        department: '省公安局'
      }, {
        id: 9,
        name: '升学人员查询',
        remark: '提供全省中小学升学人员信息查询',
        department: '省教育局'
      }],
      listData: [],
      pagesTotal: 13
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      // api.get('./static/DataDisplay/index.json')
      // .then(res => {
      //   if (val === 1) {
      //     this.listData = res.data.first
      //   } else if (val === 2) {
      //     this.listData = res.data.second
      //   }
      // })
      if (val === 1) {
        this.listData = []
        this.listData = this.list
      } else if (val === 2) {
        this.listData = []
        this.listData = [{
          id: 0,
          name: '升学人员查询',
          remark: '提供全省中小学升学人员信息查询',
          department: '省教育局'
        }, {
          id: 1,
          name: '婚姻登记信息查询',
          remark: '提供婚姻状况的信息',
          department: '省民政厅'
        }, {
          id: 2,
          name: '税务查询',
          remark: '提供纳税信息查询',
          department: '省税务局'
        }, {
          id: 3,
          name: '保安员查询',
          remark: '提供保安员信息查询',
          department: '安保部'
        }]
      }
    }
  },
  created () {
    // api.get('./static/DataDisplay/index.json')
    // .then(res => {
    //   this.listData = res.data.first
    // })
    this.listData = this.list
  }
}

</script>

<style lang="scss">
.data-display {
  .head {
    .title {
      position: relative;
      border-bottom: 1px solid #eee;
      .name {
        width: 65px;
        display: inline-block;
        padding-bottom: 10px;
        border-bottom: 3px solid #00a0ff;
      }
      .button {
        position: absolute;
        right: 15px;
        top: -5px;
      }
    }
    .search {
      margin-top: 20px;
      height: 70px;
      display: flex;
      .title {
        line-height: 35px;
        width: 100px;
      }
      .input {
        width: 350px;
      }
      .button {
        height: 35px;
        margin-left: 20px;
      }
    }
  }
  .content {
    .title {
      margin-bottom: 35px;
      .search-number {
        color: #ff4400;
      }
    }
    .list {
      .item {
        border: 2px solid #ddd;
        margin-bottom: 15px;
        padding: 15px;
        display: flex;
        .status {
          flex: 1;
          .information {
            margin-bottom: 10px;
          }
        }
        .details-button {
          height: 35px;
        }
      }
    }
    .el-pagination__sizes {
      display: none;
    }
  }
}
</style>
