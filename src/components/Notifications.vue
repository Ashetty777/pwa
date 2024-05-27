<template>
    <div class="notification-wrapper">
      <button @click="toggleNotifications" class="button notification-button">Notifications</button>
      
      <div v-if="showNotifications" class="card">
        <h2 class="card-title">Notifications</h2>
        <form class="form" @submit.prevent="handleSubmit">
          <input
            type="text"
            class="input"
            placeholder="Enter notification message"
            v-model="notificationMessage"
          />
          <button type="submit" class="button">Send Notification</button>
        </form>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notificationMessage: '',
        showNotifications: false,
      };
    },
    methods: {
      toggleNotifications() {
        this.showNotifications = !this.showNotifications;
      },
      async sendNotification() {
        if (!('Notification' in window)) {
          alert('This browser does not support desktop notification');
          return;
        }
  
        if (Notification.permission !== 'granted') {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            alert('Permission denied to show notifications');
            return;
          }
        }
  
        const title = 'What PWA Can Do Today';
        const options = {
          body: this.notificationMessage,
        };
  
        if ('serviceWorker' in navigator && 'showNotification' in ServiceWorkerRegistration.prototype) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, options);
          });
        } else {
          new Notification(title, options);
        }
      },
      handleSubmit() {
        this.sendNotification();
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-wrapper {
    text-align: center;
    margin-top: 20px;
  }
  
  .button {
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  
  .button:active {
    background-color: #004494;
  }
  
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: rgb(206, 196, 196);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  .card-title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .input:focus {
    border-color: #007bff;
    outline: none;
  }
  </style>
  