<script setup>
import { ref,reactive, onMounted,nextTick } from 'vue';
import { getUserDataAPI,getUserAPI,getSaveAPI,getDelUserAPI,getAddUserAPI } from '@/apis/user';
import { ElMessage, ElMessageBox } from 'element-plus';

const form = reactive({
  username:''
})

const userLabel = reactive([
  {
    prop: 'username',
    label: '用户名'
  },
  {
    prop: 'sex',
    label: '性别'
  },
  {
    prop: 'birth',
    label: '出生日期',
    width: 255
  },
  {
    prop: 'phone',
    label: '手机号码',
    width: 255
  },
  {
    prop: 'role',
    label: '角色',
  },
])

const userData = ref([])
const currentPage = ref(1)
const getUserData =async ()=>{ //调用获取用户列表的接口
  const res = await getUserDataAPI()
  userData.value = res
}
//新增
const handleAdd = ()=>{
  dialogVisible.value=true
  action.value='add'
}
const getUser =async (id)=>{
  const res = await getUserAPI(id)
    const user = [] //userData为数组需要转为数组才能赋值
    user.push(res)
    userData.value = user

}
//搜索
const handleSearch = async()=>{

  if (form.username){
    await getUserData()
    const id = ref('')
    userData.value.forEach(item=>{
      if(item.username === form.username){
        getUser(item.id)
        id.value = item.id
      }
    })
    if(!id.value){
      ElMessage({ type: 'warning', message: '无该用户' })
    }
  }else {
    getUserData()
  }

}
const action = ref('add')
const dialogVisible = ref(false)
const userForm = ref(null)
const formUser = reactive({
  username:'',
  password:'',
  sex:'男',
  phone:'',
  role:'用户',
  birth:'',

})
//表单校验规则
const rules = reactive({
  username: [{ required: true,
              validator: (rule, value, callback) => {
                if (action.value === 'add' && value!= '') {
                  let yes = 0
                  userData.value.forEach(item=>{
                    if (item.username === value){
                      yes = 1
                    }
                  })

                  if (yes === 1){
                    callback(new Error('用户名重复'))
                  }else{
                    callback()
                  }

                } else if (value === ''){
                  callback(new Error('用户名是必填项'))
                } else {
                  callback()
                }
              },
              trigger: "blur" }],
  password: [{ required: true, message: "密码是必填项", trigger: "blur" }],
  role: [
    { required: true, message: "角色是必填项", trigger: "blur" },
  ],
  sex: [{ required: false }],
  birth: [{ required: false }],
  phone: [
    { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
  ]
})

const handleClose = ()=>{
  dialogVisible.value=false
  userForm.value.resetFields() //重置表单

}
//编辑
const handleUpdata = (val) =>{
  dialogVisible.value=true
  action.value='updata'
  nextTick(()=>{  //nextTick确保在正确的时机进行 DOM 操作
    Object.assign(formUser,{...val}) //assign对象合并，+''转为字符串
  })
}
//删除
const handleDelete = (val) =>{
  let id = parseInt(val.id) //字符串转数字
  console.log(id);
  ElMessageBox.confirm("你确定要删除吗").then(async () => {
    await getDelUserAPI(id)
    ElMessage({
      showClose: true,
      message: '删除成功',
      type: 'success'
    })
    getUserData()
  })
}
//取消
const handleCancel = ()=>{
  dialogVisible.value=false
  userForm.value.resetFields() //重置表单

}
//确定
const onSubmit = ()=>{
  userForm.value.validate(async(valid)=>{
    if (valid) {
        if (action.value === 'add'){
          await getAddUserAPI(formUser)
          ElMessage({ type: 'success', message: '添加成功' })
        }else {
          await getSaveAPI(formUser)
          ElMessage({ type: 'success', message: '修改成功' })
        }
        dialogVisible.value=false
        userForm.value.resetFields()
        getUserData()
    }
  })
}

onMounted(()=>{
  getUserData()
})
</script>

<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-form :inline="true" :model="form" >
        <el-form-item label="请输入">
          <el-input v-model="form.username"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="userData" style="width: 100%">
        <el-table-column 
        v-for="item in userLabel" 
        :width="item.width ? item.width : 155" 
        :prop="item.prop" 
        :label="item.label" 
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #="scope">
            <el-button type="primary" size="small" @click="handleUpdata(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div class="layout">
      <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" :total="userData.length" />
    </div>
  </div>

  <el-dialog v-model="dialogVisible" :title="action == 'add' ? '新增用户' : '修改用户'" width="35%" :before-close="handleClose">
    <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理
    dialogVisible=true显示对话框
    before-close点击关闭和点击外部时执行
    -->
    <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formUser.username" placeholder="用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="角色" prop="role">
            <el-select v-model="formUser.role" placeholder="请选择">
              <el-option label="用户" value="用户" />
              <el-option label="管理员" value="管理员" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item  label="密码" prop="password">
            <el-input v-model="formUser.password" type="password" show-password placeholder="密码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formUser.phone" placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker v-model="formUser.birth" type="date" value-format="YYYY-MM-DD" placeholder="请输入" style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<style  scoped lang="less">
.user-header{
  display: flex;
  justify-content: space-between;
  
}
.table{
  position: relative;
  height: 500px;
  .layout{
    position: absolute;
    bottom: -50px;
  }
}
form .select-clearn{
  display: flex;
}
</style>