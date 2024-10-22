<script setup>
import { getMovieHotAPI } from '@/apis/movie'
import { onMounted, ref } from 'vue';
const hotList = ref([])
const currentPage = ref(1)
const getHotList = async () => {
  const res = await getMovieHotAPI()
  hotList.value = res
}
onMounted(() =>
  getHotList()
)
const currentchange = () => {
  console.log(currentPage.value);
}
</script>

<template>
  <div class="movie-list">
    <div class="movie-poster" v-for="i in hotList.slice((currentPage - 1) * 28, 28 * currentPage)">
      <img style="width: 100%; height: 220px;" :src="i.url" alt="">
      <p class="name">
        <span class="title" :title="i.title">{{ i.title }}</span>
        <span class="score">{{ i.score }}</span>
      </p>
      <!-- <span class="buy">购买</span> -->
      <p class="buy">购买</p>
      <div class="detail">
        <span>{{ i.director }}</span>
        <span>{{ i.kind }}</span>
        <span>{{ i.region }}</span>
        <span>{{ i.language }}</span>
        <span>{{ i.length }}</span>
      </div>
    </div>
  </div>
  <div class="layout">
    <el-pagination background layout="prev, pager, next" v-model:current-page="currentPage" @change="currentchange"
      :total="hotList.length / 2.8" />
  </div>
</template>

<style scoped>
.movie-list {
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  height: 1200px;
}

.movie-poster {
  position: relative;
  margin: 20px 0;
  display: flex;
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
  top: -1px;
  width: 100%;
  height: 220px;
  padding: 0 10px;
  background: url(../../../assets/images/0.png) repeat-x bottom;
}

.title {
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

.score {
  position: absolute;
  bottom: -5px;
  right: 10px;
  font-family: '华文隶书', sans-serif;
  color: #ffb400;
}

.buy {
  font-size: 16px;
  color: blue;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}

.buy:hover {
  background-color: blue;
  color: white
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