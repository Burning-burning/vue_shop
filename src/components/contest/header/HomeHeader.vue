<template>
  <div class='header'>
    <div class ="header-div">
      <img src = '../../../assets/heima.png' />
      <span>黑马后台管理系统</span>
    </div>
    <el-button type="info" @click = "logout">退出</el-button>
  </div>
</template>

<script>

export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }

}
</script>
<style lang="less" scoped>
.header{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  padding-left: 0px;

  .header-div{
    display: flex;
    align-items: center;
  }

}
</style>
