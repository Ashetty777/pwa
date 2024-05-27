<template>
    <div class="manifest-info">
      <h2>{{ manifestData.name }}</h2>
      <p>{{ manifestData.description }}</p>
      <div class="screenshots">
        <h3>Screenshots</h3>
        <div v-for="(screenshot, index) in manifestData.screenshots" :key="index">
          <img :src="screenshot.src" :alt="'Screenshot ' + (index + 1)" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        manifestData: __APP_MANIFEST__,
      };
    },
  };
  </script>
  
  <style scoped>
  .manifest-info {
    text-align: center;
  }
  
  .screenshots img {
    max-width: 100%;
    height: auto;
    margin: 10px;
  }
  </style>
  