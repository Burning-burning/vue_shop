<template>
  <div class='login-container'>
    <div class = 'login-box'>
      <div class="avatar-box">
        <img src="../../assets/logo.png">
      </div>
      <el-form label-width="0px" class="forms" :model="loginFormModel" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginFormModel.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginFormModel.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click = 'login'>登陆</el-button>
          <el-button tye="info" @click = 'resetLoginForm'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../network/login.js'
export default {
  data () {
    return {
      loginFormModel: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { username, password } = this.loginFormModel
          const res = await login(username, password)
          console.log(res)
          if (res.meta.status === 200) {
            this.$message.success(res.meta.msg)
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          } else {
            this.$message.error(res.meta.msg)
          }
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.login-container{
  background-color: #2b4b6b;
  height: 100%;
}

.login-box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .avatar-box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;

    }

  }
}
.btns{
  display: flex;
  justify-content: flex-end;
}

.forms{
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
}

</style>
