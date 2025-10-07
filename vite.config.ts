import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import pkg from './package.json' with { type: 'json' }

const { version } = pkg
export default defineConfig({
  base: '/krd/',
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    {
      name: 'html-version-comment',
      apply: 'build',
      transformIndexHtml(html) {
        const comment = `<!-- App version: ${version} -->`
        return `${html}\n${comment}`
      },
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
