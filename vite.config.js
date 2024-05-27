import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'My PWA Apps',
        short_name: 'PWA App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose:"maskable",
          },
        ],
        description:
          'Pwa Setup Project Where you can send notifications and also click pictures record vedio and install the application in the mobile devices',
        screenshots: [
          {
            src: 'pwa-192x192.png',
            type: 'image/png',
            sizes: '590x525',
            form_factor: 'narrow',
          },
          {
            src: 'pwa-192x192.png',
            type: 'image/png',
            sizes: '577x731',
            form_factor: 'wide',
          },
          {
            src: 'pwa-192x192.png',
            type: 'image/png',
            sizes: '603x713',
            form_factor: 'wide',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
});
