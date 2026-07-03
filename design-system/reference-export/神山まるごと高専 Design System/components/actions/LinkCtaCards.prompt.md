Big navigational CTA cards (学校案内へ / 入試情報へ …): 4px black border, black title bar, description text, underlined link. 2 columns on desktop, 1 on mobile.

```jsx
<LinkCtaCards items={[
  { title: '学校案内', description: '神山まるごと高専の教育理念とカリキュラム。', href: '/guidance/', image: 'assets/img/about.jpg' },
  { title: '入試情報', description: '2027年度の入試情報はこちらから。', href: '/admission/' },
]} />
```
