<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAllDataStore } from '@/stores';
const store = useAllDataStore()

const orderList = computed(()=>store.state.orders).value.filter(item=>{
  if (item.id.slice(8,10) == store.state.user.id) return true
  return false
})

</script>
<template>
  <div class="order">
    <p class="title">我的订单</p>
    <div class="orderList" v-for="item in orderList">
      <p class="time">
        {{ item.buytime }}
        <span class="id">订单号：{{item.id}}</span>
      </p> 
      <div class="orderInfo">
        <img :src="item.movieurl" alt="">
        <div>
          <span class="name">{{ item.movie }}</span>
          <span class="cinema">{{ item.cinema }}</span>
          <span class="hall">{{ item.hall }} {{item.seat}}</span>
          <span class="date">{{ item.time }}</span>
        </div>
        <span class="price">￥{{ item.price }}</span>
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
.id{
  margin-left: 40px;
  color: #b6b6b6;
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
  font-size: 13px;
}
.date{
  color: rgb(245, 44, 44);
}
.price{
  position: absolute;
  top:55px;
  right: 250px;
}
.state{
  position: absolute;
  top:55px;
  right: 100px;
}
</style>