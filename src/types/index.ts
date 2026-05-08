export type SectionType =
  | "hero"
  | "problem"
  | "benefits"
  | "lifestyle"
  | "detail"
  | "comparison"
  | "trust"
  | "components"
  | "howto"
  | "cta";

export type SectionStatus = "idle" | "generating" | "done" | "error";

export interface SectionField {
  key: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
  required?: boolean;
}

export interface SectionConfig {
  type: SectionType;
  num: string;
  title: string;
  description: string;
  fields: SectionField[];
  supportsImageUpload?: boolean;
}

export interface Section {
  id: string;
  type: SectionType;
  status: SectionStatus;
  userInputs: Record<string, string>;
  uploadedImages: string[];
  generatedImageUrl?: string;
  generatedPrompt?: string;
}

export interface MasterStyle {
  designStyle: string;
  mainColor: string;
  backgroundStyle: string;
  fontMood: string;
  tone: string;
}

export interface Project {
  id: string;
  productName: string;
  brandName: string;
  category: string;
  targetCustomer: string;
  platform: string;
  masterStyle: MasterStyle;
  sections: Section[];
  createdAt: number;
  referenceImages: string[];
  referenceAnalysis?: string;
}

export const SECTION_CONFIGS: SectionConfig[] = [
  {
    type: "hero",
    num: "01",
    title: "메인 히어로",
    description: "첫인상을 결정하는 대표 이미지. 상품과 브랜드를 강렬하게 소개합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "headline", label: "헤드라인", type: "text", placeholder: "예: 일상을 바꾸는 단 하나의 선택", required: true },
      { key: "subheadline", label: "서브 카피", type: "text", placeholder: "예: 10년 노하우로 만든 프리미엄 제품" },
      { key: "productFeature", label: "핵심 특징 (1줄)", type: "text", placeholder: "예: 국내산 원료 100% 사용", required: true },
    ],
  },
  {
    type: "problem",
    num: "02",
    title: "문제 공감",
    description: "고객의 불편함과 고민을 공감하며 필요성을 환기합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "painPoint1", label: "불편함 1", type: "text", placeholder: "예: 매일 아침 뻑뻑한 피부 때문에 고민이신가요?", required: true },
      { key: "painPoint2", label: "불편함 2", type: "text", placeholder: "예: 비싼 제품 써도 효과가 없어서 지쳤나요?" },
      { key: "painPoint3", label: "불편함 3", type: "text", placeholder: "예: 성분 복잡해서 뭘 사야 할지 모르겠다고요?" },
    ],
  },
  {
    type: "benefits",
    num: "03",
    title: "핵심 혜택",
    description: "이 상품이 제공하는 3~4가지 핵심 가치를 보여줍니다.",
    supportsImageUpload: true,
    fields: [
      { key: "benefit1", label: "혜택 1", type: "text", placeholder: "예: 72시간 지속 보습", required: true },
      { key: "benefit2", label: "혜택 2", type: "text", placeholder: "예: 피부과 테스트 완료" },
      { key: "benefit3", label: "혜택 3", type: "text", placeholder: "예: 5가지 유해성분 無" },
      { key: "benefit4", label: "혜택 4", type: "text", placeholder: "예: 비건 인증 원료" },
    ],
  },
  {
    type: "lifestyle",
    num: "04",
    title: "라이프스타일",
    description: "상품을 사용하는 이상적인 장면을 감성적으로 연출합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "scene", label: "사용 장면", type: "text", placeholder: "예: 아침 루틴, 여행 중, 운동 후", required: true },
      { key: "mood", label: "분위기", type: "text", placeholder: "예: 여유롭고 세련된 일상" },
      { key: "targetFeeling", label: "고객이 느낄 감정", type: "text", placeholder: "예: 나를 잘 챙기는 사람이 된 기분" },
    ],
  },
  {
    type: "detail",
    num: "05",
    title: "상품 상세",
    description: "소재, 성분, 스펙 등 구매 결정에 필요한 정보를 제공합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "material", label: "소재/성분", type: "textarea", placeholder: "예: 히알루론산 5000ppm, 나이아신아마이드 5%...", required: true },
      { key: "spec", label: "규격/용량", type: "text", placeholder: "예: 50ml / 약 2개월분" },
      { key: "origin", label: "원산지/제조", type: "text", placeholder: "예: 국내 제조 (OEM: ㈜코스랩)" },
    ],
  },
  {
    type: "comparison",
    num: "06",
    title: "비교 우위",
    description: "경쟁 제품과의 차별점을 한눈에 보여줍니다.",
    supportsImageUpload: true,
    fields: [
      { key: "competitor", label: "비교 대상", type: "text", placeholder: "예: 기존 크림 제품들", required: true },
      { key: "diff1", label: "차별점 1", type: "text", placeholder: "예: 우리 제품 - 흡수 속도 3배 빠름", required: true },
      { key: "diff2", label: "차별점 2", type: "text", placeholder: "예: 우리 제품 - 방부제 무첨가" },
      { key: "diff3", label: "차별점 3", type: "text", placeholder: "예: 우리 제품 - 가격 30% 저렴" },
    ],
  },
  {
    type: "trust",
    num: "07",
    title: "신뢰 요소",
    description: "수상 이력, 인증, 언론 노출, 누적 판매량 등을 강조합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "cert", label: "인증/수상", type: "text", placeholder: "예: 식약처 인증, 비건 협회 인증" },
      { key: "press", label: "언론/방송 노출", type: "text", placeholder: "예: KBS 생생정보통 소개, 조선일보 선정" },
      { key: "sales", label: "판매/후기 지표", type: "text", placeholder: "예: 누적 판매 50만 개, 재구매율 78%" },
    ],
  },
  {
    type: "components",
    num: "08",
    title: "구성품",
    description: "패키지에 포함된 구성품을 명확하게 보여줍니다.",
    supportsImageUpload: true,
    fields: [
      { key: "item1", label: "구성품 1", type: "text", placeholder: "예: 본품 50ml × 1", required: true },
      { key: "item2", label: "구성품 2", type: "text", placeholder: "예: 증정품 미니 크림 10ml × 1" },
      { key: "item3", label: "구성품 3", type: "text", placeholder: "예: 전용 파우치 × 1" },
      { key: "packageNote", label: "패키지 특이사항", type: "text", placeholder: "예: 친환경 FSC 인증 박스 사용" },
    ],
  },
  {
    type: "howto",
    num: "09",
    title: "사용법",
    description: "단계별 사용 방법을 쉽고 직관적으로 안내합니다.",
    supportsImageUpload: true,
    fields: [
      { key: "step1", label: "Step 1", type: "text", placeholder: "예: 세안 후 토너로 피부결 정돈", required: true },
      { key: "step2", label: "Step 2", type: "text", placeholder: "예: 소량을 덜어 얼굴 전체에 도포" },
      { key: "step3", label: "Step 3", type: "text", placeholder: "예: 손바닥으로 가볍게 밀착시켜 마무리" },
      { key: "tip", label: "사용 팁", type: "text", placeholder: "예: 냉장 보관 시 더욱 청량한 사용감" },
    ],
  },
  {
    type: "cta",
    num: "10",
    title: "구매 유도 (CTA)",
    description: "구매를 결심하게 만드는 마지막 설득 메시지입니다.",
    supportsImageUpload: true,
    fields: [
      { key: "urgency", label: "긴급성/희소성", type: "text", placeholder: "예: 이번 달 한정 200세트, 소진 시 종료" },
      { key: "offer", label: "특별 혜택", type: "text", placeholder: "예: 지금 구매 시 증정품 + 무료배송" },
      { key: "finalCopy", label: "최종 카피", type: "text", placeholder: "예: 지금 바로 경험해보세요", required: true },
    ],
  },
];

