<template>
  <div class="media-capture">
    <video ref="video" autoplay></video>
    <div v-if="!cameraOpened" class="controls">
      <button @click="openCamera" class="btn open-camera">Open Camera</button>
    </div>
    <div v-else class="controls">
      <button @click="toggleRecording" class="btn recording">
        {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
      </button>
      <button @click="captureImage" class="btn capture">Capture Image</button>
      <button @click="toggleCamera" class="btn toggle">Switch Camera</button>
      <button @click="closeCamera" class="btn close">Close Camera</button>
    </div>
    <div v-if="mediaUrl" class="media-output">
      <h3>Captured Media</h3>
      <video v-if="isVideo" :src="mediaUrl" controls></video>
      <img v-else :src="mediaUrl" alt="Captured Image">
      <a :href="mediaUrl" :download="fileName" class="btn download">Download {{ isVideo ? 'Video' : 'Image' }}</a>
      <button @click="cancelMedia" class="btn cancel">Cancel</button>
    </div>
    <notification-component ref="notification"></notification-component>
  </div>
</template>

<script>
import NotificationComponent from './NotificationComponent.vue';

export default {
  components: {
    NotificationComponent,
  },
  data() {
    return {
      mediaRecorder: null,
      chunks: [],
      mediaUrl: null,
      isVideo: false,
      fileName: '',
      cameraOpened: false,
      isRecording: false,
      facingMode: 'user', // Default to front camera
      currentStream: null,
    };
  },
  methods: {
    async openCamera() {
      this.cameraOpened = true;
      await this.startCamera();
      this.$refs.notification.showNotification('Camera opened');
    },
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: this.facingMode },
          audio: true,
        });
        this.handleStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
        this.$refs.notification.showNotification(`Error accessing camera: ${error.message}`);
      }
    },
    async toggleCamera() {
      this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
      try {
        if (this.currentStream) {
          this.stopStream(this.currentStream);
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: this.facingMode },
          audio: true,
        });
        this.handleStream(stream);
        this.$refs.notification.showNotification(`Switched to ${this.facingMode === 'user' ? 'front' : 'back'} camera`);
      } catch (error) {
        console.error("Error toggling camera:", error);
        this.$refs.notification.showNotification(`Error toggling camera: ${error.message}`);
      }
    },
    handleStream(stream) {
      this.currentStream = stream;
      this.$refs.video.srcObject = stream;
    },
    stopStream(stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.$refs.video.srcObject = null;
    },
    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    async startRecording() {
      this.resetMedia();
      this.isVideo = true;
      this.fileName = 'video.mp4';
      const stream = this.$refs.video.srcObject;
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/mp4' });
        this.chunks = [];
        this.mediaUrl = URL.createObjectURL(blob);
      };
      this.mediaRecorder.start();
      this.isRecording = true;
      this.$refs.notification.showNotification('Recording started');
    },
    stopRecording() {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.isRecording = false;
        this.$refs.notification.showNotification('Recording stopped');
      }
    },
    async captureImage() {
      this.resetMedia();
      this.isVideo = false;
      this.fileName = 'image.png';
      const video = this.$refs.video;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.mediaUrl = canvas.toDataURL('image/png');
      this.$refs.notification.showNotification('Image captured');
    },
    closeCamera() {
      this.cameraOpened = false;
      if (this.currentStream) {
        this.stopStream(this.currentStream);
      }
      this.$refs.notification.showNotification('Camera closed');
    },
    cancelMedia() {
      this.resetMedia();
      this.$refs.notification.showNotification('Media cancelled');
    },
    resetMedia() {
      this.mediaUrl = null;
      this.isVideo = false;
      this.fileName = '';
    },
  },
};
</script>

<style scoped>
.media-capture {
  text-align: center;
  max-width: 600px;
  margin: auto;
}

video, img {
  max-width: 100%;
  margin: 10px 0;
}

.controls {
  margin: 20px 0;
}

.btn {
  background-color: #008cba; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 15px 32px; /* Some padding */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Make the buttons appear beside each other */
  font-size: 16px; /* Increase font size */
  margin: 4px 2px; /* Add some margin */
  cursor: pointer; /* Add a pointer cursor on hover */
  border-radius: 12px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for background color */
}

.btn:hover {
  background-color: #005f5f; /* Darker blue on hover */
}

.open-camera {
  background-color: #007bff; /* Blue background */
}

.open-camera:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.recording {
  background-color: #4CAF50; /* Green background */
}

.recording:hover {
  background-color: #45a049; /* Darker green on hover */
}

.capture {
  background-color: #ff9800; /* Orange background */
}

.capture:hover {
  background-color: #e68900; /* Darker orange on hover */
}

.download {
  background-color: #007bff; /* Blue background */
  text-decoration: none; /* Remove underline */
}

.download:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

.cancel {
  background-color: #6c757d; /* Gray background */
}

.cancel:hover {
  background-color: #5a6268; /* Darker gray on hover */
}

.close {
  background-color: #ff0000; /* Red background */
}

.close:hover {
  background-color: #cc0000; /* Darker red on hover */
}

.toggle {
  background-color: #ff9800; /* Orange background */
}

.toggle:hover {
  background-color: #e68900; /* Darker orange on hover */
}

.media-output {
  margin-top: 20px;
}
</style>
