<template>

      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{menu.authName}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{menu.children[item].authName}}</el-breadcrumb-item>

    </el-breadcrumb>

</template>

<script>

export default {
  props: {
    menu: {
      type: Object,
      default () {
        return {}
      }
    },
    item: {
      type: Number,
      default: 0
    }
  }

}
</script>
<style lang='less' scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
