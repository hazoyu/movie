<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {getMovieDetailAPI} from '@/apis/movie'
const route = useRoute()
const detail = ref({})
const getDetail =async ()=>{
  const res = await getMovieDetailAPI(route.params.id)
  detail.value = res
  console.log(detail.value);
}

const tabs = [
  {
    data: '10月25日',
  }, {
    data: '10月26日',
  }, {
    data: '10月27日',
  }
]
const cinemas=ref([
      {
        name: '大地影院',
        addr: '万达广场'
      },
      {
        name: '万达影院',
        addr: '万达广场'
      },
      {
        name: '成龙影院',
        addr: '万达广场'
      },
      {
        name: '影院',
        addr: '万达广场'
      },
    ])
const data = ref('')
const cinemaNmae = ref('')
// const cinemas = ref('')

const cinema = ref({})
const handleCin = (item)=>{
  cinema.value=item
  console.log(route.params.id);
}

onMounted(()=>{
  getDetail()
})
</script>

<template>
  <div class="detail">
    <div class="banner">
      <div class="container">
        <img :src="detail.url" alt="">
        <div class="info">
          <h2>{{ detail.title }}</h2>
          <p>{{ detail.director }}</p>
          <p>{{ detail.kind }}</p>
          <p>{{ detail.region }}</p>
          <p>{{ detail.length }}</p>
          <p>{{ detail.language }}</p>
          <p>2024-09-30 18：00中国大陆上映</p>
        </div>
        <div class="score">
          <p>用户评分</p>
          <p style="color: #ffc600;">{{ detail.score }}</p>
        </div>
      </div>
    </div>
    <div class="tags-panel">
      <el-card class="el-card">
        <div>
          <span>日期</span>
          <el-radio-group v-model="data" style="margin-bottom: 30px">
            <el-radio-button v-for="item in tabs" :value="item.data" >{{ item.data }}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="cinema">
          <span>影院</span>
          <el-radio-group v-model="cinemaNmae" style="margin-bottom: 30px">
            <el-radio-button v-for="item in cinemas" :value="item.name" @click="handleCin(item)">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </div>
      </el-card>

    </div>

    <div class="cinInfo" v-if="cinema.name!=null">
      <div>
        <p class="title">{{cinema.name}}</p>
        <p class="addr">地址：{{ cinema.addr }}</p>
      </div>
      <div>
        <span class="price">￥89起</span>
        <el-button type="danger">点击购买</el-button>
      </div>
    </div>
    
    
  </div>
</template>

<style lang="less" scoped>
.detail {
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
        right: 300px;

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