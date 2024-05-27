<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Camera from './components/Camera.vue'
import Notifications from './components/Notifications.vue'
</script>

<template>
  <div class="main">
    <HelloWorld/>
   <Camera/>
   <Notifications/>
</div>
</template>

<style scoped>
.main{
  background-color: aquamarine;
  width:100vw;
  height: 100vh;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
