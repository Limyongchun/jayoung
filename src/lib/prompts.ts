import type { Project, Section } from "@/types";

const SECTION_TEMPLATES: Record<string, (inputs: Record<string, string>) => string> = {
  hero: (i) => `
[히어로 섹션]
헤드라인: ${i.headline || ""}
서브 카피: ${i.subheadline || ""}
핵심 특징: ${i.productFeature || ""}
→ 상품을 처음 보는 고객이 1초 만에 가치를 느낄 수 있도록, 강렬하고 감각적인 메인 비주얼을 생성하라.`,

  problem: (i) => `
[문제 공감 섹션]
불편함1: ${i.painPoint1 || ""}
불편함2: ${i.painPoint2 || ""}
불편함3: ${i.painPoint3 || ""}
→ 고객이 "맞아, 나 이 문제 있어!"라고 공감하게 만드는 감정이입 이미지를 생성하라.`,

  benefits: (i) => `
[핵심 혜택 섹션]
혜택1: ${i.benefit1 || ""}
혜택2: ${i.benefit2 || ""}
혜택3: ${i.benefit3 || ""}
혜택4: ${i.benefit4 || ""}
→ 아이콘+텍스트+일러스트를 활용해 혜택을 직관적으로 전달하는 이미지를 생성하라.`,

  lifestyle: (i) => `
[라이프스타일 섹션]
사용 장면: ${i.scene || ""}
분위기: ${i.mood || ""}
고객 감정: ${i.targetFeeling || ""}
→ 감성적이고 현실적인 사용 장면을 연출해 구매 욕구를 자극하는 이미지를 생성하라.`,

  detail: (i) => `
[상품 상세 섹션]
소재/성분: ${i.material || ""}
규격/용량: ${i.spec || ""}
원산지/제조: ${i.origin || ""}
→ 신뢰감을 주는 성분 클로즈업, 텍스처, 인포그래픽 이미지를 생성하라.`,

  comparison: (i) => `
[비교 우위 섹션]
비교 대상: ${i.competitor || ""}
차별점1: ${i.diff1 || ""}
차별점2: ${i.diff2 || ""}
차별점3: ${i.diff3 || ""}
→ 명확한 비교표 또는 대비 이미지로 우리 제품의 우수성을 표현하라.`,

  trust: (i) => `
[신뢰 요소 섹션]
인증/수상: ${i.cert || ""}
언론 노출: ${i.press || ""}
판매/후기: ${i.sales || ""}
→ 공신력을 높이는 인증 배지, 언론 로고, 숫자 강조 이미지를 생성하라.`,

  components: (i) => `
[구성품 섹션]
구성품1: ${i.item1 || ""}
구성품2: ${i.item2 || ""}
구성품3: ${i.item3 || ""}
패키지 특이사항: ${i.packageNote || ""}
→ 구성품을 깔끔하게 펼쳐 보여주는 플랫레이 스타일 이미지를 생성하라.`,

  howto: (i) => `
[사용법 섹션]
Step1: ${i.step1 || ""}
Step2: ${i.step2 || ""}
Step3: ${i.step3 || ""}
팁: ${i.tip || ""}
→ 번호 순서가 명확한 스텝 가이드 이미지를 생성하라.`,

  cta: (i) => `
[CTA 섹션]
긴급성: ${i.urgency || ""}
특별 혜택: ${i.offer || ""}
최종 카피: ${i.finalCopy || ""}
→ 지금 당장 구매하고 싶게 만드는 강렬한 마무리 이미지를 생성하라.`,
};

export function generatePrompt(project: Project, section: Section): string {
  const master = `
=== 마스터 프롬프트 ===
브랜드명: ${project.brandName}
상품명: ${project.productName}
카테고리: ${project.category}
타깃 고객: ${project.targetCustomer}
디자인 스타일: ${project.masterStyle.designStyle}
대표 컬러: ${project.masterStyle.mainColor}
배경 스타일: ${project.masterStyle.backgroundStyle}
서체 느낌: ${project.masterStyle.fontMood}
전체 톤: ${project.masterStyle.tone}
이미지 크기: 860 × 1000px (세로형 상세페이지)
언어: 한국어
`.trim();

  const sectionTemplate = SECTION_TEMPLATES[section.type];
  const sectionPrompt = sectionTemplate ? sectionTemplate(section.userInputs) : "";

  return `${master}\n\n${sectionPrompt.trim()}`;
}
