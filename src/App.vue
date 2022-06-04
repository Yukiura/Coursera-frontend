<template>
  <div id="app">
    <MyHeader/>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import MyHeader from "@/components/MyHeader";

export default {
  name: 'App',
  components: {MyHeader},
  mounted() {
    console.log('App', this)
  }
}
</script>

<style>
html {
  background-color: #eff2f6;
}

body {
  margin: 0;
}
</style>
