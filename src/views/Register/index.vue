<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {getRegisterAPI} from '@/apis/user'

const router = useRouter()
const formRef = ref(null)


const form = ref({
  username: "",
  password: "",
  password2: "",
})
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ],
  password2: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' }
  ]
}

const doRegister = () => {
  const { username, password } = form.value
  formRef.value.validate(async(valid) => {
    if (valid) {

      if (form.value.password === form.value.password2) {
        await getRegisterAPI({username,password})
        ElMessage({ type: 'success', message: '注册成功' })
      } else {
        ElMessage({ type: 'warning', message: '注册失败,两次密码不一致' })
      }
    }
  })
}
const back = () => {
  router.replace({ path: '/login' })
}
</script>

<template>
  <div class="container">
    <h1>用户注册</h1>
    <el-form style="width: 300px;" ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" show-password placeholder="确认密码" v-model="form.password2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doRegister" class="doRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <el-button @click="back" class="doRegister">
      返回
    </el-button>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 40px;
}

h1 {
  margin-bottom: 20px;
}

form {
  margin: 0 auto;
}

.doRegister {
  width: 300px;
  border-radius: 20px;
  height: 40px;
}
</style>