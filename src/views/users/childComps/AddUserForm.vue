<template>
  <el-dialog
        title="添加用户"
        :visible.sync="isAddVisible"
        width="50%"
        @close = 'dialogClose'
        :before-close="handleClose">
        <el-form ref="addFormRefs" :model="addFormModel" :rules ="addFormRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addFormModel.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop='password'>
            <el-input v-model="addFormModel.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop= 'email'>
            <el-input v-model="addFormModel.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addFormModel.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
</template>

<script>
import { addUsers } from '../../../network/users.js'
export default {
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
      addFormModel: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
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
  props: {
    isAddVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose () {
      this.isAddVisible = false
      this.$emit('addUserVisible', this.isAddVisible)
    },
    handleCancel () {
      this.isAddVisible = false
      this.$emit('addUserVisible', this.isAddVisible)
    },
    dialogClose () {
      this.$refs.addFormRefs.resetFields()
    },
    submit () {
      this.$refs.addFormRefs.validate(async valid => {
        if (valid) {
          const { username, password, email, mobile } = this.addFormModel
          const res = await addUsers(username, password, email, mobile)
          console.log('status', res.meta.status)
          if (res.meta.status === 201) {
            this.$emit('getUserList')
            this.$message.success(res.meta.msg)
          } else {
            this.$message.error(res.meta.msg)
          }
          this.isAddVisible = false
          this.$emit('addUserVisible', this.isAddVisible)
        }
      })
    }
  }

}
</script>
<style lang='less' scoped>

</style>
