import type { Project, Section } from "@/types";

const STYLE_MAP: Record<string, string> = {
  "premium-minimal": "ultra-premium minimalism: razor-thin layouts, maximum negative space, single dominant typographic statement, Swiss grid discipline, editorial magazine quality",
  "warm-natural": "organic warmth aesthetic: natural linen textures, terracotta/sage/cream palette, imperfect handcrafted details, slow-living photography, dried botanical accents",
  "bold-trendy": "2025 maximalist design: oversized typography bleeding off edges, neon-meets-muted color clashing, brutalist grid breaks, Y2K nostalgia mixed with clean tech",
  "clean-modern": "hyper-modern corporate: bento-box grid layouts, dark mode sophistication, sharp geometric cutouts, Scandinavian restraint with Korean precision",
  "luxury-dark": "dark luxury theater: deep obsidian backgrounds, molten gold light streaks, product levitation with dramatic rim lighting, ultra-glossy surface reflections",
  "cute-playful": "Gen Z playful: 3D blob shapes, pastel rainbow gradients, kawaii illustration, bold rounded sans-serif, sticker-collage chaos that feels intentional",
};

const PLATFORM_GUIDE: Record<string, string> = {
  smartstore: "Naver SmartStore: vertical scroll optimized, 860px width, mobile-first Korean shopping, high information density with visual hierarchy",
  coupang: "Coupang: conversion-first design, bold benefit callouts, trust badges prominent, price-anchoring visual zones",
  "own-mall": "brand DTC: full brand world-building, immersive storytelling, premium unboxing aesthetic, lifestyle aspirational",
  instagram: "Instagram Shopping: thumb-stopping at 3-second scroll, square-safe composition, viral-worthy single statement, story-first visual",
  general: "universal Korean e-commerce: adaptable grid, platform-agnostic excellence, broad appeal with premium feel",
};

const TREND_INJECTIONS = [
  "Use 2025 design trends: bento grid micro-layouts, floating UI elements, glassmorphism depth layers",
  "Apply contemporary Korean beauty-brand aesthetic: clinical precision meets emotional warmth",
  "Channel Musinsa/29CM editorial energy: bold typography + controlled chaos",
  "Reference global luxury DTC brands (Aesop, Byredo, Le Labo visual language) adapted for Korean market",
  "Use kinetic-feeling static design: diagonal crop lines, overlapping text layers, intentional asymmetry",
];

function master(project: Project) {
  const styleDesc = STYLE_MAP[project.masterStyle.designStyle] ?? project.masterStyle.designStyle;
  const platformDesc = PLATFORM_GUIDE[project.platform] ?? "Korean e-commerce";
  const trendNote = TREND_INJECTIONS[Math.floor(Math.random() * TREND_INJECTIONS.length)];

  return `
ROLE: You are a world-class creative director at a top Korean digital agency (think TBWA Korea, Cheil, or a cutting-edge DTC startup studio).
Your work appears in Behance's top 1%, wins Red Dot awards, and sets Korean e-commerce visual trends.

Create ONE 1024×1024px Korean product detail page section image. Make it look like it was designed by a human expert, not an AI.

━━ PRODUCT ━━
Name: "${project.productName}"
Brand: "${project.brandName}"
Category: ${project.category}
Target: ${project.targetCustomer}

━━ VISUAL IDENTITY ━━
Design system: ${styleDesc}
Primary color: ${project.masterStyle.mainColor}
Background: ${project.masterStyle.backgroundStyle}
Typography character: ${project.masterStyle.fontMood}
Brand voice: ${project.masterStyle.tone}
Platform context: ${platformDesc}

━━ TREND DIRECTION ━━
${trendNote}

━━ NON-NEGOTIABLE RULES ━━
• ALL text rendered in the image MUST be Korean (한국어) — pixel-sharp, never blurry
• Every Korean character must be fully formed, legible, accurate
• Typography hierarchy must be immediately obvious (3+ size levels)
• The image should look like a ₩200M brand campaign, not a template
• Avoid stock-photo clichés — compose with intention and creative vision
`.trim();
}

