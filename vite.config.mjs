// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Generates dist/bundle-visualizer.html
    visualizer({
      filename: 'dist/bundle-visualizer.html',
      open: false
    })
  ],

  build: {
    outDir: 'dist',           // Required for Vercel
    sourcemap: true,          // Matches your build script
    chunkSizeWarningLimit: 1500, // KB

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return

          if (id.includes('node_modules')) {
            // React + router
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('react-helmet')
            ) return 'vendor-react'

            // Redux
            if (id.includes('@reduxjs') || id.includes('redux'))
              return 'vendor-redux'

            // Recharts + D3
            if (id.includes('recharts') || id.includes('d3'))
              return 'vendor-charts'

            // Google libraries
            if (
              id.includes('@googlemaps') ||
              id.includes('@google/generative-ai')
            )
              return 'vendor-google'

            // Supabase
            if (id.includes('@supabase'))
              return 'vendor-supabase'

            // Framer Motion
            if (id.includes('framer-motion'))
              return 'vendor-framer'

            // Dhiwise
            if (id.includes('@dhiwise'))
              return 'vendor-dhiwise'

            // Tailwind / PostCSS
            if (
              id.includes('tailwindcss') ||
              id.includes('postcss') ||
              id.includes('autoprefixer')
            )
              return 'vendor-tailwind'

            // Utils
            if (
              id.includes('axios') ||
              id.includes('date-fns') ||
              id.includes('clsx') ||
              id.includes('lucide-react')
            )
              return 'vendor-utils'

            // fallback vendor
            return 'vendor'
          }
        }
      }
    }
  }
})
