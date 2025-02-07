<script setup>
import { computed, onMounted, ref ,reactive} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {getMovieDetailAPI} from '@/apis/movie'
import {getSessionListAPI} from '@/apis/screen'
import { useAllDataStore } from '@/stores';

const store = useAllDataStore()
const route = useRoute()
const router = useRouter()

const movie = ref({}) //获取电影详细
const getDetail =async ()=>{
  const res = await getMovieDetailAPI(route.params.movie_id)
  movie.value = res
}

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
//获取影院
const cinema =computed(()=> store.state.cinemaList.find((obj) => obj.id == route.params.cinema_id));
const date = ref("")
//获取场次信息
const info = ref([])
const getSessionList = async()=>{
  const res = await getSessionListAPI()
  const data = res.filter(item=>{
    if (item.movie === movie.value.title && item.cinema === cinema.value.name && new Date(item.time) > time) return true
    return false
  })
  info.value = data
  info.value.forEach(item=>item.language = movie.value.language)
}
const label = reactive([
  {
    prop: 'time',
    label: '放映时间',
  },
  {
    prop: 'language',
    label: '语言版本',
  },
  {
    prop: 'hall',
    label: '放映厅',
  },
  {
    prop: 'price',
    label: '售价（元）',
  }
])
const tableData = ref([])
//点击日期
const handleDate = (item)=>{
  const arr = info.value.filter(i=>{
    if (i.time.slice(5,10) === item.date.slice(2,7)) return true
    return false
  })
  tableData.value = arr
}
//点击选座购票
const selectSeat = (i)=>{
  router.push(`/selectseat/${route.params.movie_id}/${i.id}`)
}
onMounted(async()=>{
  await getDetail(),
  await getSessionList()

})
</script>

<template>
  <div class="buy">
    <div class="banner">
      <div class="container">
        <h2>{{cinema.name}}</h2>
        <p>地址：{{ cinema.addr }}</p>
        <p>电话：0775-✶✶✶✶✶✶✶</p>
        <p>影院服务 ————————————————————————————————</p>
        <p class="serve">
          <span class="tab">3D眼镜</span>
          <span>免押金</span>
        </p>
        <p class="serve">
          <span class="tab">可停车</span>
          <span>停车场可凭电影票在影城票台领取三小时内免停权益</span>
        </p>
      </div>
    </div>
    <div class="bread">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/buy/${route.params.movie_id}` }">选择影院</el-breadcrumb-item>
        <el-breadcrumb-item >选择放映厅</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="info">
      <h2>{{movie.title}}</h2>
      <div class="info-T">
        <span>时长：{{movie.length}}</span>
        <span>类型：{{ movie.kind }}</span>
        <span>导演：{{ movie.director }}</span>
        <el-divider />
        <p class="time">请选择放映时间</p>
      </div>
      <el-radio-group v-model="date" style="margin-bottom: 30px">
        <el-radio-button v-for="item in tabs" :value="item.date" @click="handleDate(item)" >{{ item.date }}</el-radio-button>
      </el-radio-group>

      <el-table :data="tableData" style="width: 100%;" empty-text="无场次">
        <el-table-column  v-for="item in label" :prop="item.prop" :label="item.label" width="160" />
        <el-table-column fixed="right" label="选座购票" min-width="120">
          <template #="scope">
            <el-button type="primary" size="small" @click="selectSeat(scope.row)">选座购票</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      // display: flex;
      padding-top: 50px;
      padding-bottom: 50px;
      p{
        margin-top: 10px;
      }
      .serve{
        font-size: 12px;
        .tab{
          padding: 3px 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 5px;
        }
      }

    }

  }
  .bread{
    position: absolute;
    top:360px;
    left: 355px;
  }
  .info{
    width: 800px;
    margin: 0 auto;
    margin-top: 50px;
    height: 500px;
    .info-T{
      margin-top: 10px;
      margin-bottom: 25px;
      .time{
        color: red;
      }
      span{
        margin-right: 30px;
        color: #666;
      }
    }
  }
}
</style>