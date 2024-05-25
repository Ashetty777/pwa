<template>
  <div v-if="deferredPrompt">
    <button @click="installApp">Install App</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
    };
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  },
  methods: {
    async installApp() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
      }
    },
  },
};
</script>
