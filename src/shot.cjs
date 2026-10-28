// page.html 의 섹션마다 860px PNG 로 저장 — node shot.cjs
const { chromium } = require('C:/Users/conta/Documents/클로드코드/node_modules/playwright');
const path = require('path');

(async () => {
  // 🛑 pw-browsers 가 이 playwright 판과 안 맞는다 → 설치된 크롬을 쓴다
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 1 });
  await p.goto('file:///' + path.resolve(__dirname, 'page.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);   // 폰트 받기

  const ids = await p.$$eval('section.sec', (ns) => ns.map((n) => n.id));
  for (const id of ids) {
    const el = await p.$('#' + id);
    const box = await el.boundingBox();
    const file = path.join(__dirname, 'out', id + '.png');
    await el.screenshot({ path: file });
    console.log(id, Math.round(box.width) + 'x' + Math.round(box.height), '→', path.basename(file));
  }
  await b.close();
})();
