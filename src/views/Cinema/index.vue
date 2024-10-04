<!-- <script setup>
import { ref } from 'vue'

const radio = ref('全部区域')
const data = ["全部区域","宾阳县","横州市","江南区","良庆区隆安县"]
console.log(radio.value);
</script>

<template>
  <div class="container">
    <div class="select">
      <span>选择区域</span>
      <div class="tags">
        <el-radio-group v-model="radio">
          <el-radio :value="data[i-1]" size="large" v-for="i in data.length">{{data[i-1]}}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="detail">
      <div class="content" v-for="i in 3">
        <img src="../../assets/images/2.png" alt="">
        <div>
          <h2>广影国际影城（宾阳店）</h2>
          <p>宾阳县宾州镇中和路3号保利大厦3楼广影国际影城</p>
          <p>电话：19336052143</p>
          <p>更多：影院服务 交通信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  width: 550px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 40px;
}
.select{
 display: flex;
}

.select span{
  width: 100px;
  line-height: 40px;
  padding-right: 20px;
  padding-left: 10px;
  background-color: #409eff;
}
.tags{
  background-color: #c3e1ff;
  padding: 0 20px;
}
.detail{
  border: 1px solid rgb(232, 231, 231);
}
.content{
  display: flex;
  padding: 20px 20px;
  border-bottom: 1px solid rgb(232, 231, 231);
}
.content img{
  width: 90px; 
  height: 80px;
  margin-right: 20px;
  margin-top: 20px;
  border: 1px solid rgb(232, 231, 231);
}
.content p{
  color: #999;
  margin-top: 10px;
}
</style> -->