<template>
  <div v-if="showInstallButton">
    <button @click="installApp" class="install-button">
      <i class="fas fa-download"></i> Install App
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
      showInstallButton: false,
    };
  },
  mounted() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.showInstallButton = false;
    }
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
        this.showInstallButton = false;
      }
    },
  },
};
</script>

<style scoped>
.install-button {
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  border: none; /* Remove borders */
  padding: 12px 24px; /* Some padding */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Make the buttons appear beside each other */
  font-size: 16px; /* Increase font size */
  margin: 4px 2px; /* Add some margin */
  cursor: pointer; /* Add a pointer cursor on hover */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for background color */
}

.install-button:hover {
  background-color: #218838; /* Darker green on hover */
}

.install-button i {
  margin-right: 8px; /* Space between icon and text */
}
</style>


