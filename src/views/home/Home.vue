<template>
<el-container class = 'home-container'>
  <el-header><home-header></home-header></el-header>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'"><home-menu @collapseBtn="collapseBtn"></home-menu></el-aside>
    <el-main><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>

<script>
import HomeHeader from '../../components/contest/header/HomeHeader'
import HomeMenu from '../../components/common/menu/HomeMenu'
export default {
  name: 'Home',
  data () {
    return {
      isCollapse: false

    }
  },
  components: {
    HomeHeader,
    HomeMenu

  },
  methods: {
    collapseBtn (isCollapse) {
      this.isCollapse = isCollapse
    }
  }
}
</script>
<style lang='less' scoped>
  .el-header{
    background-color: #373d41;
    padding-left: 0px;

  }
  .el-aside{
    background-color: #333744;
  }
  .el-main{
    background-color: #eaedf1;
  }
  .home-container{
    height: 100%;
  }
</style>
