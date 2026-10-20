/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths so the build works from any sub-path (GitHub Pages, Vercel, a USB stick...).
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    // Installable app (iPhone "Add to Home Screen", Android/desktop install) that works offline:
    // the app shell, lessons, puzzles and the Stockfish engine are all precached.
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: './',
        name: 'Chess Master',
        short_name: 'Chess Master',
        description: 'Learn chess from your very first move to grandmaster level.',
        start_url: './',
        scope: './',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#12100e',
        theme_color: '#12100e',
        categories: ['education', 'games'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,wasm,json}'],
        // Launch screens are read by iOS at install time; no need to cache them offline.
        globIgnores: ['splash/**'],
        // The Stockfish WASM binary is ~1.8 MB.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        navigateFallback: 'index.html',
        // The AI coach proxy must always hit the network.
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    include: ['src/**/*.test.ts'],
  },
})
