export interface NavItem {
	href: string;
	label: string;
}

export const site = {
	name: '강태양',
	nameEn: 'Taeyang Kang',
	role: 'Frontend Engineer',
	headline:
		'서비스 운영 흐름을 이해하고 구조적 판단으로 안정성과 생산성을 함께 개선하는 프론트엔드 개발자',
	email: 'z62314386@gmail.com',
	github: 'https://github.com/zxcv2987',
	resumePath: '/resume.pdf',
} as const;

export const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/experience', label: 'Experience' },
	{ href: '/case-studies', label: 'Case Studies' },
	{ href: '/projects', label: 'Projects' },
];
