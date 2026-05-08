import type { Project, Section } from "@/types";

const STYLE_MAP: Record<string, string> = {
  "premium-minimal": "ultra-clean premium minimal aesthetic, generous white space, refined typography, editorial-grade layout",
  "warm-natural": "warm earthy tones, organic textures, soft natural lighting, cozy lifestyle feel",
  "bold-trendy": "bold graphic design, high contrast, strong typography, contemporary trendy layout",
  "clean-modern": "modern clean design, geometric precision, crisp lines, professional corporate feel",
  "luxury-dark": "dark luxury aesthetic, gold accents, dramatic lighting, high-end premium atmosphere",
  "cute-playful": "cute playful illustration style, soft pastel palette, friendly rounded shapes, cheerful energy",
};

const PLATFORM_GUIDE: Record<string, string> = {
  smartstore: "Naver SmartStore format: vertical scroll layout, 860px effective width, mobile-first Korean shopping",
  coupang: "Coupang product page: impactful visuals, clear pricing zone, conversion-optimized Korean retail",
  "own-mall": "brand-owned mall: premium brand storytelling, consistent identity, aspirational lifestyle",
  instagram: "Instagram shopping: square crop-friendly, visually striking at small sizes, social-media optimized",
  general: "universal Korean e-commerce: balanced composition, broad appeal, platform-agnostic",
};

function master(project: Project) {
  const styleDesc = STYLE_MAP[project.masterStyle.designStyle] ?? project.masterStyle.designStyle;
  const platformDesc = PLATFORM_GUIDE[project.platform] ?? "Korean e-commerce";

  return `
ROLE: You are a world-class Korean e-commerce detail page visual designer.
Create a single 1024×1024px product detail page section image for a Korean shopping platform.

━━ PRODUCT INFO ━━
Product: "${project.productName}"
Brand: "${project.brandName}"
Category: ${project.category}
Target customer: ${project.targetCustomer}

━━ VISUAL IDENTITY ━━
Design style: ${styleDesc}
Primary color: ${project.masterStyle.mainColor}
Background: ${project.masterStyle.backgroundStyle}
Typography mood: ${project.masterStyle.fontMood}
Brand tone: ${project.masterStyle.tone}
Platform: ${platformDesc}

━━ CRITICAL TEXT RULES ━━
- ALL text in the image MUST be in Korean (한국어)
- Korean characters must be rendered pixel-perfect, sharp, and fully legible
- No blurry, broken, or garbled Korean text — every character counts
- Font weight and size hierarchy must clearly distinguish headline vs body
`.trim();
}

