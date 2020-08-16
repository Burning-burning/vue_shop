<template>
  <div class=''>
    <breadcrumb :menu="$store.state.menuList[2]" :item="1"></breadcrumb>
      <el-alert
        :closable="false"
        show-icon
        title="注意：只能修改三级分类的参数"
        type="warning">
      </el-alert>
      <el-row style="margin: 15px 0">
        <el-col>
          <span>选择商品的分类：</span>
           <el-cascader
            v-model="selectedId"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"></el-cascader>

        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="动态参数" name="many">
      <el-button type="primary" size="mini" :disabled="isDisable" @click = "addParams">添加参数</el-button>
      <el-table :data="manyData" stripe border style="margin-top:15px">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-tag closable @close = "deletetag(index,scope.row)"  type="primary" v-for="(item,index) in scope.row.attr_vals" :key="index">{{item}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
          </template>

        </el-table-column>

        <el-table-column type="index" label='#'></el-table-column>
        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
              <el-button icon="el-icon-edit" type="primary" size="mini" @click = "editDialog(scope.row.attr_id)">编辑</el-button>
              <el-button icon="el-icon-delete" type="danger" size="mini" @click = "deleteParm(scope.row.attr_id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
      <el-button type="primary" size="mini" :disabled="isDisable" @click = "addParams">添加属性</el-button>
      <el-table :data="onlyData" stripe border style="margin-top:15px">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-tag closable @close = "deletetag(index,scope.row)"  type="primary" v-for="(item,index) in scope.row.attr_vals" :key="index">{{item}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
          </template>

        </el-table-column>

        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="参数名称" prop="attr_name"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
              <el-button icon="el-icon-edit" type="primary" size="mini" @click = "editDialog(scope.row.attr_id)">编辑</el-button>
              <el-button icon="el-icon-delete" type="danger" size="mini" @click = "deleteParm(scope.row.attr_id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-tab-pane>

  </el-tabs>
  <el-dialog
  :title="'添加'+textTitle"
  :visible.sync="isAddParamsVisible"
  width="50%"
  @close = "handleClose"
>
  <el-form :model="addParamModel" :rules="addParmRules" ref="addParamRefs" label-width="100px" class="demo-ruleForm">
  <el-form-item :label="textTitle" prop="attr_name">
    <el-input v-model="addParamModel.attr_name"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="isAddParamsVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>

  <el-dialog
  :title="'编辑'+textTitle"
  :visible.sync="isEditVisible"
  width="50%"
  @close = "handleCloseEdit"
>
  <el-form :model="editParamModel" :rules="editParmRules" ref="editParamRefs" label-width="100px" class="demo-ruleForm">
  <el-form-item :label="textTitle" prop="attr_name">
    <el-input v-model="editParamModel.attr_name"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="isEditVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmitEdit">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../../../components/common/breadcrumb/Breadcrumb'
import { getcate, getData, addParams, queryParamById, editParams, deleteParam, editParamsList } from '../../../network/params.js'

export default {

  created () {
    this.getCate()
  },
  data () {
    return {
      selectedId: [],
      type: 3,
      catelist: [],
      editParamModel: {
        attr_name: ''

      },
      attr_id: 0,
      editParmRules: {
        attr_name: [
          {
            required: true, message: '请输入名称', trigger: 'blur'
          }]

      },
      isEditVisible: false,
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      addParmRules: {
        attr_name: [{
          required: true, message: '请输入名称', trigger: 'blur'
        }]
      },
      addParamModel: {
        attr_name: ''
      },
      isAddParamsVisible: false,
      activeName: 'many',
      id: '',
      manyData: [],
      onlyData: []
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    async handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
      } else {
        row.attr_vals.push(row.inputValue.trim())
        const res = await editParamsList(this.id, row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(','))
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
        row.inputVisible = false
        row.inputValue = ''
      }
    },
    async deletetag (index, row) {
      row.attr_vals.splice(index, 1)
      const res = await editParamsList(this.id, row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(','))
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      } else {
        this.$message.error(res.meta.msg)
      }
      row.inputVisible = false
      row.inputValue = ''
    },
    showInput (row) {
      row.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async getCate () {
      const res = await getcate(this.type)
      if (res.meta.status === 200) {
        this.catelist = res.data
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleCloseEdit () {
      this.$refs.editParamRefs.resetFields()
    },
    async editDialog (attrId) {
      this.attr_id = attrId
      const res = await queryParamById(this.id, attrId, this.activeName)
      if (res.meta.status === 200) {
        this.editParamModel.attr_name = res.data.attr_name
      } else {
        this.$message.error(res.meta.msg)
      }
      this.isEditVisible = true
    },
    handleClose () {
      this.$refs.addParamRefs.resetFields()
    },
    async deleteParm (attrId) {
      const result = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result === 'confirm') {
        const res = await deleteParam(this.id, attrId)
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg)
          this.getTableDate()
        } else {
          this.$message.error(res.meta.msg)
        }
      } else {
        this.$message.info('取消了删除')
      }
    },
    handleChange () {
      if (this.selectedId.length !== 3) {
        this.selectedId = 0
        this.manyData = []
        this.onlyData = []
      } else {
        this.getTableDate()
      }
    },
    async getTableDate () {
      if (this.selectedId.length === 3) {
        this.id = this.selectedId[this.selectedId.length - 1]
      } else {
        this.id = null
      }
      const res = await getData(this.id, this.activeName)
      if (res.meta.status === 200) {
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
          item.inputVisible = false
          item.inputValue = ''
        })

        if (this.activeName === 'many') {
          this.manyData = res.data
        } else {
          this.onlyData = res.data
        }
      } else {
        this.$message.error(res.meta.msg)
      }
    },
    handleClick () {
      this.getTableDate()
    },
    addParams () {
      this.isAddParamsVisible = true
    },
    handleSubmit () {
      this.$refs.addParamRefs.validate(async valid => {
        if (valid) {
          const res = await addParams(this.id, this.addParamModel.attr_name, this.activeName)
          if (res.meta.status === 201) {
            this.$message.success(res.meta.msg)
            this.isAddParamsVisible = false
            this.getTableDate()
          } else {
            this.$message.error(res.meta.msg)
          }
        } else {

        }
      })
    },
    handleSubmitEdit () {
      this.$refs.editParamRefs.validate(async valid => {
        if (valid) {
          const res = await editParams(this.id, this.attr_id, this.editParamModel.attr_name, this.activeName)
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            this.isEditVisible = false
            this.getTableDate()
          } else {
            this.$message.error(res.meta.msg)
          }
        }
      })
    }
  },
  computed: {
    isDisable () {
      if (this.selectedId.length !== 3) {
        return true
      } else {
        return false
      }
    },
    textTitle () {
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }

}
</script>
<style scoped>
.el-tag{
  margin: 5px;
}
.input-new-tag{
  width: 120px;
}
</style>
