<script setup>
import { computed, reactive, ref } from 'vue'
import { useAllDataStore } from '@/stores';
import { ElMessage } from 'element-plus';
const store = useAllDataStore()
const formRef = ref(null)
const form = reactive({
  username: store.state.user.username,
  sex: store.state.user.sex,
  birth: store.state.user.birth,
  phone: store.state.user.phone,
})

const rules = reactive({
  username: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please input the password'))
        } else {
          callback()
        }
      }, trigger: 'blur'
    },
  ],
  phone: [
    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
  ]
})
const save = () => {
  formRef.value.validate(async (valid) => {
    if (valid) { //表单校验通过
      await store.save(form)
    }
  })

}
const imageUrl = computed(() => {
  if (store.state.user.avatar) {
    return new URL(store.state.user.avatar, import.meta.url).href
  }
})
// 上传用户头像涉及的变量

const handleSuccess = (response, file) => {
  console.log(response);
  // store.state.user.avatar = URL.createObjectURL(file.raw);
  store.state.user.avatar = `../../../assets/images/${response}`
  ElMessage.success('头像上传成功');
};

// 上传之前，这里差不多照抄即可
const beforeUpload = (rawFile) => {
  //这里设置上传图片类型和限制大小
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("头像必须是jpg或png格式！");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error("头像过大！");
    return false;
  }
  return true;
};

</script>

<template>
  <div class="info">
    <p class="title">基本信息</p>
    <div style="display: flex;">
      <el-upload class="avatar-uploader" action="http://localhost:8002/login/upload" :show-file-list="false"
      :on-success="handleSuccess" :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="username" label="名称">
        <el-input v-model="form.username" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="选择性别" clearable>
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birth" type="date" placeholder="生日" clearable />
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="form.phone" placeholder="手机号码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.info {
  // display: flex;
  width: 1100px;
  height: 500px;
  padding: 20px;
  overflow: auto;

  .title {
    color: hsla(242, 89%, 50%, 0.5);
    border-bottom: 1px solid rgb(225, 224, 224);
    padding-bottom: 10px;
  }

  .el-form {
    width: 400px;
    margin: 80px auto;

    .el-button {
      margin: 0 auto;
    }
  }
}

.avatar-uploader {
  width: 170px;
  height: 170px;
  border: 1px solid #8c939d;
  margin-top: 90px;
  margin-left: 170px;

  .avatar {
    width: 169px;
    height: 169px;
  }

  .avatar-uploader-icon {
    width: 170px;
    height: 170px;
    font-size: 28px;
    color: #8c939d;
  }
}
</style>