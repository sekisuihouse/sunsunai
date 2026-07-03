Image link with the site's `hover_mask` behavior: a circular mask sweep + slight zoom on hover. Use for photographic navigation (guidance sections, gallery entries).

```jsx
<HoverMaskLink src="assets/img/about.jpg" alt="学校案内" label="学校案内" href="/guidance/about/" />
```

Desktop-only effect on the original site (≥768px); on touch it just acts as a link. `aspectRatio` controls the crop box.