export const DESIGN_STYLES = [
  { value: "premium-minimal", label: "프리미엄 미니멀" },
  { value: "warm-natural", label: "웜 내추럴" },
  { value: "bold-trendy", label: "볼드 트렌디" },
  { value: "clean-modern", label: "클린 모던" },
  { value: "luxury-dark", label: "럭셔리 다크" },
  { value: "cute-playful", label: "큐트 플레이풀" },
];

export const BACKGROUND_STYLES = [
  { value: "white", label: "화이트" },
  { value: "light-gray", label: "라이트 그레이" },
  { value: "cream", label: "크림" },
  { value: "black", label: "블랙" },
  { value: "gradient", label: "그라데이션" },
  { value: "texture", label: "텍스처" },
];

export const FONT_MOODS = [
  { value: "clean-gothic", label: "클린 고딕" },
  { value: "elegant-serif", label: "엘레강트 세리프" },
  { value: "bold-display", label: "볼드 디스플레이" },
  { value: "friendly-round", label: "친근한 라운드" },
];

export const TONES = [
  { value: "trust", label: "신뢰·전문성" },
  { value: "emotional", label: "감성·공감" },
  { value: "luxury", label: "고급·프리미엄" },
  { value: "fun", label: "유쾌·친근" },
  { value: "minimal", label: "심플·담백" },
  { value: "urgent", label: "긴박·한정" },
];

export const CATEGORIES = [
  "뷰티/스킨케어", "건강/이너뷰티", "패션/의류", "식품/음료",
  "생활/주방", "스포츠/아웃도어", "디지털/가전", "육아/교육", "반려동물", "기타",
];

export const TARGET_CUSTOMERS = [
  "20대 여성", "30대 여성", "40대 여성", "20대 남성",
  "30대 남성", "40대 남성", "10대", "중장년층", "부모/육아", "전체",
];

export const PLATFORMS = [
  { value: "smartstore", label: "스마트스토어" },
  { value: "coupang", label: "쿠팡" },
  { value: "own-mall", label: "자사몰" },
  { value: "instagram", label: "인스타그램" },
  { value: "general", label: "공통/범용" },
];
