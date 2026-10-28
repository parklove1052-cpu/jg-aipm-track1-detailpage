# (주)제이지그룹 AI PM 선발 과제 · TRACK 1 — 팔리는 상세페이지

**한능검 7일 벼락치기 자료집** 상세페이지 제작 과제입니다.

- **결과물 보기 →** https://jg-track1-hanguk.dehayoung.workers.dev
- 제출자: 조현준 · 2026-10-28

---

## 제출물

| 과제 요구 | 위치 |
|---|---|
| 레퍼런스 분석 (전체 섹션 순서와 역할) | 결과물 페이지 **01** — 캡처 34장 → 17개 섹션 |
| 상세페이지 이미지 (최소 6섹션, GIF 1개 이상, 가로 860px) | `out/` — PNG 8장 + GIF 1장, 전부 860px |
| 섹션별 Before / After 정리 | 결과물 페이지 **03** — 6개 섹션, 과제 3장의 양식 |
| 제작 노트 (AI 도구, 핵심 프롬프트 3개 이상, 버린 시도) | 결과물 페이지 **04** — 프롬프트 원문 4개, 버린 시도 6가지 |

## 상세페이지 구성 (9섹션)

| # | 파일 | 섹션 | 움직임 |
|---|---|---|---|
| 1 | `out/s1.png` | 후킹 — 두꺼운 문제집을 끝까지 보지 말라 | 정지 |
| 2 | `out/s2.png` | 문제 제기 — 무엇을 버릴지가 등급을 정한다 | 정지 |
| 3 | `out/s_gif.gif` | **효과 1 · 덜어내기** | **GIF** |
| 4 | `out/s3.png` | 효과 1 — 3개년 최다빈출 개념 + 별점 우선순위표 | 정지 |
| 5 | `out/s4.png` | 효과 2 — 개념 옆에 실제 출제 문항 | 정지 |
| 6 | `out/s5.png` | 7일 학습 순서 | 정지 |
| 7 | `out/s6.png` | 자료집 구성 01~04 | 정지 |
| 8 | `out/s7.png` | 반론 처리 — "요약본만 봐도 괜찮을까요?" | 정지 |
| 9 | `out/s8.png` | 마무리 — 덜어낸 것이 자료집이다 | 정지 |

### GIF 가 하는 일

레퍼런스에서 **만점자 인터뷰 영상 두 칸이 움직이던 자리**입니다.
인물·후기를 쓸 수 없으므로 그 자리가 하던 일(= "이 자료를 믿어도 된다")만 가져와,
**두꺼운 수험서에서 종이가 한 장씩 사라지고 → 얇은 자료집에 ★★★★★ '최다빈출' 도장이 찍히는** 움직임으로 바꿨습니다.
소구점이 '덜어내기'이므로 **덜어내는 동작 자체가 증명**이 됩니다.

## 만든 방법

이미지 생성 AI 를 쓰지 않았습니다. 레퍼런스의 사진·인물·로고를 가져오지 않기 위해 **모든 화면을 코드로 직접 그렸습니다.**

```
src/page.html      8개 정지 섹션 (HTML/CSS)
src/gif.html       GIF용 섹션 — window.__step(i) 로 프레임마다 모양이 바뀜
src/shot.cjs       Playwright + 설치된 Chrome 으로 섹션마다 860px PNG 렌더
src/shot_gif.cjs   24프레임을 한 장씩 캡처 → frames/
```

```bash
node src/shot.cjs        # out/s1.png ~ s8.png
node src/shot_gif.cjs    # frames/f00.png ~ f23.png
python - <<'PY'          # frames → out/s_gif.gif
from PIL import Image; import glob
fs = sorted(glob.glob('frames/f*.png'))
ims = [Image.open(f).convert('RGB') for f in fs]
d = [150]*len(ims); d[0] = 700; d[-1] = 1400
ims[0].save('out/s_gif.gif', save_all=True, append_images=ims[1:], duration=d, loop=0)
PY
```

사용 도구: **Claude (Claude Code)** — 레퍼런스 판독·섹션 분석·카피·HTML/CSS 작성 ·
**Playwright + Chrome** — 860px 렌더링 · **Pillow** — GIF 묶기

## 지킨 것

- 레퍼런스의 이미지·문구·로고를 그대로 가져오지 않았습니다. **구조와 설득 방식만** 참고했습니다.
- 합격률·수강생 수·후기 등 **확인되지 않은 수치는 넣지 않았습니다.**
  자리만 잡은 곳은 `○○` 와 **"예시"** 배지로 표시했고, 근거를 댈 수 없는 섹션(적중 증명·만족도 설문)은 **통째로 뺐습니다.**

## 폴더

```
src/    상세페이지·GIF 소스와 렌더 스크립트
out/    제출 이미지 (860px PNG 8장 + GIF 1장)
site/   공개 페이지 전체 (= 위 결과물 링크와 같은 내용)
```
