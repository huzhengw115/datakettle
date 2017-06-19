<template lang="html">
  <div class="direct">
    <ul>
    	<li @click="linkTo()" v-for="data in list"><a>{{data.name}}</a></li>	
    	<!-- <li><a>审计局</a></li>
    	<li><a>税务局</a></li>
    	<li><a>社保局</a></li>
    	<li><a>环保厅</a></li>
    	<li><a>教育局</a></li>
    	<li><a>物价局</a></li>
    	<li><a>气象局</a></li>
    	<li><a>海事局</a></li>
    	<li><a>交通局</a></li> -->

    </ul>
  </div>
</template>

<script>
export default {
  name: 'gain',
  // data () {
  //   return {
  //     list: [{
  //       id: 111,
  //       name: '交通局'
  //     }, {
  //       id: 222,
  //       name: '海事局'
  //     }]
  //   }
  // },
  methods: {
    linkTo () {
      this.$router.push('/gain/news')
    }
  }
}

</script>

<style lang="scss">

</style>
