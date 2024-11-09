<script setup>
import { onMounted, reactive,ref } from 'vue';
import { useRoute } from 'vue-router';
import {getMovieDetailAPI} from '@/apis/movie'
import { getReviewAPI,getNewReviewAPI } from '@/apis/review';
import { useAllDataStore } from '@/stores';
import { ElMessage } from 'element-plus';

const store = useAllDataStore()
const route = useRoute()
const formRef = ref(null)

const detail = ref({})
const form = ref({
  moviename:'',
  username:store.state.user.username,
  review:'',
  time:''
})
const rules = reactive({
  review:[{validator: (rule, value, callback) => {
                if (value) {
                  callback()
                } else {
                  callback(new Error('评论为空'))
                }
              },trigger: "blur" }]
})
const reviewList = ref([])
const centerDialogVisible = ref(false)
//获取电影详细
const getDetail =async ()=>{
  const res = await getMovieDetailAPI(route.params.id)
  detail.value = res
  form.value.moviename = detail.value.title 
}
//获取评论列表
const getReviewList =async()=>{
  const res = await getReviewAPI()
  const data = res.filter(item=>{
    if (item.moviename === detail.value.title) return true
    return false
  })
  reviewList.value = data.sort((a,b)=>b.id-a.id)
}
//新增评论
const getNewReview = ()=>{
  formRef.value.validate(async(valid)=>{
    if (valid){
      await getNewReviewAPI(form.value)
      getReviewList()
      ElMessage({ type: 'success', message: '评论成功' })
    }
  })

}

function nowDate(time) {
  let year = time.getFullYear(); // 年
  let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
  let date = time.getDate().toString().padStart(2, '0'); // 日
  let hour = time.getHours().toString().padStart(2, '0'); // 时
  let minute = time.getMinutes().toString().padStart(2, '0'); // 分
  let second = time.getSeconds().toString().padStart(2, '0'); // 秒
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  )
}


const submit = () =>{
  centerDialogVisible.value = false
  let getTime = new Date().getTime(); //获取到当前时间戳
  let time = new Date(getTime); //创建一个日期对象
  form.value.time = nowDate(time)
  getNewReview()

}
onMounted(()=>{
  getDetail(),
  getReviewList()
})
</script>

<template>
  <div class="detail">
    <div class="banner">
      <div class="container">
        <img :src="detail.url" alt="">
        <div class="info">
          <h2>{{ detail.title }}</h2>
          <p>导演：{{ detail.director }}</p>
          <p>类型：{{ detail.kind }}</p>
          <p>地区：{{ detail.region }}</p>
          <p>片长：{{ detail.length }}</p>
          <p>语言：{{ detail.language }}</p>
        </div>
        <div class="score">
          <p>用户评分</p>
          <p style="color: #ffc600;">{{ detail.score }}</p>
        </div>
      </div>
    </div>
    <div class="intro">
      <div class="title">
        <span>介绍</span>
      </div>
      <div class="plot">
        <p class="title-T">剧情介绍</p>
        <div>{{ detail.detail }}</div>
      </div>
      <div class="actor">
        <p class="title-T">演职人员</p>
        <div style="display: flex;">
          <el-descriptions style="margin-right: 50px;" title="导演">
            <el-descriptions-item  width="150px"  >{{ detail.director }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions :column="5" title="演员">
            <el-descriptions-item width="150px" v-for="i in 5" >没人</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div class="reviews">
        <div style="display: flex; justify-content: space-between;">
          <p class="title-T">用户评论</p>
          <el-button type="danger" round plain  @click="centerDialogVisible = true">写评论</el-button>
        </div>
        <div class="user" v-for="item in reviewList">
          <p class="name">{{item.username}}</p>
          <p class="date">{{ item.time }}</p>
          <p class="content">{{ item.review }}</p>
        </div>
      </div>
    </div>
  <el-dialog
    v-model="centerDialogVisible"
    title="评论"
    width="400"
    align-center
  >
  <el-form ref="formRef" :rules="rules" :model="form" >
      <el-form-item  prop="review">
        <el-input  type="textarea" v-model="form.review" :rows="4"  placeholder="快来说说你的看法吧" />
      </el-form-item>
  </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.detail {
  height: auto;
  width: 100%;
  margin-bottom: 20px;

  .banner {
    background: url(../../assets/images/banner_bg.png) no-repeat 50%;
    color: #fff;

    .container {
      width: 1000px;
      display: flex;
      padding-top: 50px;

      img {
        border: 4px solid #fff;
        width: 200px;
        height: 260px;
        position: absolute;
      }

      .info {
        width: 400px;
        height: 250px;
        margin-left: 250px;

        p {
          margin-top: 10px;
        }
      }

      .score {
        position: absolute;
        top: 130px;
        right: 300px;

        p {
          margin-bottom: 10px;
        }
      }
    }

  }
  .intro{
    width: 1000px;
    margin: 0 auto;
    margin-top: 40px;
    .title{
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
        span{
          font-size: 20px;
          padding-bottom: 11px;
          color: #ef4238;
          border-bottom: 1px solid #ef4238;
      }
    }
    .plot{
      margin-top: 20px;
    }
    .actor{
      margin-top: 20px;
    }
    .reviews{
      margin-top: 20px;
      .user{
        .name{
          font-weight: 500;
        }
        .date{
          color: #bbb;
        }
        .content{
          padding: 20px 0;
          border-bottom: 1px solid #ccc;
          margin-bottom: 20px;
        }
      }
    }
    .title-T{  
        font-weight: 700;
        font-size: 18px;
        padding-left: 10px;
        border-left: 5px solid #ef4238;
        margin-bottom: 20px;
      }
  }
  
  
}
</style>