const SECTION_TEMPLATES: Record<string, (i: Record<string, string>, project: Project) => string> = {
  hero: (i, p) => `
━━ SECTION: HERO BANNER (메인 히어로) ━━
Purpose: First impression — instantly communicate brand premium and product essence.

EXACT Korean text to render:
  [HEADLINE — largest, boldest] "${i.headline || p.productName}"
  [SUBHEADLINE — medium weight] "${i.subheadline || ""}"
  [FEATURE BADGE] "${i.productFeature || ""}"

VISUAL DIRECTION:
- Full-bleed hero composition with dramatic product focus
- Product placed as the visual anchor (center or off-center rule-of-thirds)
- Headline typography fills upper third or overlays product with strong contrast
- If reference image provided: faithfully incorporate that product/scene as the visual centerpiece
- Cinematic lighting that elevates the product to hero status
- Brand color used in gradient overlay or typographic accent
- Bottom zone: subtle feature badge or stamp element

QUALITY BAR: This must look like a ₩100M product campaign launch image.
`,

  problem: (i) => `
━━ SECTION: PROBLEM EMPATHY (문제 공감) ━━
Purpose: Mirror the customer's pain — make them feel "this is exactly my problem."

EXACT Korean pain point texts:
  [Pain 1] "${i.painPoint1 || ""}"
  [Pain 2] "${i.painPoint2 || ""}"
  [Pain 3] "${i.painPoint3 || ""}"

VISUAL DIRECTION:
- Split or segmented layout: 3 pain points each in their own visual zone
- Use expressive iconography: speech bubbles, thought clouds, "before" scenario imagery
- Muted, slightly desaturated color palette to convey the problem mood
- Each Korean pain point text in a speech bubble or highlighted box
- A frustrated or "before" human silhouette or abstract representation
- Subtle visual tension — the image should make viewers nod in recognition
- Transition cue at bottom hinting at the solution to come
`,

  benefits: (i) => `
━━ SECTION: CORE BENEFITS (핵심 혜택) ━━
Purpose: Deliver 3–4 product superpowers in a scannable, convincing layout.

EXACT Korean benefit texts:
  [Benefit 1] "${i.benefit1 || ""}"
  [Benefit 2] "${i.benefit2 || ""}"
  [Benefit 3] "${i.benefit3 || ""}"
  [Benefit 4] "${i.benefit4 || ""}"

VISUAL DIRECTION:
- 2×2 grid or horizontal 4-column icon+text infographic
- Each benefit: unique icon (line art or filled) + Korean label + short stat or descriptor
- Brand primary color used for icon fills or background chips
- Clean, airy layout with consistent spacing rhythm
- Optional: animated-style numbered circles (01, 02, 03, 04) as section markers
- Product silhouette or ingredient visual in background (very subtle, 10% opacity)
- Professional infographic quality — could appear in a presentation deck
`,

  lifestyle: (i, p) => `
━━ SECTION: LIFESTYLE SCENE (라이프스타일) ━━
Purpose: Sell the aspiration — show the customer's ideal self using this product.

EXACT Korean overlay texts:
  [Scene context] "${i.scene || ""}"
  [Mood descriptor] "${i.mood || ""}"
  [Emotional message — hero text] "${i.targetFeeling || ""}"

VISUAL DIRECTION:
- Cinematic lifestyle photography aesthetic (even if illustrated)
- Target customer: ${p.targetCustomer} in their ideal environment
- Natural, candid-feeling composition — not staged
- Product appears naturally in scene (in hand, on surface, in use)
- If reference image provided: use it as the scene/mood reference and composite product into it
- Text overlaid using elegant Korean typography with subtle drop shadow or background blur
- Golden hour or soft studio lighting for warmth and aspiration
- The emotional message text should be the largest Korean text in the scene
`,

  detail: (i) => `
━━ SECTION: PRODUCT SPECIFICATIONS (상품 상세) ━━
Purpose: Build trust through transparent, precise product information.

EXACT Korean specification texts:
  [Materials/Ingredients — key facts] "${i.material || ""}"
  [Size/Volume] "${i.spec || ""}"
  [Origin/Manufacturing] "${i.origin || ""}"

VISUAL DIRECTION:
- Clean technical infographic layout — scientific credibility aesthetic
- Macro product close-up photography as hero visual (textures, surfaces, ingredients)
- Ingredient or material callout lines pointing to product zones
- Korean spec text in clean table rows or labeled info-card chips
- If reference image provided: use product photo as the macro close-up base
- Color: predominantly white/light-gray with brand color accents for labels
- Microscope/lab aesthetic for ingredient sections; engineering precision for hardware
- Trust signals: origin flag icon, manufacturing badge if applicable
`,

  comparison: (i) => `
━━ SECTION: COMPETITIVE COMPARISON (비교 우위) ━━
Purpose: Make winning look obvious — visual proof of superiority.

EXACT Korean comparison texts:
  [Comparison baseline] "${i.competitor || ""}"
  [Differentiator 1 — OUR WIN] "${i.diff1 || ""}"
  [Differentiator 2] "${i.diff2 || ""}"
  [Differentiator 3] "${i.diff3 || ""}"

VISUAL DIRECTION:
- Classic comparison table: 2 columns (경쟁사 vs 우리제품)
- "경쟁사" column: muted gray, ✗ marks, desaturated
- "우리제품" column: brand color highlight, ✓ checkmarks, vibrant
- Each row: Korean differentiator text clearly legible in table cells
- Product badge or medal graphic in the winning column header
- Bold "우리제품" branding at top with product name
- The visual contrast must make the winner immediately obvious at a glance
`,

  trust: (i) => `
━━ SECTION: TRUST & CREDIBILITY (신뢰 요소) ━━
Purpose: Eliminate purchase hesitation with social proof and authority signals.

EXACT Korean trust texts:
  [Certifications/Awards] "${i.cert || ""}"
  [Media coverage] "${i.press || ""}"
  [Sales/Review metrics] "${i.sales || ""}"

VISUAL DIRECTION:
- Authority-forward layout: badge wall + media logos + number showcase
- Top zone: certification and award badges (shield icons, star badges)
- Middle zone: Korean media/press mention text in quote-style frames
- Bottom zone: large bold numbers (판매량, 재구매율) with Korean labels
- If reference image provided: incorporate actual certification imagery
- Color: trustworthy navy/dark tones OR clean white with gold accents
- Subtle background texture (linen, paper) for premium feel
- This should feel like a government-grade trust document, but beautiful
`,

  components: (i) => `
━━ SECTION: PACKAGE CONTENTS (구성품) ━━
Purpose: Eliminate unboxing anxiety — show exactly what customers receive.

EXACT Korean item labels:
  [Item 1] "${i.item1 || ""}"
  [Item 2] "${i.item2 || ""}"
  [Item 3] "${i.item3 || ""}"
  [Package note] "${i.packageNote || ""}"

VISUAL DIRECTION:
- Top-down flat-lay composition on clean background
- Each item spread out with breathing room, connected to Korean label by dotted callout lines
- Items arranged in a visually balanced, deliberate pattern (not random)
- If reference image provided: use actual product photo as flat-lay base
- Korean labels: clean, precise typography in small caption chips
- Subtle shadow under each item for depth
- Brand color background strip or corner ribbon
- The package note in a special callout box (e.g., eco badge for sustainable packaging)
`,

  howto: (i) => `
━━ SECTION: HOW TO USE (사용법) ━━
Purpose: Remove usage friction — make the product feel effortless and intuitive.

EXACT Korean step instructions:
  [Step 1] "${i.step1 || ""}"
  [Step 2] "${i.step2 || ""}"
  [Step 3] "${i.step3 || ""}"
  [Pro Tip] "${i.tip || ""}"

VISUAL DIRECTION:
- Vertical step-by-step flow with large numbered circles (01, 02, 03)
- Each step: number circle + illustrative icon/mini-scene + Korean instruction text
- Connecting arrow or dotted line between steps showing progression
- Step illustrations: simple, clear line-art icons or mini product-in-use thumbnails
- Pro Tip zone at bottom: contrasting color pill/chip with tip icon (💡 style)
- Korean step text must be the most readable element — minimum perceived size 14pt
- Clean white background with brand color step numbers
`,

  cta: (i) => `
━━ SECTION: CALL TO ACTION (구매 유도) ━━
Purpose: The final push — create urgency, desire, and a clear reason to buy NOW.

EXACT Korean CTA texts:
  [Urgency/Scarcity — top alert] "${i.urgency || ""}"
  [Special offer — mid badge] "${i.offer || ""}"
  [FINAL COPY — largest, boldest] "${i.finalCopy || ""}"

VISUAL DIRECTION:
- High-energy, conversion-optimized visual — this is the BUY button equivalent
- Top: red/orange urgency banner with Korean scarcity text (한정, 마감 등)
- Middle: offer badge with price or gift icon + Korean offer text
- Center: final copy in the LARGEST, BOLDEST Korean typography in the entire design
- Background: gradient from brand color to deeper shade, creating energy
- Product silhouette or glow effect as background element
- Purchase button mockup or arrow pointing down (simulating "add to cart")
- The final Korean copy must feel like it's shouting from the image
`,
};

export function generatePrompt(project: Project, section: Section): string {
  const hasReferenceImages = section.uploadedImages.length > 0;
  const sectionTemplate = SECTION_TEMPLATES[section.type];
  const sectionPrompt = sectionTemplate ? sectionTemplate(section.userInputs, project) : "";

  const referenceNote = hasReferenceImages
    ? `\n━━ REFERENCE IMAGES ━━\nReference images have been provided. Study them carefully:\n- Extract the product's exact shape, color, texture, and packaging\n- Maintain brand visual consistency from the reference\n- Composite the reference product/scene into the section design naturally\n`
    : "";

  return `${master(project)}\n\n${referenceNote}${sectionPrompt.trim()}`;
}
