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

export interface SkillGroup {
	label: string;
	items: string[];
}

/**
 * profile.md의 "## 기술" 섹션 안에 있는 "### 그룹" 목록만 읽는다.
 * 섹션으로 먼저 범위를 자르지 않으면 마지막 그룹이 파일 끝까지(= "## 연락처"와
 * 그 아래 목록까지) 삼키므로, 파싱 위치는 이 함수 한 곳으로 고정한다.
 */
export function getSkillGroups(profile: Profile): SkillGroup[] {
	const section =
		/(?:^|\n)## 기술\s*\n([\s\S]*?)(?:\n## |\s*$)/.exec(profile.body)?.[1] ?? '';

	return [...section.matchAll(/### (.+?)\s*\n([\s\S]*?)(?=### |$)/g)].map(
		(match) => ({
			label: match[1].trim(),
			items: match[2]
				.split(/\r?\n|,/)
				.map((item) => item.trim())
				.filter(Boolean),
		}),
	);
}
