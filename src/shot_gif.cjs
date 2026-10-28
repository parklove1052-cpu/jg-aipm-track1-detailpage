// gif.html 의 프레임을 한 장씩 찍는다 → frames/f00.png ...  (뒤에서 PIL 로 GIF 로 묶음)
const { chromium } = require('C:/Users/conta/Documents/클로드코드/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, 'frames');
fs.mkdirSync(DIR, { recursive: true });

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 900, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('file:///' + path.resolve(__dirname, 'gif.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);

  const el = await p.$('#gif');
  const N = 24;
  for (let i = 0; i < N; i++) {
    await p.evaluate((k) => window.__step(k), i);
    await p.waitForTimeout(120);
    await el.screenshot({ path: path.join(DIR, 'f' + String(i).padStart(2, '0') + '.png') });
  }
  const box = await el.boundingBox();
  console.log('프레임', N, '장 ·', Math.round(box.width) + 'x' + Math.round(box.height));
  await b.close();
})();
