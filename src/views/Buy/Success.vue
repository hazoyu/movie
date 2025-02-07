<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const click = ()=>{
  router.push("/user")
}
</script>

<template>
  <div class="success">
    <el-steps
      style="max-width: 1000px"
      :space="300"
      :active="4"
      align-center
      finish-status="success"
    >
      <el-step title="选择放映厅" />
      <el-step title="选择座位" />
      <el-step title="付款" />
      <el-step title="支付成功" />
    </el-steps>
    <div class="info">
      <component class="icons" is="CircleCheck"></component>
      <p>完成支付</p>
    </div>
    <div class="lookOrder">
       <div> <component class="icons" is="WarningFilled"></component>
        该页面关闭后可以在<span style="color: rgb(174, 174, 48);;">个人订单</span>页面查看订单信息</div>
        <el-button type="danger" round @click="click">查看个人订单</el-button>
      </div>
  </div>
</template>

<style lang="less"  scoped>
.success{
  position: relative;
  width: 1000px;
  margin: 0 auto;
  height: 550px;
  margin-top: 20px;
  .info{
    margin-top: 20px;
    width: 100%;
    height: 350px;
    background-color: rgb(193, 245, 228);
    text-align: center;
    padding-top: 100px;
    color: rgb(1, 113, 76);
    font-size: 30px;
    .icons{
      width: 80px;
      height: 80px;
      color: rgb(1, 113, 76);
    }
  }
  .lookOrder{
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 10px;
      right: 0px;
      font-size: 12px;
      .icons{
        width: 10px;
        height:10px;
        color: rgb(212, 212, 103);
      }
      .el-button{
        margin-top: 20px;
        width: 100px;
        margin-left: 170px;
      }
    }
}
</style>