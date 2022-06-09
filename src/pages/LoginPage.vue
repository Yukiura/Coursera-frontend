<template>
  <div class="login-zone">
    <el-image :src="bannerImage" style="height: 550px; padding-right: 50px"></el-image>
    <el-card style="width: 450px">
      <div class="title">
        <h1>登录云课</h1>
      </div>
      <div class="input-wrapper">
        <div class="input-prompt">
          <span>用户名</span>
        </div>
        <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
      </div>
      <div class="input-wrapper">
        <div class="input-prompt">
          <span>密码</span>
        </div>
        <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-key"></el-input>
      </div>
      <div class="button-wrapper">
        <el-link type="primary" @click="toRegister">注册新用户</el-link>
        <el-button type="primary" @click="onsubmit" style="width: 100px; float: right" round>登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import banner from '../assets/banner.webp'

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      bannerImage: banner
    }
  },
  methods: {
    onsubmit() {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message({
          message: '用户名和密码不能为空',
          type: 'warning'
        })
        return
      }
      axios.post('/api/user/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(res => {
        console.log(res.data)
        console.log("登录成功")
        localStorage.setItem('token', res.data.data.token)
        this.$store.dispatch('setUsername', this.loginForm.username)
        this.$store.dispatch('login')
        // 获取用户头像
        axios.get('/api/user/avatar', {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          this.$store.dispatch('setAvatar', res.data)
        })
        // 获取用户身份
        axios.get('/api/user/role', {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(res => {
          console.log("用户身份: " + res.data)
          this.$store.dispatch('setRoleList', res.data)
        })
        // 提示登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('/mycourses')
      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login-zone {
  width: 100%;
  height: 100%;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  margin-top: 50px;
  padding-top: 40px;
  padding-bottom: 50px;
}

.title {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.input-wrapper {
  margin: 10px;
}

.input-prompt {
  padding-bottom: 6px;
  padding-left: 6px;
  color: #999999;
}

.button-wrapper {
  margin: 15px;
  padding-bottom: 50px;
}
</style>