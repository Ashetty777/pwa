<template>
    <div class="card">
      <h2 class="card-title">Notifications</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <input
          type="text"
          class="input"
          placeholder="Enter notification message"
          v-model="notificationMessage"
        />
        <button type="submit" class="button">Send Notificationssss</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notificationMessage: '',
      };
    },
    methods: {
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
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  </style>
  