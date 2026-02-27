import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    // Don't watch api directory
    watch: {
      ignored: ['**/api/**'],
    },
    // Proxy /api requests to return mock data in development
    proxy: {
      '/api/get-result': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            // Return mock response for local development
            const url = new URL(req.url || '', 'http://localhost');
            const shareId = url.searchParams.get('shareId');

            if (shareId) {
              // Mock response - in production this would fetch from Vercel KV
              const mockResult = {
                type: 'INTJ',
                dimensions: {
                  EI: -20,
                  SN: 30,
                  TF: 40,
                  JP: 25
                },
                facets: []
              };

              proxyReq.setHeader('x-mock-response', JSON.stringify(mockResult));
            }
          });
        },
        bypass: (req, res) => {
          // Return mock data directly
          const url = new URL(req.url || '', 'http://localhost');
          const shareId = url.searchParams.get('shareId');

          if (res && shareId) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              type: 'INTJ',
              dimensions: {
                EI: -20,
                SN: 30,
                TF: 40,
                JP: 25
              },
              facets: []
            }));
            return false;
          }
          return req.url;
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    ssr: {
      noExternal: true,
    },
  },
})
