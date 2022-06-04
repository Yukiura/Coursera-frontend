<template>
  <div class="register-wrapper">
    <el-card class="form-card">
      <div class="register-title">
        <span>注册新用户</span>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="cid">
          <el-input type="text" v-model="ruleForm.cid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-radio-group v-model="ruleForm.role" prop="role">
            <el-radio label="教师" value="3"></el-radio>
            <el-radio label="学生" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学号/教工号" prop="sid">
          <el-input type="text" v-model="ruleForm.sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择学校">
            <el-option v-for="item in this.$store.state.unitList" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        name: '',
        cid: '',
        role: '',
        sid: '',
        phone: '',
        unit: ''
      },
      rules: {
        pass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        cid: [
          {required: true, message: '请输入身份证号', trigger: 'blur'}
        ],
        sid: [
          {required: true, message: '请输入学号/教工号', trigger: 'blur'}
        ],
        role: [
          {required: true, message: '请选择身份', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        unit: [
          {required: true, message: '请选择学校', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/user/register', this.ruleForm).then(res => {
            console.log("注册结果: " + res.data)
            if (res.data === 1) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.register-wrapper {
  width: 100%;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  display: flex;
  margin-top: 50px;
}

.form-card {
  width: 700px;
  margin-bottom: 80px;
}

.register-title {
  padding: 35px;
  font-size: 20px;
}

.demo-ruleForm {
  padding-left: 20px;
  padding-right: 30px;
}
</style>