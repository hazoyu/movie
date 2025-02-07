<script setup>
import { reactive, ref } from 'vue';
import { useAllDataStore } from '@/stores';

const store = useAllDataStore()
const formRef = ref(null)
const form = ref({
  oldPassword:"",
  newPassword:"",
  newPassword2:"",
})
const rules = reactive({
  oldPassword:[{
    validator: (rule, value, callback) => {
        if (value === store.state.user.password) {
          callback()
        } else if (value === '') {
          callback(new Error('旧密码不能为空'))
        } else  {
          callback(new Error('与原密码不一致'))
        }
      }, trigger: 'blur'
  }],
  newPassword:[{
     validator: (rule, value, callback) => {
        if (value === store.state.user.password) {
          callback(new Error('与原密码一致'))
        } else  {
          callback()
        }
      }, trigger: 'blur'
  }],
  newPassword2:[{
     validator: (rule, value, callback) => {
        if (value === form.value.newPassword) {
          callback()
        } else  {
          callback(new Error('两次密码不一致'))
        }
      }, trigger: 'blur'
  }]
})
const confirm = ()=>{
  const {newPassword} = form.value
  formRef.value.validate(async (valid)=>{
    if(valid){ //表单校验通过
      await store.revise(newPassword)
      formRef.value.resetFields() //清空表单
    }
  })
}
</script>

<template>
  <div class="revise">
    <p class="title">修改密码</p>
    <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input v-model="form.oldPassword" type="password" show-password placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input v-model="form.newPassword" type="password" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword2" label="确认密码">
          <el-input v-model="form.newPassword2" type="password" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="confirm">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style  scoped lang="less">
.revise{
  width: 1100px;
  height: 500px;
  padding: 20px;
  overflow:auto;
  .title{
  color: hsla(242, 89%, 50%, 0.5);
  border-bottom: 1px solid rgb(225, 224, 224);
  padding-bottom: 10px;
}
  .el-form{
    width: 400px;
    margin: 80px auto;
    .el-button{
      margin: 0 auto;
    }
  }
}


</style>