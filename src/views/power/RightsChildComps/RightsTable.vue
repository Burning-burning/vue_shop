<template>
  <el-card>
    <el-table
      :data="rightsList"
      style="width: 100%"
      border
      stripe
      >
      <el-table-column
        label="#"
        type="index">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="权限等级">
        <template v-slot="scope">
          <el-tag v-if="scope.row.level==='0'">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
      </el-table-column>

    </el-table>

  </el-card>
</template>

<script>
import { getRights } from '../../../network/power.js'
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const res = await getRights()
      if (res.meta.status === 200) {
        this.rightsList = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    }
  }

}
</script>
<style scoped>

</style>
