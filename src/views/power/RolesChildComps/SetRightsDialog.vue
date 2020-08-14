<template>
  <el-dialog
  title="分配权限"
  :visible.sync="isSetVisible"
  width="50%"
  @close="handleClose">
  <el-tree ref="treeRefs" :data="rightsList" :props="defaultProps" show-checkbox default-expand-all :default-checked-keys="defKeys" node-key="id"></el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { allotRights } from '../../../network/power.js'
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },

  props: {
    isSetVisible: {
      type: Boolean,
      default: false
    },
    defKeys: {
      type: Array,
      default () {
        return []
      }

    },
    id: {
      type: Number,
      default: 0

    },
    rightsList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('isSetDialog')
    },

    handleCancel () {
      this.$emit('isSetDialog')
    },
    async handleSubmit () {
      const arr = [...this.$refs.treeRefs.getCheckedKeys(), ...this.$refs.treeRefs.getHalfCheckedKeys()]
      const arrStr = arr.join(',')
      const res = await allotRights(this.id, arrStr)
      if (res.meta.status === 200) {
        console.log('11111')
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      console.log(res)
      this.$emit('isSetDialog')
    }
  }

}
</script>
<style scoped>

</style>
