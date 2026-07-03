Primary CTA button: pill shape with a thick black border; hover inverts white↔black with an expanding-circle animation (brand motif).

```jsx
<Button href="/contact/">お問い合わせ</Button>
<Button variant="black">資料ダウンロード</Button>
<Button size="mobile">一覧を見る</Button>
```

Variants: `variant="white"` (default) starts white with black text; `variant="black"` starts inverted. `size="mobile"` gives the 184px / 2px-border SP spec. Width is fixed (312px / 184px) per the original site — don't stretch it.
