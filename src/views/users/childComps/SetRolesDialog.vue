<template>
  <el-dialog
  title="分配角色"
  :visible.sync="dialogVisible"
  width="50%"
  @close="handleClose">
  <div>
    <p>当前的用户：{{rolesInfo.username}}</p>
    <p>当前的角色：{{rolesInfo.role_name}}</p>
    <p>分配新角色：  <el-select v-model="selectedId" placeholder="请选择">
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select></p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { allotUserRole } from '../../../network/users'
export default {
  data: function () {
    return {
      selectedId: ''
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    rolesInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    roleList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClose () {
      this.selectedId = ''
      this.$emit('handleRoles')
    },
    handleCancel () {
      this.$emit('handleRoles')
    },
    async handleSubmit () {
      const res = await allotUserRole(this.rolesInfo.id, this.selectedId)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      console.log(this.rolesInfo.id, this.selectedId)
      console.log(res)
      this.$emit('handleSubmitRoles')
    }
  }

}
</script>
<style scoped>

</style>
