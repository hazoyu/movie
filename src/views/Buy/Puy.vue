<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs'
import { useAllDataStore } from '@/stores';
import { useRouter } from 'vue-router';
const router = useRouter()
const stoer = useAllDataStore()
const value = ref(dayjs().add(15, 'minute'))
const label = reactive([
  {
    prop:"movie",
    label:"影片"
  },
  {
    prop:"time",
    label:"时间"
  },
  {
    prop:"cinema",
    label:"影院"
  },
  {
    prop:"hall",
    label:"影厅"
  },
  {
    prop:"seat",
    label:"座位",
    width:240
  },
])
const data =reactive([])
const order = computed(()=>stoer.state.order)
data.push(order.value)
const confirm = () =>{
  ElMessageBox.confirm("确定支付？",'提示',{    
    confirmButtonText: '确定',
    cancelButtonText: '取消',    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '正在支付'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 2000)
      } else {
        done()
      }
    },}).then(async () => {
      await stoer.updataSeat()
      await stoer.saveOrder()
      await stoer.order()  //获取最新订单
      ElMessage({
        showClose: true,
        message: '支付成功',
        type: 'success'
      })
    
      router.push("/success")
  })
}
</script>

<template>
  <div class="pay">
    <el-steps
      style="max-width: 1000px"
      :space="300"
      :active="2"
      align-center
      finish-status="success"
    >
      <el-step title="选择放映厅" />
      <el-step title="选择座位" />
      <el-step title="付款" />
      <el-step title="影院取票观影" />
    </el-steps>
    <div class="time">
      <component class="icons" is="Timer"></component>
      <div>
        <p>请在<el-countdown format="mm:ss" :value="value" /><span style="display:inline-block;width: 70px;"></span>内支付完成</p>
        <p style="color: rgb(242, 36, 36);">超时订单会自动取消，如遇支付问题，请联系管理员</p>
      </div>
    </div>
    <div class="orderInfo">
      <p class="tips">
        <component class="icons" is="WarningFilled"></component>
        请仔细核对场次信息，出票后将<span style="color: rgb(174, 174, 48);;">无法退票和改票</span>
      </p>
      <el-table :data="data"  border style="width: 100%">
        <el-table-column v-for="item in label" :prop="item.prop" :label="item.label" :width="item.width ? item.width : 190" />
      </el-table>
      <div class="pay2">
        <span>实际支付：<span style="font-size: 25px; color: rgb(242, 36, 36);">{{order.price}}</span></span>
        <el-button type="danger" round @click="confirm">确认支付</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pay{
  width: 1000px;
  margin: 0 auto;
  height: 550px;
  margin-top: 20px;
  .time{
    position: relative;
    display: flex;
    align-items: center;
    margin: 20px 0;
    padding-left: 20px;
    height: 80px;
    background-color: rgb(253, 230, 230);
    .el-statistic{
      position: absolute;
      width: 100px;
      top: 15px;
      left: 100px;
    }
    .icons {
      width: 38px;
      height:38px;
      margin-right: 8px;
      color: rgb(242, 36, 36);
    }
  }
  .orderInfo{
    position: relative;
    .tips{
      font-size: 12px;
      margin-bottom: 20px;
      .icons{
        width: 10px;
        height:10px;
        color: rgb(212, 212, 103);
      }
    }
    .pay2{
      position: absolute;
      display: flex;
      width: 150px;
      height: 80px;
      flex-direction: column;
      top:200px;
      right: 20px;
      .el-button{
        margin-top: 10px;
      }
    }
  }
}

</style>