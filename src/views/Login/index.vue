<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserAPI } from '@/apis/login';
import { useAllDataStore } from '@/stores';

const stoer = useAllDataStore()
const router = useRouter()
const formRef = ref(null)
const form = ref({
  username: "",
  password: "",
  agree: true
})
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        //自定义校验逻辑
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}


const doLogin = () => {
  const { username, password } = form.value
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await getUserAPI({ username, password })
      stoer.state.user = res.result
      ElMessage({ type: 'success', message: '登录成功' })
      router.replace({ path: '/' })

    }
  })
}
const register = () =>{
  router.replace({ path: '/register' })
}
</script>

<template>
  <div class="container">
    <header class="logo">
      <img style="width: auto; height: auto;" src="../../assets/images/logo.png" alt="">
    </header>
    <div class="body">
      <img style="width: 480px; height: 370px;" src="../../assets/images/1.png" alt="">
      <div class="form">
        <el-form style="width: 300px;" ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password placeholder="请输入密码" v-model="form.password" />
          </el-form-item>
          <el-form-item prop="agree" style="font-size: 12px;">
            <el-checkbox v-model="form.agree" size="large">
              我已同意隐私条款和服务条款
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin" class="subBtn">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <el-button plain @click="register" class="subBtn">
          注册
        </el-button>
      </div>
    </div>
  </div>




</template>

<style scoped>
.logo {

  width: 100%;
  height: 140px;
  text-align: center;
}

.body {
  display: flex;
  justify-content: space-between;
}

.form {
  width: 500px;
  height: 500px;
  padding-top: 100px;
}

.input {
  height: 30px;
}

.subBtn {
  width: 300px;
  border-radius: 20px;
  height: 40px;
}

.enBtn {
  width: 300px;
  border-radius: 20px;
  height: 40px;
}

</style>
