/**
 * 마크다운 본문 첫 줄의 h1을 제거한다.
 * 페이지 헤더가 이미 같은 제목을 h1으로 렌더하므로, 그대로 두면 문서에
 * h1이 두 개가 된다. CSS로 감추면 DOM과 문서 개요에는 그대로 남기 때문에
 * 렌더 단계에서 노드를 없앤다.
 */
export const stripLeadingH1 = {
	name: 'strip-leading-h1',
	after(root, ctx) {
		const first = (root.children ?? [])[0];
		if (first && first.type === 'heading' && first.depth === 1) {
			ctx.removeNode(first);
		}
	},
};
