import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      out: 'dist',  // This is where the built output will go
      precompress: false,  // Set this to true if you want to precompress files
      env: { port: 3000 }, // Set environment variables or defaults
    })
  },
  preprocess: sequence([
    vitePreprocess(),
    preprocessMeltUI()
  ])
};

export default config;
