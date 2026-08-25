import { parse } from 'yaml';
import { z } from 'astro/zod';
import rawProfile from '../../portfolio-markdown/profile.md?raw';

const profileSchema = z.object({
	name: z.string(),
	english_name: z.string(),
	role: z.string(),
	headline: z.string(),
	email: z.email(),
	github: z.url(),
	resume_path: z.string(),
});

export type Profile = z.infer<typeof profileSchema> & { body: string };

export function getProfile(): Profile {
	const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n)?([\s\S]*)$/.exec(rawProfile);
	if (!match) {
		throw new Error('profile.md frontmatter could not be parsed');
	}
	const data = profileSchema.parse(parse(match[1]));
	return { ...data, body: match[2].trim() };
}
