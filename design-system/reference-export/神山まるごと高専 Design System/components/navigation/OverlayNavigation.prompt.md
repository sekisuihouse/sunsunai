Full-screen overlay menu (`#sp_nav`): closed state is opacity 0 / pointer-events none; opening scales a giant black circle (999rem) behind white bold nav links — the brand's signature circular motion.

```jsx
const [open, setOpen] = useState(false);
<OverlayNavigation open={open} onClose={() => setOpen(false)} />
```

Pair with `MenuButton` in `HeaderNavigation`. Focus trap / Escape close were NOT observable in the source — add them in production.
