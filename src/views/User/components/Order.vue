<script setup>

</script>
<template>
  <div class="order">
    <p class="title">我的订单</p>
    <div class="orderList" v-for="i in 5">
      <p class="time">2024-10-4 14:00</p>
      <div class="orderInfo">
        <img src="../../../assets/images/220.jpeg" alt="">
        <div>
          <span class="name">文波电影</span>
          <span class="cinema">文波影院</span>
          <span class="hall">文波厅</span>
          <span class="date">2024.09.04</span>
        </div>
        <span class="price">￥999</span>
        <span class="state">已完成</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order {
  width: 1100px;
  height: 500px;
  padding: 20px;
  overflow: auto;
}

.title {
  border-bottom: 1px solid rgb(225, 224, 224);
  padding-bottom: 10px;
  color: hsla(242, 89%, 50%, 0.5);
}
.orderList{
  margin: 20px 0;
  border:1px solid rgb(225, 224, 224);
}
.time{
  background-color: rgb(237, 234, 234);
  line-height: 50px;
  padding-left: 10px;
}
.orderInfo {
  display: flex;
  position: relative;
  padding: 10px;
}

.orderInfo img {
  width: 80px;
  height: 100px;
  margin-right: 10px;
}

.orderInfo div{
  display: flex;
  flex-direction: column;
}
.name{
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 3px;
}
.cinema,.hall{
  color: #b0b0b0;
  margin-bottom: 3px;
}
.date{
  color: hsla(242, 89%, 50%, 0.5);
}
.price{
  position: absolute;
  top:55px;
  right: 150px;
}
.state{
  position: absolute;
  top:55px;
  right: 40px;
}
</style>