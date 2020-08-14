<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[1]" :item="0"></breadcrumb>
    <roles-table></roles-table>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb'
import RolesTable from './RolesChildComps/RolesTable'

export default {
  components: {
    Breadcrumb,
    RolesTable
  }

}
</script>
<style lang='less' scoped>

</style>
