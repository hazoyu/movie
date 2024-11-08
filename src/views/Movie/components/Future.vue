<script setup>
import { getMovieFutureAPI } from '@/apis/movie'
import { onMounted, ref } from 'vue';
const futureList = ref([])
const currentPage = ref(1)
const getfutureList = async () => {
  const res = await getMovieFutureAPI()
  futureList.value = res
}
onMounted(() =>
  getfutureList()
)

const currentchange = ()=>{
  console.log(currentPage.value);
}
</script>

<template>
  <div class="movie-list">
    <div class="movie-poster" v-for="i in futureList.slice((currentPage-1)*28,28*currentPage)">
      <img style="width: 100%; height: 220px;" :src="i.url" alt="">
      <p class="name">
        <span class="title" :title="i.title">{{ i.title }}</span>
      </p>
      <div class="notice">
        <p class="notice1">预告片</p>
        <p class="notice2">预售</p>
      </div>
      <div class="release">{{i.rel}}</div>
      <div class="detail">
        <span>导演：{{ i.director }}</span>
        <span>类型：{{ i.kind }}</span>
        <span>地区：{{ i.region }}</span>
        <span>语言：{{ i.language }}</span>
        <span>片长：{{ i.length }}</span>
      </div>
    </div>
    
  </div>
  <div class="layout">
    <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" @change="currentchange" :total="futureList.length/2.8" />
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  height: 1400px;
}

.movie-poster {
  position: relative;
  margin: 20px 0;
  display: flex;
  height: 300px;
  flex-direction: column;
  width: 160px;
  border: 1px solid rgb(232, 231, 231);
  box-sizing: border-box;
  margin-right: 6px;
  margin-left: 5px;
  overflow: hidden;
}

.name {
  position: absolute;
  font-size: 18px;
  color: white;
  /* top: -1px; */
  width: 100%;
  height: 220px;
  padding: 0 10px;
  background: url(../../../assets/images/0.png) repeat-x bottom;
}
.title{
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 80%;
     /* 文本不换行 */
     white-space: nowrap;
  /* 超出范围隐藏 */
  overflow: hidden;
  /* 文字超出用省略号 */
  text-overflow: ellipsis;
}
.notice {
  display: flex;
  text-align: center;
  padding: 10px 0 10px 0;
}

.notice1 {
  width: 79px;
  border-right: 1px solid rgb(232, 231, 231);
  color: #999;
  cursor: no-drop;
}

.notice2 {
  width: 79px;
}
.release{
  text-align: center;
  padding: 10px;
  border-top: 1px solid rgb(232, 231, 231);
  color: #999;
}

.detail {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 220px;
  width: 160px;
  font-size: 12px;
  justify-content: center;
  padding-left: 30px;
  background: rgba(9, 9, 9, 0.5);
  color: white;
  top: -220px;
  
}
.detail span{
  margin-bottom: 10px;
  width: 120px;
  /* 文本不换行 */
  white-space: nowrap;
  /* 超出范围隐藏 */
  overflow: hidden;
  /* 文字超出用省略号 */
  text-overflow: ellipsis;
}
.movie-poster:hover .detail{
  top: 0px;
  animation: seachTop 0.3s ease;
}
@keyframes seachTop {
  0%{
    top:-220px;
  }
  100%{
    top:0px;
  }
}
</style>