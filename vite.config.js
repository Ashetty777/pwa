import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'My PWA App',
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
          src: 'pwa-512x512.png',
          type: 'image/png',
          sizes: '512x512',
          form_factor: 'wide',
        },
        {
          src: 'pwa-192x192.png',
          type: 'image/png',
          sizes: '192x192',
          form_factor: 'narrow',
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
