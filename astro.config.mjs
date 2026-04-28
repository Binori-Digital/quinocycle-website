import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.quinocycle.com.my',
  trailingSlash: 'always',
  output: 'static',

  build: {
    assets: '_assets',
  },

  integrations: [tailwind()],
});