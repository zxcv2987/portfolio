export interface MetaItem {
	label: string;
	value: string;
}

export interface LinkItem {
	href: string;
	label: string;
	external?: boolean;
}

const LINK_LABELS: Record<string, string> = {
	service: '서비스',
	repository: '저장소',
	admin: '관리자 시스템',
	frontend: '프론트엔드 저장소',
	backend: '백엔드 저장소',
	web_v1: '웹 v1',
	web_v2: '웹 v2',
	app: '앱',
};

/**
 * 데이터가 비었거나 아직 확정되지 않았(TODO 표시가 남아 있)는지 판별한다.
 * 확정 전 데이터는 화면에 노출하지 않기 위해 사용한다.
 */
export function isUnconfirmed(value: string | undefined | null): boolean {
	if (!value) return true;
	return value.includes('TODO');
}

/** 값이 확정된 경우에만 메타 항목을 만든다. */
export function pickMeta(
	label: string,
	value: string | undefined,
): MetaItem | null {
	if (!value || isUnconfirmed(value)) return null;
	return { label, value };
}

function isExternal(href: string): boolean {
	return /^(https?:)?\/\//.test(href);
}

/** projects 컬렉션의 links 레코드를 링크 목록으로 변환한다. */
export function linkItemsFromRecord(record: Record<string, string>): LinkItem[] {
	return Object.entries(record)
		.filter(([, href]) => !isUnconfirmed(href))
		.map(([key, href]) => ({
			href,
			label: LINK_LABELS[key] ?? key,
			external: isExternal(href),
		}));
}
