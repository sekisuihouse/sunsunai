# Project Instructions

## Design system

This project must follow the design system stored in `/design-system`.

Before creating, modifying, or reviewing any user interface, read:

1. `/design-system/DESIGN_SYSTEM.md`
2. `/design-system/tokens.json`
3. `/design-system/components.json`
4. `/design-system/QUALITY_REPORT.md`
5. `/design-system/evidence.json`

Treat these files as the source of truth for all visual and interaction decisions.

## Mandatory UI rules

- Reuse the defined colors, typography, spacing, borders, radii, layout rules, motion, and components.
- Do not introduce arbitrary colors, font sizes, spacing values, shadows, border radii, or animation timings.
- Prefer design tokens or CSS variables over hard-coded values.
- Reuse existing components before creating new components.
- Preserve the distinction between:
  - the monochrome core website
  - campaign-specific landing-page themes
- Never mix campaign colors into the core website unless explicitly requested.
- Use the reference images and screenshots in `/design-system` to verify visual intent.
- Do not infer missing brand rules without recording the assumption.
- If a required style or component is missing, extend the design system first and document the addition.
- Do not silently replace the design system with a generic UI library style.

## Implementation requirements

- Create a central token layer for the application.
- Map values from `/design-system/tokens.json` into the framework's theme, CSS variables, or equivalent system.
- Build reusable components based on `/design-system/components.json`.
- Keep page-specific styling separate from reusable design-system primitives.
- Maintain responsive behavior according to the documented breakpoints and containers.
- Preserve accessibility, semantic HTML, keyboard operation, and visible focus states.

## Verification

After implementing UI changes:

1. Run the project's lint, type-check, test, and build commands.
2. Compare the result against the design-system references.
3. Report:
   - which design-system tokens were used
   - which components were reused or added
   - any deviations from the specification
   - any assumptions caused by missing information

A UI task is not complete if it merely resembles the reference. It must use the documented design-system rules structurally.
