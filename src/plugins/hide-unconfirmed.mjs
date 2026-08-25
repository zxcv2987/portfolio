/**
 * 확정 전 데이터를 렌더링에서 숨기는 프로비저널 필터.
 * - 첫 문단이 "TODO"로 시작하는 인용 영역을 제거한다.
 * - "공개 전 확인"(공개 전 검토용 체크리스트) 섹션을 제거한다.
 * 원본 마크다운은 변경하지 않고, 화면 출력만 제한한다.
 * 실제 본문 매핑과 사실 대조 검증은 다음 유닛에서 정리 예정.
 */

const HIDDEN_SECTION_TITLES = new Set(['공개전확인']);

export const hideUnconfirmed = {
	name: 'hide-unconfirmed',
	after(root, ctx) {
		const targets = [];

		const collectBlockquotes = (node) => {
			for (const child of node.children ?? []) {
				if (child.type === 'blockquote') {
					const text = ctx.textContent(child);
					if (/^\s*TODO/.test(text)) {
						targets.push(child);
						continue;
					}
				}
				collectBlockquotes(child);
			}
		};
		collectBlockquotes(root);

		let removingSection = false;
		for (const child of root.children ?? []) {
			if (child.type === 'heading' && child.depth <= 2) {
				removingSection = HIDDEN_SECTION_TITLES.has(
					ctx.textContent(child).replace(/\s/g, ''),
				);
			}
			if (removingSection) {
				targets.push(child);
			}
		}

		for (const target of targets) {
			ctx.removeNode(target);
		}
	},
};
