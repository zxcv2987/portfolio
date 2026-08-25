// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';
import { hideUnconfirmed } from './src/plugins/hide-unconfirmed.mjs';

// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: satteri({ mdastPlugins: [hideUnconfirmed] }),
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
