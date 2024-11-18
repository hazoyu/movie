<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script> 

<template>
 <Header />
 <!-- :key="$route.fullPath"确保每次路由参数变化时组件都会重新渲染 -->
 <RouterView :key="$route.fullPath" />
 <Footer />
</template>

<style  scoped>

</style>