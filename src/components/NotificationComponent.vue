<template>
    <transition name="fade">
      <div v-if="visible" class="notification">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: '',
        visible: false,
        timeout: null,
      };
    },
    methods: {
      showNotification(msg, duration = 1000) {
        this.message = msg;
        this.visible = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.visible = false;
        }, duration);
      },
    },
  };
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #323232;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  