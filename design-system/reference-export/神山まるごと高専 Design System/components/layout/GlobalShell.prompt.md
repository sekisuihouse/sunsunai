The common page frame. Wraps page content in the responsive shell: ≥1204px a 180px sticky left rail (logo, nav, black CTA block); below that a fixed top bar with hamburger + full-screen overlay menu. Includes Footer.

```jsx
<GlobalShell logoSrc="assets/logos/logo.svg" activeIndex={0}>
  <YourPageContent />
</GlobalShell>
```

Use `forceVariant="desktop-left-rail"` in fixed-width mock frames where matchMedia would mislead.
