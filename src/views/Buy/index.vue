<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {getMovieDetailAPI} from '@/apis/movie'
import {getSessionListAPI} from '@/apis/screen'
import { getMovieScoreAPI } from '@/apis/score';
import { useAllDataStore } from '@/stores';

const store = useAllDataStore()
const route = useRoute()
const router = useRouter()
// const score = ref()
const detail = ref({})
const getDetail =async ()=>{
  const res = await getMovieDetailAPI(route.params.id)
  detail.value = res
}
//获取电影评分
// const getScore = async()=>{
//   await getDetail()
//   let a = 0
//   const res = await getMovieScoreAPI(detail.value.title)
//   res.forEach(item=>{
//     a=a+(+item.score)
//   })
//   score.value = (a/res.length).toFixed(1)
// }
function newDate(time) {
  let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
  let date = time.getDate().toString().padStart(2, '0'); // 日
  return (
    month + "-" + date
  )
}
let getTime = new Date().getTime(); 
let time = new Date(getTime);
let time2 = new Date()
time2 = time2.setDate(time2.getDate()+1)
time2 = new Date(time2)
let time3 = new Date()
time3 = time3.setDate(time3.getDate()+2)
time3 = new Date(time3)
const tabs = [
  {
    date:"今天"+ newDate(time),
  }, {
    date:"明天"+ newDate(time2),
  }, {
    date:"后天"+ newDate(time3),
  }
]
const cinemas=computed(()=>store.state.cinemaList) //影院列表
const date = ref("今天"+ newDate(time))
const cinemaNmae = ref('全部')
const cinema = ref([])

const handle =()=>{
  router.push(`/detail/${route.params.id}`)
}

const info = ref([])
const getSessionList = async()=>{
  const res = await getSessionListAPI()
  const data = res.filter(item=>{
    if (item.movie === detail.value.title) return true
    return false
  })
  for (const item of data) { //去掉重复的电影院
    const isArr= info.value.find((obj) => obj.cinema === item.cinema);
    if (!isArr) {
      info.value.push(item);
    }
  }
}
//点击影院
const handleCin = (item)=>{
  const data = info.value.filter(i=>{
    if (i.cinema === item.name && i.time.slice(5,10) === date.value.slice(2,7)) return true
    return false
  })
  cinema.value = data
}
//点击日期
const handleDate = (item)=>{

  if (cinemaNmae.value != "全部"){
    cinema.value = info.value.filter(i=>{
    if (i.cinema === cinemaNmae.value && i.time.slice(5,10) === item.date.slice(2,7)) return true
    return false
    })
  } else {
    cinema.value = info.value.filter(i=>{
    if (i.time.slice(5,10) === item.date.slice(2,7)) return true
    return false
    })
  }
}
//点击全部
const handleAll=()=>{
  const data = info.value.filter(i=>{
    if (i.time.slice(5,10) === date.value.slice(2,7)) return true
    return false
  })
  cinema.value = data
}
//点击购买
const buy = (cinema) =>{
  const cinema_id = ref()
  cinemas.value.forEach(item=>{
    if (item.name === cinema){
      cinema_id.value = item.id
    }
  })
  router.push(`/selecthall/${route.params.id}/${cinema_id.value}`)
}
onMounted( async()=>{
  await getDetail(),
  await getSessionList(),
  handleAll()
})
</script>

<template>
  <div class="buy">
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
          <el-button style="margin-top: 20px;" round type="danger" @click="handle">查看更多电影详细</el-button>
        </div>
        <div class="score">
          <p>用户评分</p>
          <p style="color: #ffc600;" >{{ detail.score }}</p>

        </div>
      </div>
    </div>
    <div class="tags-panel">
      <el-card class="el-card">
        <div>
          <span>日期</span>
          <el-radio-group v-model="date" style="margin-bottom: 30px">
            <el-radio-button v-for="item in tabs" :value="item.date" @click="handleDate(item)" >{{ item.date }}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="cinema">
          <span>影院</span>
          <el-radio-group v-model="cinemaNmae" style="margin-bottom: 30px">
            <el-radio-button @click="handleAll()" value="全部" >全部</el-radio-button>
            <el-radio-button v-for="item in cinemas" :value="item.name" @click="handleCin(item)">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </div>
      </el-card>

    </div>

    <div class="cinInfo"  v-if="cinema != null " v-for="item in cinema">
      <div>
        <p class="title">{{item.cinema}}</p>
        <p class="addr">地址：{{ item.addr }}</p>
      </div>
      <div>
        <span class="price">￥{{item.price}}</span>
        <el-button type="danger" @click="buy(item.cinema)">点击购买</el-button>
      </div>
    </div>

    
    
  </div>
</template>

<style lang="less" scoped>
.buy {
  height: auto;
  width: 100%;

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
        left: 650px;

        p {
          margin-bottom: 10px;
        }
      }
    }

  }

  .tags-panel {
    width: 1000px;
    
    margin: 50px auto;
    .el-card{
      .cinema{
        span{
          margin-bottom: 30px;
        }
       
      }
      span{
        position: relative;
        top:5px;
        padding: 5px 10px;
        border: 1px solid rgb(175, 174, 174);
        border-radius: 5px;
      }
    }
  }
  .cinInfo{
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .title{
      font-size: 18px;
    }
    .addr{
      margin-top: 10px;
      color: #666;
    }
    .price{
      margin-right: 20px;
      color: #ffc600;
    }
  }
}
</style>