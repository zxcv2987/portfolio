/**
 * 사이트 대표 이미지 에셋 생성기.
 *
 * 소스는 전부 SVG(scripts/assets/*.svg)이고, 여기서 PNG/ICO로 렌더한다.
 * sharp는 Astro 이미지 파이프라인이 함께 설치하는 라이브러리라 별도 의존성을
 * 추가하지 않는다. 실행: npm run assets
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'scripts', 'assets');
const publicDir = join(root, 'public');

const COLORS = {
	background: '#fafaf9',
	foreground: '#1c1917',
	muted: '#57534e',
	border: '#e7e5e4',
};

const FONT_STACK =
	"'Apple SD Gothic Neo', 'Pretendard Variable', Pretendard, 'Noto Sans KR', 'Noto Sans CJK KR', 'Malgun Gothic', sans-serif";

/** 홈·파비콘에서 쓰는 T 이니셜 마크. */
function tMark(fill) {
	return `<rect x="22" y="22" width="84" height="16" rx="8" fill="${fill}"/>
	<rect x="56" y="30" width="16" height="76" rx="8" fill="${fill}"/>`;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
	<rect width="1200" height="630" fill="${COLORS.background}"/>
	<g transform="translate(1072 72) scale(0.44)">${tMark(COLORS.border)}</g>
	<text x="80" y="132" font-family="${FONT_STACK}" font-size="20" font-weight="600" letter-spacing="5" fill="${COLORS.muted}">FRONTEND ENGINEER</text>
	<text x="76" y="316" font-family="${FONT_STACK}" font-size="128" font-weight="700" letter-spacing="-6" fill="${COLORS.foreground}">강태양</text>
	<text x="82" y="372" font-family="${FONT_STACK}" font-size="33" font-weight="500" letter-spacing="1" fill="${COLORS.muted}">Taeyang Kang</text>
	<text x="82" y="474" font-family="${FONT_STACK}" font-size="31" font-weight="600" letter-spacing="-0.6" fill="${COLORS.foreground}">사용자 문제를 이해하고 더 나은 제품 경험을</text>
	<text x="82" y="518" font-family="${FONT_STACK}" font-size="31" font-weight="600" letter-spacing="-0.6" fill="${COLORS.foreground}">만들어가는 프론트엔드 엔지니어</text>
	<line x1="80" y1="560" x2="1120" y2="560" stroke="${COLORS.border}" stroke-width="2"/>
	<text x="80" y="598" font-family="${FONT_STACK}" font-size="19" font-weight="500" letter-spacing="0.5" fill="${COLORS.muted}">Frontend Portfolio</text>
</svg>
`;

const adaptiveFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
	${tMark('#1c1917')}
	<style>
		rect { fill: #1c1917; }
		@media (prefers-color-scheme: dark) {
			rect { fill: #fafaf9; }
		}
	</style>
</svg>
`;

/** 파비콘/터치 아이콘용 단색 타일. 밝은·어두운 탭 모두에서 보이도록 대비를 고정한다. */
const tileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
	<rect width="128" height="128" fill="${COLORS.foreground}"/>
	${tMark(COLORS.background)}
</svg>
`;

function pngToIco(pngBuffers, sizes) {
	const count = pngBuffers.length;
	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0);
	header.writeUInt16LE(1, 2);
	header.writeUInt16LE(count, 4);

	const entries = Buffer.alloc(16 * count);
	let offset = 6 + 16 * count;
	pngBuffers.forEach((buffer, index) => {
		const size = sizes[index];
		const entry = 16 * index;
		entries.writeUInt8(size >= 256 ? 0 : size, entry);
		entries.writeUInt8(size >= 256 ? 0 : size, entry + 1);
		entries.writeUInt8(0, entry + 2);
		entries.writeUInt8(0, entry + 3);
		entries.writeUInt16LE(1, entry + 4);
		entries.writeUInt16LE(32, entry + 6);
		entries.writeUInt32LE(buffer.length, entry + 8);
		entries.writeUInt32LE(offset, entry + 12);
		offset += buffer.length;
	});

	return Buffer.concat([header, entries, ...pngBuffers]);
}

async function main() {
	let sharp;
	try {
		sharp = (await import('sharp')).default;
	} catch {
		console.error('sharp를 찾을 수 없습니다. Astro 설치 후 다시 실행하세요.');
		process.exitCode = 1;
		return;
	}

	await mkdir(assetsDir, { recursive: true });
	await mkdir(join(publicDir, 'og'), { recursive: true });

	await writeFile(join(assetsDir, 'og-default.svg'), ogSvg);
	await writeFile(join(assetsDir, 'favicon.svg'), adaptiveFaviconSvg);
	await writeFile(join(assetsDir, 'icon.svg'), tileSvg);

	await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og', 'og-default.png'));

	const tile = Buffer.from(tileSvg);
	await sharp(tile).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
	await sharp(tile).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'));

	const icoSizes = [16, 32, 48];
	const icoPngs = await Promise.all(
		icoSizes.map((size) => sharp(tile).resize(size, size).png().toBuffer()),
	);
	await writeFile(join(publicDir, 'favicon.ico'), pngToIco(icoPngs, icoSizes));

	await writeFile(join(publicDir, 'favicon.svg'), adaptiveFaviconSvg);

	console.log('생성 완료: og/og-default.png, apple-touch-icon.png, favicon.ico, favicon-32.png, favicon.svg');
}

main();
