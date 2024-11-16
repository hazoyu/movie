<script setup>
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import {getMovieDetailAPI} from '@/apis/movie'
import { getSessionAPI } from '@/apis/screen';
import { getSeatAPI,getNewSeatAPI,getUpDataSeatAPI } from '@/apis/seat';
import { useAllDataStore } from '@/stores';
import { useRoute,useRouter } from 'vue-router';

const store = useAllDataStore()
const route = useRoute()
const router = useRouter()
let arr = ref([])
const price = ref(0) //总价
//获取电影详细
const movie = ref({}) 
const getDetail =async ()=>{
  const res = await getMovieDetailAPI(route.params.movie_id)
  movie.value = res
}
//获取放映场次
const session = ref({})
const getSession = async()=>{
  const res = await getSessionAPI(route.params.session_id)
  session.value = res
  size()
}
//获取影厅大小

const size = ()=>{
  const screen = computed(()=>store.state.screenList.find((item)=>item.name === session.value.hall && item.cinemaname === session.value.cinema))
  let m = 10 , n = parseInt(screen.value.size/10)
  arr.value = Array.from(Array(m),() => Array(n).fill(1));
  if (screen.value.size%m != 0 ){
    const a = []
    for (let i = 0; i < 2; i++) {
      a.push(1)
    }
    arr.value.push(a)
  }
}


const obj = reactive({
  id:'',
  seat:''
})
let seatArr = reactive([])
//获取已选座位
const getSeat =async () =>{
  const res = await getSeatAPI(route.params.session_id)

  if (res){  //有数据就把座位取出来
    seatArr = JSON.parse(res.seat) //字符串转数组
    seatArr.forEach(item => {
      arr.value[item[0]-1][item[1]-1] = 2
    });
    
  }else{   //无数据就创建新座位
    await getNewSeatAPI(route.params.session_id)
  }
}
//点击座位
const tags = ref([])
const seat = (i,j) =>{
    if (arr.value[i-1][j-1] === 1 && tags.value.length<4){
      const obj = {seat:`${i}排${j}座`}
      seatArr.push([i,j])
      tags.value.push(obj)
      arr.value[i-1][j-1] = 3
      price.value = session.value.price * tags.value.length
    } else if (arr.value[i-1][j-1] === 3){
      const obj = {seat:`${i}排${j}座`}
      tags.value = tags.value.filter(item=>{
        if (item.seat === obj.seat) return false
        return true
      })
      arr.value[i-1][j-1] = 1
      price.value = session.value.price * tags.value.length
    } else if (arr.value[i-1][j-1] === 2){
          ElMessage.error("该座位已被选");
    } else {
      ElMessage.error("最多只能选择4个座位");
    }
}
const imageUrl = (path)=>{
  return new URL(`../../assets/images/zuowei${path}.png`, import.meta.url).href;
}
function newDate(time) {
  let year = time.getFullYear(); //年
  let month = (time.getMonth() + 1).toString().padStart(2, '0'); // 月
  let date = time.getDate().toString().padStart(2, '0'); // 日
  let hour = time.getHours().toString().padStart(2, '0'); // 时
  let minute = time.getMinutes().toString().padStart(2, '0'); // 分
  return (
    year+month+ date +hour+minute
  )
}
let getTime = new Date().getTime(); 
let time = new Date(getTime);
const c = (i) =>{
  return i < 10 ? `0${i}` : `${i}`
}

//订单对象   num < 10 ? `0${num}` : `${num}`;
const order = ref({
  id:'',        //订单ID：购买日期（年月日）+用户ID+电影ID+影厅ID+购买日期（时分） 20241115015201
  user:'',
  movie:'',
  movieurl:'',
  cinema:'',
  hall:'',
  buytime:'',   //购买时间
  time:'',      //场次时间
  seat:'',
  price:''
})

//点击确认选座
const confirm =async () =>{
  if (price.value != 0 ){
    const seatString = JSON.stringify(seatArr);
    obj.id = route.params.session_id
    obj.seat = seatString
    order.value.id = newDate(time).slice(0,8)+c(store.state.user.id)+c(route.params.movie_id)+c(route.params.session_id)+newDate(time).slice(8)
    order.value.user = store.state.user.username
    order.value.movie = movie.value.title
    order.value.movieurl = movie.value.url
    order.value.cinema = session.value.cinema
    order.value.hall = session.value.hall
    order.value.buytime = newDate(time).slice(0,4)+"-"+newDate(time).slice(4,6)+"-"+newDate(time).slice(6,8)+" "+newDate(time).slice(8,10)+":"+newDate(time).slice(10,12)
    order.value.time = session.value.time
    tags.value.forEach(item=>{
      order.value.seat = order.value.seat + item.seat+" "
    })
    order.value.price = price.value
    store.info(obj,order.value)
    ElMessage({ type: 'success', message: '选座成功' })
    router.push("/puy")
  } else {
    ElMessage({ type: 'warning', message: '请选择座位' })
  }
}


