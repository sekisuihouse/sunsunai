---
name: kamiyama-marugoto-kosen-design
description: Use this skill to generate well-branded interfaces and assets for 神山まるごと高専 (Kamiyama Marugoto College), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Key rules for this brand:
- Core site is monochrome: white canvas, black text, thick 4px black borders, pill buttons, giant circles/arcs, vertical headings, 20px/line-height-2 bold-leaning Japanese body text. Identity comes from black line-work and whitespace, never from color.
- Campaign LPs are a separate theme (`data-km-scope="campaign-tour"` 水色/黄緑, `"campaign-event"` 青/シアン/ピンク/黄) — never leak campaign colors into core work.
- Tokens are `--km-*` custom properties in `tokens/` (entry: `styles.css`). Components live in `components/` with `.prompt.md` usage notes. Full screens in `ui_kits/`.
- No emoji, no icon fonts; use the hand-drawn illustrations in `assets/illustrations/` and primitives-drawn glyphs.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
