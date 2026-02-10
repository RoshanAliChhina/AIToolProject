import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ignore-optional-deps',
      resolveId(id) {
        // Tell Vite to treat optional dependencies as external
        const optionalDeps = [
          'firebase/app',
          'firebase/firestore',
          'firebase/auth',
          '@supabase/supabase-js',
          'openai',
          '@anthropic-ai/sdk'
        ];
        if (optionalDeps.includes(id) || optionalDeps.some(dep => id.startsWith(dep + '/'))) {
          return { id, external: true };
        }
      },
    },
  ],
  // Prevent Vite from trying to resolve optional dependencies during dev
  ssr: {
    noExternal: [], // Don't externalize anything for SSR (we're not using SSR)
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'utils-vendor': ['react-helmet-async']
        }
      },
      external: (id) => {
        // Mark optional dependencies as external - they'll be loaded dynamically at runtime
        const optionalDeps = [
          'openai',
          '@anthropic-ai/sdk',
          'firebase/app',
          'firebase/firestore',
          'firebase/auth',
          '@supabase/supabase-js'
        ];
        return optionalDeps.some(dep => id === dep || id.startsWith(dep + '/'));
      },
      onwarn(warning, warn) {
        // Suppress warnings about external optional dependencies
        if (warning.code === 'EXTERNALIZED_IMPORT' ||
          (warning.code === 'UNRESOLVED_IMPORT' &&
            (warning.id === 'openai' || warning.id === '@anthropic-ai/sdk' ||
              warning.id?.includes('firebase') || warning.id?.includes('supabase')))) {
          return;
        }
        // Suppress warning about toolsData being both static and dynamic import
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message?.includes('toolsData.js')) {
          return;
        }
        // Suppress chunk splitting warnings for toolsData
        if (warning.message?.includes('toolsData.js') &&
          warning.message?.includes('dynamic import will not move module')) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    exclude: ['openai', '@anthropic-ai/sdk', 'firebase', 'firebase/app', 'firebase/firestore', 'firebase/auth', '@supabase/supabase-js'],
  },
  server: {
    port: 5173,
    open: true, // Automatically open browser
    hmr: {
      overlay: false, // Disable overlay to prevent blocking on optional dependency errors
      clientPort: 5173, // Fix WebSocket connection
      protocol: 'ws', // Use WebSocket protocol
    },
    fs: {
      // Allow serving files from project root
      strict: false,
    },
    watch: {
      // Ignore node_modules to reduce file watching
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  // Suppress warnings about optional dependencies
  logLevel: 'info',
})
