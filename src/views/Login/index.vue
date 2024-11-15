<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAllDataStore } from '@/stores';
const store = useAllDataStore()
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
      await store.login({ username, password })
      // const res = await getUserAPI()
      // stoer.state.user = res.result
      // ElMessage({ type: 'success', message: '登录成功' })
      router.replace({ path: '/home' })
      store.cinemaList()
      store.screenList()
      store.order()
    }
  })
}
const register = () => {
  router.replace({ path: '/register' })
}
</script>

<template>
  <div class="login">
    <div class="container">
      <el-form ref="formRef" :model="form" :rules="rules">
        <img src="../../assets/images/logo.png" alt="">
        <h2>欢迎登录</h2>
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
          <el-button type="primary" @click="doLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-button plain @click="register" class="subBtn">
        注册
      </el-button>
    </div>
  </div>





</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/beijing.png);
  padding: 50px;
  position: relative;

  .title {
    text-align: center;
    color: #fff;
    font-family: 'KaiTi';
    font-size: 20px;
  }

  .el-form {
    width: 450px;
    padding: 35px 35px 35px 35px;
    background-color: #fff;
    border: 1px solid #505450;
    border-radius: 15px;
    box-shadow: 0 0 25px #cacaca;
    margin: 50px auto;
    text-align: center;

    h2 {
      color: #505450;
      margin-bottom: 10px;
      font-family: 'KaiTi';
    }

    :deep(.el-form-item__content) {
      justify-content: center;
    }
  }

  .subBtn {
    position: absolute;
    top: 365px;
    left: 590px;
  }
}
</style>
