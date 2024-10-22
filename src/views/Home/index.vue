<script setup>
import { getMovieHotAPI, getMovieFutureAPI, getMovieBoxOfficeAPI } from '@/apis/movie'
import { onMounted, ref } from 'vue';
const hotList = ref([])
const futureList = ref([])
const boxOfficeList = ref([])
const getHotList = async () => {
  const res = await getMovieHotAPI()
  hotList.value = res
}

const getfutureList = async () => {
  const res = await getMovieFutureAPI()
  futureList.value = res
}
const getboxOfficeList = async () => {
  const res = await getMovieBoxOfficeAPI()
  boxOfficeList.value = res
}

onMounted(() => {
  getHotList(),
    getfutureList(),
    getboxOfficeList()
})
</script>

<template>
  <div class="home">
    <div class="content container">
      <div class="movie">
        <div class="hot">
          <div class="hot-title">
            <h2>正在热映</h2>
            <span class="all" @click="$router.push('/movie')">查看全部></span>
          </div>
          <div class="movie-list">
            <div class="movie-poster" v-for="i in hotList.slice(0, 8)">
              <img style="width: 100%; height: 220px;" :src="i.url" alt="">
              <p class="name">
                <span class="title" :title="i.title">{{ i.title }}</span>
                <span class="score">{{ i.score }}</span>
              </p>
              <!-- <span class="buy">购买</span> -->
              <p class="buy">购买</p>
            </div>
          </div>
        </div>
        <div class="future">
          <div class="future-title">
            <h2>即将上映</h2>
            <span class="all" @click="$router.push('/movie/future')">查看全部></span>
          </div>
          <div class="movie-list">
            <div class="movie-poster" v-for="i in futureList.slice(0, 8)">
              <img style="width: 100%; height: 220px;" :src="i.url" alt="">
              <p class="name">
                <span class="title" :title="i.title">{{ i.title }}</span>
              </p>
              <div class="notice">
                <p class="notice1">预告片</p>
                <p class="notice2">预售</p>
              </div>
              <div class="release">{{ i.rel }}</div>
            </div>

          </div>

        </div>
      </div>
      <div class="boxOffice">
        <h2>本周票房</h2>
        <div class="boxOffice-list">
          <div class="weeklist" v-for="(i, index) in boxOfficeList.slice(0, 3)">
            <div>
              <span class="sort">{{ index + 1 }}</span>
              <span>{{ i.title }}</span>
            </div>
            <span class="count">{{ i.boxoffice }}</span>
          </div>
          <div class="weeklist" v-for="(i, index) in boxOfficeList.slice(3, 5)">
            <div>
              <span class="sort2">{{ index + 4 }}</span>
              <span>{{ i.title }}</span>
            </div>
            <span class="count">{{ i.boxoffice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 60px 0;
  height:1450px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.movie {
  width: 760px;
}

.boxOffice {
  width: 400px;
}

.weeklist {
  display: flex;
  height: 55px;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 55px;
  font-size: 16px;
}

.sort {
  font-family: '华文隶书', sans-serif;
  margin-right: 10px;
  font-size: 18px;
  color: red;
}

.sort2 {
  font-family: '华文隶书', sans-serif;
  margin-right: 10px;
  font-size: 18px;
}

.count {
  color: blue;
}

.hot-title,
.future-title {
  display: flex;
  justify-content: space-between;
}

h2 {
  /* color:hsl(242, 89%, 50%); */
  color: blue;
}

.all {
  font-size: 12px;
  line-height: 30px;
  color: skyblue;
  cursor: pointer;
}


.movie-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

.movie-poster {
  position: relative;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  width: 160px;
  border: 1px solid rgb(232, 231, 231);
  box-sizing: border-box;
}

.name {
  position: absolute;
  font-size: 18px;
  color: white;
  top: 0px;
  width: 100%;
  height: 220px;
  padding: 0 10px;
  background: url(../../assets/images/0.png) repeat-x bottom;
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
  color: white;
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

.release {
  text-align: center;
  padding: 10px;
  border-top: 1px solid rgb(232, 231, 231);
  color: #999;
}
</style>