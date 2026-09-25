// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://rakan.my.id',

  integrations: [sitemap({
    filter: (page) => !page.includes('/404')
  }), react()],

  adapter: cloudflare()
});