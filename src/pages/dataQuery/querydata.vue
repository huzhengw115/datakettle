<template lang="html">
 <div class="querydata">
 <div class="search">
 	 <span>共4条数据</span>
 	 展示第<el-input v-model="input1" class="input1" size="small" placeholder="请输入内容"></el-input>
 	 至<el-input v-model="input2" class="input2" size="small" placeholder="请输入内容"></el-input>条
 	 <el-button  class="sures"  @click="sures" size="small">确定</el-button>
   <el-button  class="exports"  @click="expors" size="small">导出Excel</el-button>
    <span class="smal">（导出当前筛选展示的数据）</span>
 </div>
 <div>
 	 <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="infoName"
      label="信息资源名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tbName"
      label="表名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="origin"
      label="来源部门">
    </el-table-column>
  </el-table>
 </div>
 	<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="4">
    </el-pagination>
  </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'querydata',
  methods: {
    handleSizeChange (val) {
      console.log('每页 100 条')
    },
    handleCurrentChange (val) {
      console.log('当前页: 2 ')
    },
    sures () {
      console.log(1)
    },
    expors () {
      console.log(2)
    }
  },
  data () {
    return {
      input1: 1,
      input2: 10,
      currentPage: 4,
      tableData: [{
        infoName: '信息资源1',
        tbName: '表1',
        origin: '公安局'
      }, {
        infoName: '信息资源2',
        tbName: '表2',
        origin: '公安局'
      }, {
        infoName: '信息资源3',
        tbName: '表3',
        origin: '公安局'
      }, {
        infoName: '信息资源4',
        tbName: '表4',
        origin: '公安局'
      }]
    }
  },
  created () {
    // api.getList()
    // .then(res => {
    //   console.log('res: ', res)
    // })
    let url = this.$route.query.id
    console.log('url: ', url)
  }
}
</script>

<style lang="scss">
.querydata{
	.search{
		margin-bottom: 20px;
		span{
			margin-right: 30px;
		}
    .input1{
    	width: 60px;
    	margin-left: 10px;
    }
    .input2{
    	width: 60px;
    }
    .sures{
			background-color: blue;
			color: #fff;
			font-size: 14px;
			margin-left: 20px;
		}
		.exports{
			background-color: blue;
			color: #fff;
			font-size: 14px;
		}
		.smal{
			color: #ccc;
			font-size: 14px;
		}
	}
	.block{
		margin-top: 20px;
	}
}
</style>
