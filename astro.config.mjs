// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rakan.my.id',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ],

  adapter: cloudflare()
});