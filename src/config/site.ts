export interface NavItem {
	href: string;
	label: string;
}

export const site = {
	name: '강태양',
	nameEn: 'Taeyang Kang',
	role: 'Frontend Engineer',
	headline:
		'사용자 문제를 이해하고 더 나은 제품 경험을 만들어가는 프론트엔드 엔지니어',
	email: 'z62314386@gmail.com',
	github: 'https://github.com/zxcv2987',
	resumePath: '/resume',
	locale: 'ko_KR',
	/** 공유 카드 대표 이미지. 루트 기준 상대 경로로 두어 도메인을 하드코딩하지 않는다. */
	ogImage: '/og/og-default.png',
} as const;

export const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/case-studies', label: 'Case Studies' },
	{ href: '/projects', label: 'Projects' },
];
