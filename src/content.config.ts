import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const experience = defineCollection({
	loader: glob({ pattern: '*.md', base: './portfolio-markdown/experience' }),
	schema: z.object({
		company: z.string(),
		role: z.string(),
		employment_type: z.string().optional(),
		period: z.string().optional(),
		featured: z.boolean(),
		order: z.number(),
		case_studies: z.array(z.string()).optional(),
	}),
});

const caseStudies = defineCollection({
	loader: glob({ pattern: '*.md', base: './portfolio-markdown/case-studies' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		category: z.string(),
		company: z.string().optional(),
		period: z.string().optional(),
		role: z.string(),
		summary: z.string(),
		featured: z.boolean(),
		order: z.number(),
		tech: z.array(z.string()),
		highlights: z.array(z.string()),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '*.md', base: './portfolio-markdown/projects' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		category: z.string(),
		period: z.string().optional(),
		role: z.string(),
		team: z.string().optional(),
		contribution: z.string().optional(),
		summary: z.string(),
		featured: z.boolean(),
		order: z.number(),
		links: z.record(z.string(), z.string()).optional(),
		tech: z.array(z.string()),
		highlights: z.array(z.string()),
	}),
});

export const collections = { experience, 'case-studies': caseStudies, projects };