onMounted(async()=>{
  getDetail();
  await getSession();
  getSeat();
})

</script>

<template>
  <div class="select">
    <el-steps
      style="max-width: 1000px"
      :space="300"
      :active="1"
      align-center
      finish-status="success"
    >
      <el-step title="选择影片场次" />
      <el-step title="选择座位" />
      <el-step title="付款" />
      <el-step title="影院取票观影" />
    </el-steps>
    <el-card style="margin-top: 20px; height: 500px;">
      <div style="display: flex;">
        <div class="seat">
          <div style="display: flex; justify-content: space-evenly;">
            <span>
              <img src="../../assets/images/zuowei1.png" alt="">
              可选座位
            </span>
            <span>
              <img src="../../assets/images/zuowei2.png" alt="">
              已售座位
            </span>
            <span>
              <img src="../../assets/images/zuowei3.png" alt="">
              已选座位
            </span>
          </div>
          <div>
            <p class="p1"></p>
            <p class="p2"></p>
            <p >屏幕中央</p>
            <div class="row" v-for="i in arr.length">
              <span class="row-T">{{ i }}</span>
              <span class="seat" v-for="j in arr[i-1].length" @click="seat(i,j)">
                <img :src="imageUrl(arr[i-1][j-1])" >
              </span>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="movie-info">
            <img :src="movie.url" alt="">
            <div>
              <h2>{{ movie.title }}</h2>
              <p><span>类型：</span>{{ movie.kind }}</p>
              <p><span>时长：</span>{{ movie.length }}</p>
            </div>
          </div>
          <div class="session-info">
            <p><span>影院：</span> {{ session.cinema }}</p>
            <p><span>影厅：</span>{{ session.hall }}</p>
            <p><span>语言：</span>{{ movie.language }} </p>
            <p><span>场次：</span> <span class="time">{{ session.time }}</span></p>
            <p style=" margin-bottom: 20px;"><span>票价：</span>￥{{ session.price }}/张 </p>
            <span class="seats">
              座位：
              
              <el-tag v-if="tags.length != 0" v-for="tag in tags" :key="tag.seat" type="danger">
                {{ tag.seat }}
              </el-tag>
              <span v-else>一次最多选择4个座位</span>
            </span>
            <p class="price"><span>总价：</span><span style="font-size: 12px; color: #f03d37;">￥</span>{{ price }}</p>
            <el-button type="danger" @click="confirm">确认选座</el-button>
          </div>
      </div>
      </div>
    </el-card>
  </div>

</template>

<style lang="less"  scoped>
.select{
  width: 1000px;
  padding: 20px 0;
  margin: 0 auto;
  height: auto;
  .el-steps{
    margin: 0 auto;
  }
  .el-card__body{
    display: flex;
    .seat{
      height: 500px;
      width: 590px;
      text-align: center;
      .row{
        .row-T{
          position: relative;
          display: inline-block;
          width: 10px; 
          margin: 0px 10px;
          margin-right: 10px;
          color: #ccc;
          top: 5px;
        }
        .seat{
            display: inline-block;
            font-size: 0;
            width: 25px;
            height: 20px;
            margin: 3px 10px;
            cursor: pointer;
        }
      }
      img{
        width: 25px;
        height: 20px;
      }
      .p1{
        width: 400px;
        margin: 0 auto;
        margin-top: 20px;
        height: 1px;
        // border: 1px solid rgb(215, 215, 215);
        box-shadow: 0px -3px 3px rgb(172, 171, 171);
      }
      .p2{
        width: 400px;
        height: 10px;
        background-color: rgb(241, 241, 241);
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 10px 10px 15px 15px;
      }
    }
    .info{
      height: 500px;
      width: 370px;
      .movie-info{
        display: flex;
        height: 170px;
        img{
          width: 120px;
          height: 160px;
          margin-right: 20px;
        }
      }
      .session-info{
        height: 270px;
        .seats{
          display: inline-block;
          color: #999;
          font-size: 12px;
          height: 23px;
          line-height: 23px;
        }
        .price{
            color: #f03d37;
            font-size: 20px;
            span{
              font-size: 12px;
            }
          }
        .el-tag{
          margin-right: 5px;
        }
        .el-button{
          margin-top: 20px;
        }
      }
      p{  
          font-size: 12px;
          margin-top: 5px;
          span{
            color: #999;
          }
          .time{
            color: #f03d37;
          }
        }
    }
  }
}
</style>