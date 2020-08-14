<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"><el-input placeholder="请输入内容" v-model = 'query' clearable @clear="cleardata"><el-button slot="append" icon="el-icon-search" @click = 'btnClick'></el-button> </el-input></el-col>
      <el-col :span="4"><el-button type="primary" @click = 'addUser'>添加用户</el-button></el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-top: 15px">
       <el-table-column
        type='index'
        label="#"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
       <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
       <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
       <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
       <el-table-column
        label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state" @change = 'switchChange(scope.row)'>
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作" width="180px">
        <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click ="update(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click = "deleteUser(scope.row.id)"></el-button>
             <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
               <el-button type="warning" icon="el-icon-setting" size="mini" @click = "allotRoles(scope.row)"></el-button>
            </el-tooltip>

        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <add-user-form :isAddVisible = 'isAddVisible' @addUserVisible='addUserVisible' @getUserList="getUserList"></add-user-form>
    <el-dialog
    @close="dialogClose"
      title="修改用户"
      :visible.sync="isUpdateVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="updateFormRefs" :model="updateFormModel" :rules = 'updateFormRules' label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="updateFormModel.username" disabled></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop='email'>
          <el-input v-model="updateFormModel.email" ></el-input>
        </el-form-item>
         <el-form-item label="电话" prop='mobile'>
          <el-input v-model="updateFormModel.mobile" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <set-roles-dialog :roleList="roleList" :dialogVisible="dialogVisible" @handleSubmitRoles="handleSubmitRoles" @handleRoles = "handleRoles" :rolesInfo = "rolesInfo"> </set-roles-dialog>
  </div>
</template>

<script>
import { getUsers, updateUserStatus, getUserById, updateUser, deleteUser } from '../../../network/users.js'
import AddUserForm from './AddUserForm.vue'
import { getRoles } from '../../../network/power.js'
import SetRolesDialog from './SetRolesDialog.vue'
export default {
  components: {
    AddUserForm,
    SetRolesDialog
  },
  data () {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+([-]\w+)*(\.\w+)+$/
      if (regEmail.test(value)) {
        callback()
      } else {
        callback(new Error('请输入合法的邮箱'))
      }
    }
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regMobile.test(value)) {
        callback()
      } else {
        callback(new Error('请输入合法的手机号码'))
      }
    }
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      tableData: [],
      roleList: [],
      total: 0,
      isAddVisible: false,
      isUpdateVisible: false,
      dialogVisible: false,
      rolesInfo: {},
      updateFormModel: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      updateFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const res = await getUsers(this.query, this.pagenum, this.pagesize)
      if (res.meta.status === 200) {
        this.tableData = res.data.users
        this.total = res.data.total
      } else {
        this.$message.err(res.meta.msg)
      }
    },
    handleSubmitRoles () {
      this.getUsers()
      this.dialogVisible = false
    },
    handleRoles () {
      this.dialogVisible = false
    },
    async allotRoles (role) {
      const res = await getRoles()
      this.roleList = res.data
      console.log('111', this.roleList)
      this.rolesInfo = role
      this.dialogVisible = true
    },
    async deleteUser (id) {
      const res = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'confirm') {
        const result = await deleteUser(id)
        if (result.meta.status === 200) {
          this.getUsers()
          this.$message.success(res.meta.msg)
        } else {
          this.$message.error(res.meta.msg)
        }
      }
    },
    submit () {
      this.$refs.updateFormRefs.validate(async valid => {
        if (valid) {
          const res = await updateUser(this.updateFormModel.id, this.updateFormModel.email, this.updateFormModel.mobile)
          if (res.meta.status === 200) {
            this.getUsers()
            this.$message.success(res.meta.msg)
          } else {
            this.$message.error(res.meta.msg)
          }
          this.isUpdateVisible = false
        }
      })
    },
    handleClose () {
      this.isUpdateVisible = false
    },

    async update (id) {
      this.isUpdateVisible = true
      const res = await getUserById(id)

      this.updateFormModel.username = res.data.username
      this.updateFormModel.email = res.data.email
      this.updateFormModel.mobile = res.data.mobile
      this.updateFormModel.id = res.data.id
    },
    btnClick () {
      this.getUsers()
    },
    dialogClose () {
      this.$refs.updateFormRefs.resetFields()
    },
    addUserVisible (isAddVisible) {
      this.isAddVisible = isAddVisible
    },

    getUserList () {
      this.getUsers()
    },
    handleSizeChange (newSize) {
      this.pagesize = newSize
      this.getUsers()
    },
    handleCurrentChange (newPage) {
      this.pagenum = newPage
      this.getUsers()
    },
    cleardata () {
      this.getUsers()
    },
    addUser () {
      this.isAddVisible = true
    },
    async switchChange (row) {
      // eslint-disable-next-line camelcase
      const { id, mg_state } = row

      const res = await updateUserStatus(id, mg_state)
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg)
      } else {
        row.mg_state = !row.mg_state
        this.$message.error(res.meta.msg)
      }
    }
  }

}
</script>
<style scoped>
.el-pagination{
  margin-top: 15px;
}
</style>
