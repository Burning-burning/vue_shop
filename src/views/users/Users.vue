<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[0]" :item="0"></breadcrumb>
    <el-card>

      <user-table></user-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb'

import UserTable from './childComps/UserTable.vue'
export default {

  components: {
    Breadcrumb,

    UserTable
  }

}
</script>
<style lang='less' scoped>

</style>
