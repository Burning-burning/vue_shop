<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[1]" :item="1"></breadcrumb>
    <rights-table></rights-table>
  </div>
</template>

<script>
import Breadcrumb from '../../components/common/breadcrumb/Breadcrumb'
import RightsTable from './RightsChildComps/RightsTable'
export default {
  components: {
    Breadcrumb,
    RightsTable
  }

}
</script>
<style lang='less' scoped>

</style>
