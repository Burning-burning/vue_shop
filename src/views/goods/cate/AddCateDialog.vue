<template>
  <el-dialog
  title="添加分类"
  :visible.sync="isAddCateVisible"
  width="50%"
  @close="handleClose">
 <el-form :model="addFormModel" :rules="addFormRules" ref="addFormRefs" label-width="100px" class="demo-ruleForm">
  <el-form-item label="分类名称" prop="cat_name">
    <el-input v-model="addFormModel.cat_name"></el-input>
  </el-form-item>
  <el-form-item label="父级分类">
     <el-cascader
     clearable
    v-model="selectedId"
    :options="parentCate"
    :props="casProps"
    @change="handleChange"
    style ="width: 100%"
    ></el-cascader>

  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import { addcate } from '../../../network/cate.js'
export default {
  data () {
    return {
      selectedId: [],
      addFormModel: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addFormRules: {
        cat_name: [{
          required: true, message: '请输入分类名称', trigger: 'blur'
        }]
      },
      casProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true

      }

    }
  },
  props: {
    isAddCateVisible: {
      type: Boolean,
      default: false
    },
    parentCate: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleClose () {
      this.selectedId = []
      this.addFormModel.cat_name = ''
      this.addFormModel.cat_level = 0
      this.addFormModel.cat_pid = 0
      this.$emit('isVisible')
    },
    async handleSubmit () {
      const res = await addcate(this.addFormModel.cat_pid, this.addFormModel.cat_name, this.addFormModel.cat_level)
      if (res.meta.status === 201) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      this.$emit('isVisibleSuccess')
    },
    handleCancel () {
      this.$emit('isVisible')
    },
    handleChange () {
      if (this.selectedId.length > 0) {
        this.addFormModel.cat_pid = this.selectedId[this.selectedId.length - 1]
        this.addFormModel.cat_level = this.selectedId.length
      } else {
        this.addFormModel.cat_pid = 0
        this.addFormModel.cat_level = 0
      }
    }
  }

}
</script>
<style scoped>

</style>
