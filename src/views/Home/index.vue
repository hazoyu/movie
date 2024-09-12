<script setup>

</script>

<template>
  <div class="home">
    <div class="content container">
      <div class="movie">
        <div class="hot">
          <div class="hot-title">
            <h2>正在热映</h2>
          </div>
          <div class="movie-list">
            <div class="movie-poster" v-for="i in 8">
              <img style="width: 100%; height: 220px;" src="../../assets/images/220.jpeg" alt="">
              <p class="name">
                <span style="float: left;">文波</span>
                <span style="float: right;">9.8</span>
              </p>
              <!-- <span class="buy">购买</span> -->
              <p class="buy">购买</p>
            </div>
          </div>
        </div>
        <div class="future">
          <div class="future-title">
            <h2>即将上映</h2>
          </div>
          <div class="movie-list">
            <div class="movie-poster" v-for="i in 8">
              <img style="width: 100%; height: 220px;" src="../../assets/images/220.jpeg" alt="">
              <p class="name">
                <span style="float: left;">文波</span>
              </p>
              <!-- <span class="buy">购买</span> -->
              <p class="want">0人想看</p>
              <div class="notice">
                <p class="notice1">预告片</p>
                <p class="notice2">预售</p>
              </div>
              <div class="release">9月9日上映</div>
            </div>

          </div>

        </div>
      </div>
      <div class="grossed">
        <h2>今日票房</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 60px 0;
}

.content {
  display: flex;
  justify-content: space-between;
}

.movie {
  width: 760px;
}

.grossed {
  width: 400px;
}

h2 {
  color: #ef4238;
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
}

.name {
  position: absolute;
  font-size: 18px;
  color: white;
  top: 194px;
  width: 100%;
  padding: 0 10px;
  background-color: rgba(22, 21, 21, 0.5);
}

.buy {
  font-size: 16px;
  color: #ef4238;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
}
.buy:hover {
  background-color: #ef4238;
  color: white;
}

.want {
  color: #ffb400;
  padding: 10px;
}

.notice {
  display: flex;
  text-align: center;
  padding: 0 0 10px 0;
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
}
</style>