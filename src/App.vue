<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style>
  #app {
    font-family: Microsoft YaHei SimSun, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: white;
    color: #323233;
    font-size: 16px;
  }
</style>
