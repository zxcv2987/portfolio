// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hideUnconfirmed } from './src/plugins/hide-unconfirmed.mjs';

// https://astro.build/config
export default defineConfig({
	// TODO: replace with the real production domain once deployed (needed for
	// correct sitemap/canonical/OG URLs).
	site: 'https://taeyang-portfolio.vercel.app',
	integrations: [sitemap()],
	markdown: {
		processor: satteri({ mdastPlugins: [hideUnconfirmed] }),
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
