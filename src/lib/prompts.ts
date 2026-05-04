import type { Project, Section } from "@/types";

function master(project: Project) {
  return `
You are a professional Korean e-commerce product detail page designer.
Create a high-quality Korean product detail page image section.

Product: "${project.productName}"
Brand: "${project.brandName}"
Category: ${project.category}
Target customer: ${project.targetCustomer}
Design style: ${project.masterStyle.designStyle}
Main color: ${project.masterStyle.mainColor}
Background: ${project.masterStyle.backgroundStyle}
Font mood: ${project.masterStyle.fontMood}
Tone: ${project.masterStyle.tone}
Image size: 1024×1024px (square)
Language: All text in the image must be in Korean (한국어). Render Korean characters accurately and legibly.
`.trim();
}

const SECTION_TEMPLATES: Record<string, (i: Record<string, string>, project: Project) => string> = {
  hero: (i, p) => `
Section type: HERO – Main visual banner

Render this EXACT Korean text in the image:
- Headline (large, bold): "${i.headline || p.productName}"
- Subheadline (medium): "${i.subheadline || ""}"
- Key feature (small): "${i.productFeature || ""}"

Design: Strong, eye-catching hero banner. Product name and headline must be clearly readable in Korean. Place product imagery prominently. The Korean text must be sharp, not blurry or broken.
`,

  problem: (i) => `
Section type: PROBLEM – Customer pain point empathy

Render these EXACT Korean text phrases in the image:
- Pain point 1: "${i.painPoint1 || ""}"
- Pain point 2: "${i.painPoint2 || ""}"
- Pain point 3: "${i.painPoint3 || ""}"

Design: Empathetic, relatable visual showing customer frustration. Use speech bubbles, thought clouds, or expressive imagery. Korean text must be legible and emotionally resonant.
`,

  benefits: (i) => `
Section type: BENEFITS – Core product advantages

Render these EXACT Korean benefit texts in the image:
- Benefit 1: "${i.benefit1 || ""}"
- Benefit 2: "${i.benefit2 || ""}"
- Benefit 3: "${i.benefit3 || ""}"
- Benefit 4: "${i.benefit4 || ""}"

Design: Clean icon + Korean text layout. Each benefit clearly separated. Modern infographic style. Korean labels must be accurate and sharp.
`,

  lifestyle: (i) => `
Section type: LIFESTYLE – Aspirational usage scene

Render these EXACT Korean text elements:
- Scene description: "${i.scene || ""}"
- Mood: "${i.mood || ""}"
- Emotional message: "${i.targetFeeling || ""}"

Design: Warm, lifestyle photography style. Show product in use. Korean text overlaid elegantly. Text must be crisp and readable.
`,

  detail: (i) => `
Section type: DETAIL – Product specifications

Render these EXACT Korean specification texts:
- Materials/Ingredients: "${i.material || ""}"
- Size/Volume: "${i.spec || ""}"
- Origin/Manufacturing: "${i.origin || ""}"

Design: Clean, trustworthy layout with close-up product shots and infographic-style Korean text labels. All Korean characters must be perfectly legible.
`,

  comparison: (i) => `
Section type: COMPARISON – Competitive advantage

Render these EXACT Korean comparison texts:
- Compared to: "${i.competitor || ""}"
- Advantage 1: "${i.diff1 || ""}"
- Advantage 2: "${i.diff2 || ""}"
- Advantage 3: "${i.diff3 || ""}"

Design: Clear comparison table or split visual. Korean text in table cells must be sharp and accurately rendered.
`,

  trust: (i) => `
Section type: TRUST – Credibility indicators

Render these EXACT Korean trust elements:
- Certifications/Awards: "${i.cert || ""}"
- Media coverage: "${i.press || ""}"
- Sales/Reviews: "${i.sales || ""}"

Design: Professional, authoritative layout with badges, logos, and numbers. Korean text must be clear and confidence-inspiring.
`,

  components: (i) => `
Section type: COMPONENTS – Package contents

Render these EXACT Korean item labels:
- Item 1: "${i.item1 || ""}"
- Item 2: "${i.item2 || ""}"
- Item 3: "${i.item3 || ""}"
- Package note: "${i.packageNote || ""}"

Design: Clean flat-lay style showing all items spread out. Each item labeled in Korean with clear typography.
`,

  howto: (i) => `
Section type: HOW TO USE – Step-by-step guide

Render these EXACT Korean step instructions:
- Step 1: "${i.step1 || ""}"
- Step 2: "${i.step2 || ""}"
- Step 3: "${i.step3 || ""}"
- Tip: "${i.tip || ""}"

Design: Numbered step guide with icons. Korean step text must be legible next to each numbered icon. Clear sequential flow.
`,

  cta: (i) => `
Section type: CTA – Call to action

Render these EXACT Korean CTA texts:
- Urgency/Scarcity: "${i.urgency || ""}"
- Special offer: "${i.offer || ""}"
- Final copy (large, bold): "${i.finalCopy || ""}"

Design: High-impact, urgent visual. Final Korean copy must be the most prominent text element, large and bold. Create a sense of urgency.
`,
};

export function generatePrompt(project: Project, section: Section): string {
  const sectionTemplate = SECTION_TEMPLATES[section.type];
  const sectionPrompt = sectionTemplate ? sectionTemplate(section.userInputs, project) : "";
  return `${master(project)}\n\n${sectionPrompt.trim()}`;
}
