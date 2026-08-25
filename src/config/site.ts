export interface NavItem {
	href: string;
	label: string;
}

export const site = {
	name: '강태양',
	nameEn: 'Taeyang Kang',
	role: 'Frontend Engineer',
	headline:
		'운영 과정에서 발견한 문제를 구조적으로 해결해 서비스 안정성과 개발 생산성을 높이는 프론트엔드 개발자',
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
