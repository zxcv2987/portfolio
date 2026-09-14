// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { hideUnconfirmed } from './src/plugins/hide-unconfirmed.mjs';
import { stripLeadingH1 } from './src/plugins/strip-leading-h1.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://portfolio-bigsheeps-projects.vercel.app',
	integrations: [sitemap()],
	markdown: {
		processor: satteri({ mdastPlugins: [stripLeadingH1, hideUnconfirmed] }),
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
