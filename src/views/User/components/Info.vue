<script setup>
import { reactive } from 'vue'
import { useAllDataStore } from '@/stores';
const store = useAllDataStore()
const form = reactive({
  name: store.state.user.username,
  sex: store.state.user.sex,
  birth: store.state.user.birth,
  phone:store.state.user.phone,
})

const save = () => {
  store.state.user = form
  console.log(store.state.user);
}
</script>

<template>
  <div class="order">
    <el-form  :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name"  clearable />
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
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" placeholder="手机号码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.order {
  width: 1100px;
  height: 500px;
  padding: 20px;
  overflow: auto;
  .el-form{
    width: 400px;
    margin: 80px auto;
    .el-button{
      margin: 0 auto;
    }
  }
}

.title {
  color: hsla(242, 89%, 50%, 0.5);
  border-bottom: 1px solid rgb(225, 224, 224);
  padding-bottom: 10px;
}
</style>