const SECTION_TEMPLATES: Record<string, (i: Record<string, string>, project: Project) => string> = {

  hero: (i, p) => `
━━ SECTION: HERO BANNER ━━

Korean text to render:
  [HERO HEADLINE — dominates the frame] "${i.headline || p.productName}"
  [SUPPORTING LINE] "${i.subheadline || ""}"
  [PRODUCT ESSENCE BADGE] "${i.productFeature || ""}"

CREATIVE DIRECTION:
Layout concept — Choose ONE of these contemporary approaches:
  A) TYPOGRAPHIC TAKEOVER: Headline fills 60% of the image. Product emerges from behind letterforms. Brutally confident.
  B) CINEMATIC SPLIT: Left third = deep color field with headline. Right two-thirds = hero product shot with dramatic lighting.
  C) FLOATING LAYERS: Multiple depth planes — background texture / midground product / foreground oversized type. Creates 3D illusion.

Visual execution:
- Product lighting: single-source dramatic (not flat studio)
- The headline Korean type should feel like a poster, not a banner
- Feature badge: geometric chip or stamp shape, not a boring rectangle
- Color: use ${p.masterStyle.mainColor} as the energy source — let it pulse through the composition
- Mood: confident, aspirational, scroll-stopping
`,

  problem: (i) => `
━━ SECTION: PROBLEM EMPATHY ━━

Korean pain point texts:
  [Pain 1] "${i.painPoint1 || ""}"
  [Pain 2] "${i.painPoint2 || ""}"
  [Pain 3] "${i.painPoint3 || ""}"

CREATIVE DIRECTION:
Avoid: generic stock-photo sad faces, boring bullet lists.

Instead — choose ONE contemporary approach:
  A) BENTO GRID PAIN MAP: Three asymmetric grid cells, each containing an abstract "pain" illustration + Korean text. Desaturated, slightly uncomfortable color palette (olive/clay/muted rose). Each cell feels like a different emotional state.
  B) TYPOGRAPHIC EMPATHY: The three pain points SET AS EDITORIAL TYPOGRAPHY — different sizes, slightly overlapping, as if spilling out. One phrase much larger than others. Evokes emotional overwhelm.
  C) BEFORE/AFTER HALVES: Left side = muted, desaturated, textured (the problem world). Each Korean pain phrase layered over. Right side barely hinted (teaser of solution ahead).

Emotional target: viewer sees their exact frustration reflected. Recognition, not pity.
`,

  benefits: (i) => `
━━ SECTION: CORE BENEFITS ━━

Korean benefit texts:
  [Benefit 1] "${i.benefit1 || ""}"
  [Benefit 2] "${i.benefit2 || ""}"
  [Benefit 3] "${i.benefit3 || ""}"
  [Benefit 4] "${i.benefit4 || ""}"

CREATIVE DIRECTION:
Avoid: standard 2×2 icon grid with boring list. That's 2015 design.

Instead — choose ONE fresh approach:
  A) BENTO DASHBOARD: Asymmetric bento boxes of different sizes. Largest cell = most impactful benefit. Each cell has unique background treatment (solid / gradient / texture / photo). Modern app-dashboard energy.
  B) MAGAZINE EDITORIAL GRID: Benefits laid out like a luxury magazine spread. Mix of large text, small caption, and abstract shape/icon. Swiss grid discipline.
  C) NUMBER STATEMENT LAYOUT: Each benefit anchored by a bold statistic or number (even illustrative). "72H" / "5X" / "0%" — massive numeral, Korean label beneath. Creates instant cognitive impact.

Every benefit cell must feel distinct yet harmonious. The layout itself should communicate "premium."
`,

  lifestyle: (i, p) => `
━━ SECTION: LIFESTYLE ━━

Korean overlay texts:
  [Contextual tag] "${i.scene || ""}"
  [Atmosphere descriptor] "${i.mood || ""}"
  [Emotional resonance — hero text] "${i.targetFeeling || ""}"

CREATIVE DIRECTION:
Target: ${p.targetCustomer} — design for their visual language, not generic lifestyle.

Avoid: generic stock-photo couple holding product, smiling at camera.

Instead — choose ONE elevated approach:
  A) MISE EN SCÈNE: A carefully art-directed scene (not a photo — a stage). Props chosen with intention. Product is the protagonist but not the subject. The Korean emotional message floats as if painted on air.
  B) TEXTURE STUDY: Close-focus on the environment/context (morning sunlight on linen sheets, condensation on glass, steam rising). Product partially visible. Deeply sensory. Korean mood text in fine typography.
  C) EDITORIAL PORTRAIT ENERGY: If person is shown, it's a fashion-editorial moment — candid expression, mid-motion, real. Never posed. Korean text as caption strip or side margin label.

The image should make the viewer feel something, not just see something.
`,

  detail: (i) => `
━━ SECTION: PRODUCT SPECIFICATIONS ━━

Korean spec texts:
  [Ingredients/Materials] "${i.material || ""}"
  [Size/Volume] "${i.spec || ""}"
  [Origin/Manufacturing] "${i.origin || ""}"

CREATIVE DIRECTION:
Avoid: boring data table that looks like a spreadsheet.

Instead — choose ONE approach that makes specs feel premium:
  A) LAB REPORT AESTHETIC: Scientific/clinical layout. Graph paper or measurement grid background. Korean spec data in monospace-style labels with callout lines to product macro photography. Feels like a pharmaceutical insert but beautiful.
  B) INGREDIENT HERO: One key ingredient or material becomes the visual star — macro photography of the raw material (botanical, mineral, fabric fiber). Korean specification text arranged as elegant captions around it.
  C) CROSS-SECTION INFOGRAPHIC: Artistic cutaway or exploded-view illustration of the product. Each component labeled in Korean. Engineering precision meets artistic craft.

Trust signal: the image should make the viewer feel the brand has nothing to hide.
`,

  comparison: (i) => `
━━ SECTION: COMPETITIVE COMPARISON ━━

Korean comparison texts:
  [Baseline] "${i.competitor || ""}"
  [Win 1] "${i.diff1 || ""}"
  [Win 2] "${i.diff2 || ""}"
  [Win 3] "${i.diff3 || ""}"

CREATIVE DIRECTION:
Avoid: basic two-column table with check/cross marks.

Instead — choose ONE approach that feels confident, not defensive:
  A) BOLD VERDICT LAYOUT: Our product takes 70% of the frame. The competitor gets a small, slightly gray corner. The Korean differentiator texts are bold statements, not table cells. Visual metaphor of dominance.
  B) SPECTRUM COMPARISON: Visual "dial" or "slider" metaphors. Each differentiator shown as a comparative bar or scale — ours at 100%, theirs at a lower mark. Korean labels on each. Data-visualization aesthetic.
  C) SIDE BY SIDE DRAMA: Split composition with clear visual weight difference. Our side: vibrant, in color, product glowing. Their side: muted, slightly blurred, smaller. Three Korean advantage pills floating on our side.

The message must be "obviously better" at a glance, not just in text.
`,

  trust: (i) => `
━━ SECTION: TRUST & CREDIBILITY ━━

Korean trust texts:
  [Certifications/Awards] "${i.cert || ""}"
  [Media/Press] "${i.press || ""}"
  [Social Proof Numbers] "${i.sales || ""}"

CREATIVE DIRECTION:
Avoid: badge clipart parade, generic star ratings.

Instead — choose ONE approach that radiates authority:
  A) NUMBERS AS HEROES: The sales/review metric becomes MASSIVE typography — fills the frame. "50만+" or "재구매율 78%" as an artistic statement. Supporting certification badges and Korean press mentions as smaller satellite elements.
  B) MUSEUM WALL LAYOUT: Arranged like awards displayed in a prestigious institution. Each certification/award in its own elegant frame. Korean media mentions as editorial quotes with attribution. Quiet confidence.
  C) SOCIAL PROOF MOSAIC: A grid of abstract review indicators (star patterns, percentage circles, achievement seals) with key Korean numbers and certifications. Organized chaos that overwhelms with evidence.

Emotional target: "This brand clearly knows what it's doing."
`,

  components: (i) => `
━━ SECTION: PACKAGE CONTENTS ━━

Korean item labels:
  [Item 1] "${i.item1 || ""}"
  [Item 2] "${i.item2 || ""}"
  [Item 3] "${i.item3 || ""}"
  [Package note] "${i.packageNote || ""}"

CREATIVE DIRECTION:
Avoid: items just dumped on white background.

Instead — choose ONE unboxing experience aesthetic:
  A) EDITORIAL FLAT LAY: Items arranged with obsessive intentionality — consistent angles, matching shadow direction, geometric spacing. White or textured background. Korean labels in fine type with thin callout lines. Looks like it belongs in a design magazine.
  B) SHADOW BOX PORTRAIT: Each item given its own "shadow box" frame within the composition. Museum object energy. Like each item is a valuable artifact. Korean labels as museum exhibit plaques.
  C) UNBOXING MOMENT: The packaging open, contents spilling out in a beautiful cascade. Each item caught mid-reveal. Korean item names as sticker-label overlays. Excitement and anticipation.

The viewer should feel the tactile pleasure of unboxing before buying.
`,

  howto: (i) => `
━━ SECTION: HOW TO USE ━━

Korean step instructions:
  [Step 1] "${i.step1 || ""}"
  [Step 2] "${i.step2 || ""}"
  [Step 3] "${i.step3 || ""}"
  [Pro Tip] "${i.tip || ""}"

CREATIVE DIRECTION:
Avoid: numbered list with boring circle icons.

Instead — choose ONE approach that makes steps feel effortless:
  A) MOTION STORYBOARD: Three panels like a film storyboard, each showing a sequential action. Cinematic aspect ratios within the square frame. Korean step text as film-slate caption. The sequence should feel like a 3-frame animation.
  B) TYPOGRAPHIC STEP JOURNEY: Large step numbers (01, 02, 03) as the visual backbone. Each number has a micro-illustration growing from it. Korean instructions in clean hierarchy beneath. Vertical journey downward.
  C) HAND/OBJECT CHOREOGRAPHY: Close-up of hands interacting with product at each stage. Intimate, tactile, instructional but beautiful. Korean text as floating annotation labels.

Pro Tip box: must feel like insider knowledge — special treatment (different color, unique shape, subtle pattern fill).
`,

  cta: (i) => `
━━ SECTION: CALL TO ACTION ━━

Korean CTA texts:
  [Urgency signal] "${i.urgency || ""}"
  [Offer hook] "${i.offer || ""}"
  [FINAL STATEMENT — most important] "${i.finalCopy || ""}"

CREATIVE DIRECTION:
This is the moment of conversion. Maximum energy, zero confusion.

Avoid: generic red banner with "지금 구매하기."

Instead — choose ONE high-impact approach:
  A) TYPOGRAPHIC CLIMAX: The final Korean copy occupies the entire frame in massive type. Urgency text as a diagonal slash ribbon across a corner. Offer in a high-contrast chip. Background: brand color gradient at full intensity. The image should feel like a shout.
  B) COUNTDOWN ENERGY: Visual countdown aesthetic — timer/clock iconography, limited-edition stamp overlays, Korean urgency text in stencil-cut style letters. The offer shown in a special "secret sale" envelope design. High adrenaline.
  C) REWARD REVEAL: Premium packaging reveal or gift-unwrapping visual, Korean offer text as the "gift tag." Final copy in elegant but urgent typography. The image promises something special is waiting.

The viewer must feel: "If I don't act now, I'll regret it."
`,
};

export function generatePrompt(project: Project, section: Section): string {
  const hasReferenceImages = section.uploadedImages.length > 0;
  const sectionTemplate = SECTION_TEMPLATES[section.type];
  const sectionPrompt = sectionTemplate ? sectionTemplate(section.userInputs, project) : "";

  const referenceNote = hasReferenceImages
    ? `\n━━ REFERENCE IMAGES PROVIDED ━━\nThe user has uploaded ${section.uploadedImages.length} reference image(s). The GPT-4o analysis will be appended below. Use it to accurately represent the product in this section.\n`
    : "";

  return `${master(project)}\n${referenceNote}\n${sectionPrompt.trim()}`;
}
