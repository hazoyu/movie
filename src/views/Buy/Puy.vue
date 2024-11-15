<script setup>

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
      <el-step title="选择影片场次" />
      <el-step title="选择座位" />
      <el-step title="付款" />
      <el-step title="影院取票观影" />
    </el-steps>
  </div>
</template>

<style  scoped>

</style>