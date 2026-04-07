import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.quinocycle.com.my',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
