/* @ds-bundle: {"format":3,"namespace":"DesignSystem_8a2dbb","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"HoverMaskLink","sourcePath":"components/actions/HoverMaskLink.jsx"},{"name":"LinkCtaCards","sourcePath":"components/actions/LinkCtaCards.jsx"},{"name":"CampaignLandingPage","sourcePath":"components/campaign/CampaignLandingPage.jsx"},{"name":"NewsList","sourcePath":"components/content/NewsList.jsx"},{"name":"HubSpotFormEmbed","sourcePath":"components/form/HubSpotFormEmbed.jsx"},{"name":"ArcPageHeading","sourcePath":"components/layout/ArcPageHeading.jsx"},{"name":"Footer","sourcePath":"components/layout/Footer.jsx"},{"name":"GlobalShell","sourcePath":"components/layout/GlobalShell.jsx"},{"name":"RevealMotion","sourcePath":"components/motion/RevealMotion.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"MenuButton","sourcePath":"components/navigation/HeaderNavigation.jsx"},{"name":"HeaderNavigation","sourcePath":"components/navigation/HeaderNavigation.jsx"},{"name":"OverlayNavigation","sourcePath":"components/navigation/OverlayNavigation.jsx"},{"name":"AdmissionScreen","sourcePath":"ui_kits/website/AdmissionScreen.jsx"},{"name":"HomeScreen","sourcePath":"ui_kits/website/HomeScreen.jsx"},{"name":"InquiryScreen","sourcePath":"ui_kits/website/InquiryScreen.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"f216626fc965","components/actions/HoverMaskLink.jsx":"34bce42f737a","components/actions/LinkCtaCards.jsx":"e4dd75201a84","components/campaign/CampaignLandingPage.jsx":"3277f79a7204","components/content/NewsList.jsx":"9cf71deeb1e4","components/form/HubSpotFormEmbed.jsx":"78a1194fc25c","components/layout/ArcPageHeading.jsx":"0393ed993252","components/layout/Footer.jsx":"c602f100bf34","components/layout/GlobalShell.jsx":"1e0471415046","components/motion/RevealMotion.jsx":"79d03395dd16","components/navigation/Breadcrumb.jsx":"0a1aded87324","components/navigation/HeaderNavigation.jsx":"c78d8542a0d6","components/navigation/OverlayNavigation.jsx":"35e5af470f1e","ui_kits/website/AdmissionScreen.jsx":"d91441f3c896","ui_kits/website/HomeScreen.jsx":"48969e59d33f","ui_kits/website/InquiryScreen.jsx":"0f13ebed3c94"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_8a2dbb = window.DesignSystem_8a2dbb || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Primary CTA button (btn-6 / btn_white / btn_black).
 * Pill shape, thick black border, bold 20px label.
 * Hover/active inverts colors with an expanding circle (simplified to a scaling pseudo-layer).
 * Desktop: 312px wide, 20px padding, 4px border. Mobile size: 184px, 12px padding, 2px border.
 */
function Button({
  variant = 'white',
  size = 'default',
  href,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = useState(false);
  const mobile = size === 'mobile';
  const black = variant === 'black';
  const inverted = black ? !hover : hover;
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      width: mobile ? 'var(--km-size-button-mobile)' : 'var(--km-size-button)',
      maxWidth: '100%',
      padding: mobile ? 'var(--km-space-3)' : 'var(--km-space-5)',
      border: `${mobile ? 'var(--km-border-width-button-mobile)' : 'var(--km-border-width-button)'} solid var(--km-color-border-strong)`,
      borderRadius: 'var(--km-radius-pill)',
      background: inverted ? 'var(--km-color-black)' : 'var(--km-color-white)',
      color: inverted ? 'var(--km-color-white)' : 'var(--km-color-black)',
      font: 'inherit',
      fontFamily: 'var(--km-font-sans-ja)',
      fontSize: mobile ? 'var(--km-font-size-button-mobile)' : 'var(--km-font-size-body-large)',
      fontWeight: 'var(--km-font-weight-bold)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      lineHeight: 'var(--km-line-height-normal)',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'var(--km-motion-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '130%',
      aspectRatio: '1',
      borderRadius: 'var(--km-radius-circle)',
      background: black ? 'var(--km-color-white)' : 'var(--km-color-black)',
      transform: `translate(-50%,-50%) scale(${hover ? 1.05 : 0})`,
      transition: 'var(--km-motion-base)',
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, children));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/HoverMaskLink.jsx
try { (() => {
const {
  useState
} = React;
/**
 * HoverMaskLink — image link whose picture is revealed/zoomed through a circular mask
 * on hover (desktop-only effect on the original site, min-width 768px).
 */
function HoverMaskLink({
  src,
  alt = '',
  href = '#',
  width = '100%',
  aspectRatio = '3 / 2',
  label,
  onClick
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      width,
      textDecoration: 'none',
      color: 'var(--km-color-text)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      position: 'relative',
      width: '100%',
      aspectRatio,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.05)' : 'scale(1)',
      transition: 'var(--km-motion-base)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '20%',
      aspectRatio: '1',
      borderRadius: 'var(--km-radius-circle)',
      background: 'rgba(255,255,255,.35)',
      transform: `translate(-50%,-50%) scale(${hover ? 16 : 0})`,
      opacity: hover ? 0 : 1,
      transition: 'transform .6s ease-in-out, opacity .6s ease-in-out',
      pointerEvents: 'none'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 'var(--km-space-3)',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-base)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, label));
}
Object.assign(__ds_scope, { HoverMaskLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/HoverMaskLink.jsx", error: String((e && e.message) || e) }); }

// components/actions/LinkCtaCards.jsx
try { (() => {
const {
  useState
} = React;
/**
 * LinkCtaCards — 2-column link cards with 4px black border, black title bar,
 * description and arrow link text. Collapses to 1 column ≤767px (handled by grid autofit).
 */
function Card({
  item
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    onClick: item.onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      color: 'var(--km-color-text)',
      border: 'var(--km-border-width-button) solid var(--km-color-border-strong)',
      background: 'var(--km-color-white)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      background: 'var(--km-color-black)',
      color: 'var(--km-color-white)',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-title-card)',
      lineHeight: 'var(--km-line-height-normal)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      textAlign: 'center',
      padding: 'var(--km-space-4) var(--km-space-5)'
    }
  }, item.title), item.image && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      aspectRatio: '2 / 1',
      objectFit: 'cover',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'var(--km-motion-base)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      padding: 'var(--km-space-5)',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-medium)',
      fontSize: 'var(--km-font-size-base)',
      lineHeight: 'var(--km-line-height-relaxed)',
      letterSpacing: 'var(--km-letter-spacing-body)'
    }
  }, item.description), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      padding: '0 var(--km-space-5) var(--km-space-5)',
      marginTop: 'auto',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-base)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, item.linkText || '詳しく見る'));
}
function LinkCtaCards({
  items = [],
  columns = 2
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(min(320px, 100%), 1fr))`,
      gap: 'var(--km-space-8)',
      maxWidth: columns === 2 ? 'var(--km-size-container)' : 'none'
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    item: item
  })));
}
Object.assign(__ds_scope, { LinkCtaCards });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/LinkCtaCards.jsx", error: String((e && e.message) || e) }); }

// components/campaign/CampaignLandingPage.jsx
try { (() => {
const {
  useState
} = React;
/**
 * CampaignLandingPage — themed LP scaffold. NOT part of the core mono theme:
 * wrap in data-km-scope="campaign-tour" (水色/黄緑) or "campaign-event" (青/シアン/ピンク/黄).
 * Renders hero + rounded content sections + campaign CTA using the scope's palette.
 */
function CampaignButton({
  children,
  href
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href || '#',
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-block',
      padding: '18px 64px',
      background: hover ? 'var(--km-color-black)' : 'var(--km-color-campaign-accent, var(--km-color-campaign-secondary))',
      color: 'var(--km-color-white)',
      textDecoration: 'none',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-body-large)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      borderRadius: 'var(--km-radius-pill)',
      transition: 'var(--km-motion-base)',
      boxShadow: 'var(--km-shadow-soft)'
    }
  }, children);
}
function CampaignLandingPage({
  scope = 'campaign-tour',
  title,
  subtitle,
  heroImage,
  whiteLogoSrc,
  ctaLabel = '申し込む',
  sections = [],
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-km-scope": scope,
    style: {
      background: 'var(--km-color-campaign-primary)',
      fontFamily: 'var(--km-font-sans-ja)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      color: scope === 'campaign-event' ? 'var(--km-color-white)' : 'var(--km-color-black)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--km-space-8)',
      padding: 'var(--km-space-15) var(--km-space-5)',
      textAlign: 'center'
    }
  }, whiteLogoSrc && /*#__PURE__*/React.createElement("img", {
    src: whiteLogoSrc,
    alt: "\u795E\u5C71\u307E\u308B\u3054\u3068\u9AD8\u5C02",
    style: {
      width: '180px',
      height: 'auto'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: '44px',
      fontWeight: 'var(--km-font-weight-bold)',
      lineHeight: 'var(--km-line-height-normal)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--km-font-size-body-large)',
      fontWeight: 'var(--km-font-weight-bold)'
    }
  }, subtitle), heroImage && /*#__PURE__*/React.createElement("img", {
    src: heroImage,
    alt: "",
    style: {
      width: 'min(720px, 100%)',
      display: 'block',
      borderRadius: scope === 'campaign-event' ? 'var(--km-radius-event-asymmetric)' : 'var(--km-radius-campaign-large)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--km-space-10)',
      alignItems: 'center',
      padding: '0 var(--km-space-5) var(--km-space-15)'
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("section", {
    key: i,
    style: {
      width: 'min(720px, 100%)',
      boxSizing: 'border-box',
      background: 'var(--km-color-white)',
      color: 'var(--km-color-black)',
      borderRadius: scope === 'campaign-event' ? 'var(--km-radius-event-asymmetric)' : 'var(--km-radius-campaign-large)',
      padding: 'var(--km-space-10)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--km-space-4)',
      fontSize: 'var(--km-font-size-title-card)',
      color: scope === 'campaign-event' ? 'var(--km-color-campaign-primary)' : 'var(--km-color-black)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '14px',
      height: '14px',
      borderRadius: '50%',
      background: 'var(--km-color-campaign-secondary)',
      marginRight: '12px'
    }
  }), s.heading), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--km-font-size-base)',
      lineHeight: 'var(--km-line-height-body)'
    }
  }, s.body))), children, /*#__PURE__*/React.createElement(CampaignButton, null, ctaLabel)));
}
Object.assign(__ds_scope, { CampaignLandingPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/campaign/CampaignLandingPage.jsx", error: String((e && e.message) || e) }); }

// components/content/NewsList.jsx
try { (() => {
const {
  useState
} = React;
function NewsItem({
  item
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 110px 1fr',
      gap: 'var(--km-space-5)',
      alignItems: 'baseline',
      padding: 'var(--km-space-5) 0',
      borderBottom: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
      textDecoration: 'none',
      color: 'var(--km-color-text)',
      fontFamily: 'var(--km-font-sans-ja)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, /*#__PURE__*/React.createElement("time", {
    style: {
      fontFamily: 'var(--km-font-display-futura)',
      fontWeight: 600,
      fontSize: 'var(--km-font-size-base)'
    }
  }, item.date), /*#__PURE__*/React.createElement("span", {
    style: {
      justifySelf: 'start',
      fontSize: 'var(--km-font-size-sm)',
      fontWeight: 'var(--km-font-weight-bold)',
      border: '1px solid var(--km-color-black)',
      padding: '2px 12px'
    }
  }, item.category), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--km-font-size-base)',
      fontWeight: 'var(--km-font-weight-bold)',
      lineHeight: 'var(--km-line-height-relaxed)'
    }
  }, item.title));
}

/**
 * NewsList — dated news rows (date / category chip / bold title link).
 * Detailed markup was minified in the mirror; structure is a faithful simplification.
 */
function NewsList({
  items = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
      maxWidth: 'var(--km-size-container-inner)'
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(NewsItem, {
    key: i,
    item: item
  })));
}
Object.assign(__ds_scope, { NewsList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/NewsList.jsx", error: String((e && e.message) || e) }); }

// components/form/HubSpotFormEmbed.jsx
try { (() => {
/**
 * HubSpotFormEmbed — placeholder frame for the third-party HubSpot form (#hubspot-form).
 * The real form is script-rendered by HubSpot; its inputs/validation/error states are
 * NOT part of this design system. This renders a clearly-marked placeholder.
 */
function HubSpotFormEmbed({
  variant = 'inquiry',
  height = 480
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "hubspot-form",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--km-space-4)',
      minHeight: height,
      boxSizing: 'border-box',
      border: '1px dashed var(--km-color-gray-500)',
      background: 'var(--km-color-surface-muted)',
      fontFamily: 'var(--km-font-sans-ja)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      color: 'var(--km-color-text)',
      padding: 'var(--km-space-10)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--km-font-size-base)',
      fontWeight: 'var(--km-font-weight-bold)'
    }
  }, variant === 'mailmagazine' ? 'メールマガジン登録フォーム' : 'お問い合わせフォーム'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--km-font-size-base-sm)',
      lineHeight: 'var(--km-line-height-relaxed)'
    }
  }, "HubSpot \u5916\u90E8\u57CB\u3081\u8FBC\u307F\uFF08\u7B2C\u4E09\u8005\u30EC\u30F3\u30C0\u30EA\u30F3\u30B0\uFF09", /*#__PURE__*/React.createElement("br", null), "\u30D5\u30A9\u30FC\u30E0\u672C\u4F53\u306E UI\u30FBvalidation\u30FB\u30A8\u30E9\u30FC\u72B6\u614B\u306F HubSpot \u5074\u306E\u8CAC\u52D9\u3067\u3059\u3002"));
}
Object.assign(__ds_scope, { HubSpotFormEmbed });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/form/HubSpotFormEmbed.jsx", error: String((e && e.message) || e) }); }

// components/layout/ArcPageHeading.jsx
try { (() => {
/**
 * ArcPageHeading — the giant arc page title observed on 入試情報 (admission) pages:
 * a huge black-stroke arc spanning the content area, with a vertical title
 * (white-on-black label + large vertical text) centered inside it.
 * Intentional addition: recreated from the observed page motif (EV-0035).
 */
function ArcPageHeading({
  label,
  title,
  height = 560
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '40px',
      width: 'min(88%, 1040px)',
      aspectRatio: '1',
      transform: 'translateX(-50%)',
      borderRadius: 'var(--km-radius-circle)',
      border: '5px solid var(--km-color-black)',
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: height,
      bottom: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '120px',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'row-reverse',
      gap: 'var(--km-space-3)',
      alignItems: 'flex-start',
      writingMode: 'vertical-rl',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      letterSpacing: '.15em'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--km-color-black)',
      color: 'var(--km-color-white)',
      fontSize: '28px',
      padding: '10px 4px'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '44px',
      color: 'var(--km-color-black)'
    }
  }, title)));
}
Object.assign(__ds_scope, { ArcPageHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ArcPageHeading.jsx", error: String((e && e.message) || e) }); }

// components/layout/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
const SNS = ['note', 'LINE', 'Instagram', 'X'];
function SnsIcon({
  label,
  size
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--km-radius-circle)',
      background: 'var(--km-color-black)',
      color: 'var(--km-color-white)',
      textDecoration: 'none',
      fontFamily: 'var(--km-font-display-futura)',
      fontWeight: 700,
      fontSize: size * 0.28,
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, label === 'Instagram' ? 'Ig' : label === 'LINE' ? 'LN' : label);
}
function FooterLink({
  label,
  href
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href || '#',
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 'var(--km-font-size-base-sm)',
      fontWeight: 'var(--km-font-weight-bold)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, label);
}

/**
 * Footer — logo (252px), nav groups, circular SNS links (50px desktop / 40px mobile), copyright.
 * NOTE: SNS glyphs are typographic placeholders — original SVG icons were not in the provided mirror.
 */
function Footer({
  logoSrc,
  size = 'default',
  navGroups
}) {
  const mobile = size === 'mobile';
  const groups = navGroups || [{
    items: [{
      label: '学校案内'
    }, {
      label: '学校生活'
    }, {
      label: '学校便り'
    }, {
      label: '入試情報'
    }]
  }, {
    items: [{
      label: 'お問い合わせ'
    }, {
      label: 'プライバシーポリシー'
    }, {
      label: '情報公開'
    }]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      marginTop: 'var(--km-space-25)',
      padding: mobile ? 'var(--km-space-15) var(--km-space-5)' : 'var(--km-space-25) var(--km-space-15) var(--km-space-10)',
      fontFamily: 'var(--km-font-sans-ja)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      color: 'var(--km-color-text)',
      background: 'var(--km-color-white)',
      borderTop: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--km-space-15)',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto'
    }
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "\u795E\u5C71\u307E\u308B\u3054\u3068\u9AD8\u5C02",
    style: {
      width: mobile ? '180px' : 'var(--km-size-logo)',
      height: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--km-space-15)',
      flexWrap: 'wrap'
    }
  }, groups.map((g, i) => /*#__PURE__*/React.createElement("nav", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--km-space-4)'
    }
  }, g.items.map((item, j) => /*#__PURE__*/React.createElement(FooterLink, _extends({
    key: j
  }, item)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--km-space-4)'
    }
  }, SNS.map(s => /*#__PURE__*/React.createElement(SnsIcon, {
    key: s,
    label: s,
    size: mobile ? 40 : 50
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: 'var(--km-space-15) auto 0',
      fontSize: 'var(--km-font-size-sm)',
      fontWeight: 'var(--km-font-weight-medium)'
    }
  }, "\xA9 KAMIYAMA educational institute"));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Footer.jsx", error: String((e && e.message) || e) }); }

// components/motion/RevealMotion.jsx
try { (() => {
const {
  useEffect,
  useRef,
  useState
} = React;
/**
 * RevealMotion — the site's .js-fade scroll reveal: starts opacity 0 / translateY(15px),
 * becomes visible with `all .8s ease-in-out` when scrolled into view.
 */
function RevealMotion({
  children,
  delay = 0,
  as = 'div',
  style
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, {
      threshold: 0.15
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: {
      opacity: show ? 'var(--km-opacity-visible)' : 'var(--km-opacity-hidden)',
      transform: show ? 'translateY(0)' : 'translateY(15px)',
      transition: 'var(--km-motion-reveal)',
      transitionDelay: `${delay}ms`,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { RevealMotion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/motion/RevealMotion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
const {
  useState
} = React;
function Crumb({
  item,
  isLast
}) {
  const [hover, setHover] = useState(false);
  if (isLast || !item.href) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 'var(--km-font-weight-bold)'
      }
    }, item.label);
  }
  return /*#__PURE__*/React.createElement("a", {
    href: item.href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'var(--km-font-weight-bold)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, item.label);
}

/**
 * Breadcrumb — right-aligned, 12px bold, light-gray dash separators.
 * Wrapper: 120px tall desktop / 91px mobile.
 */
function Breadcrumb({
  items = [],
  size = 'default'
}) {
  const mobile = size === 'mobile';
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: mobile ? '91px' : '120px',
      boxSizing: 'border-box',
      fontFamily: 'var(--km-font-sans-ja)',
      fontSize: mobile ? 'var(--km-font-size-xs)' : 'var(--km-font-size-sm)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      color: 'var(--km-color-text)'
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--km-space-4)',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--km-space-4)'
    }
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: '24px',
      height: '1px',
      background: 'var(--km-color-gray-500)'
    }
  }), /*#__PURE__*/React.createElement(Crumb, {
    item: item,
    isLast: i === items.length - 1
  })))));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/HeaderNavigation.jsx
try { (() => {
const {
  useState
} = React;
const NAV_ITEMS = [{
  label: '学校案内',
  href: '#'
}, {
  label: '学校生活',
  href: '#'
}, {
  label: '学校便り',
  href: '#'
}, {
  label: '入試情報',
  href: '#'
}];
function NavLink({
  item,
  active
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: item.href,
    onClick: item.onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--km-space-3)',
      textDecoration: 'none',
      color: 'var(--km-color-text)',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-base)',
      letterSpacing: 'var(--km-letter-spacing-body)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, item.label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: '30px',
      height: '2px',
      background: 'var(--km-color-black)',
      opacity: active ? 1 : .35
    }
  }));
}

/**
 * MenuButton — the 3-line hamburger (45x30 desktop, 28x22 mobile).
 */
function MenuButton({
  open = false,
  onClick,
  size = 'default'
}) {
  const w = size === 'mobile' ? 28 : 45;
  const h = size === 'mobile' ? 22 : 30;
  const line = {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '2px',
    background: 'currentColor',
    transition: 'var(--km-motion-base)'
  };
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": "\u30E1\u30CB\u30E5\u30FC",
    "aria-expanded": open,
    onClick: onClick,
    style: {
      position: 'relative',
      width: w,
      height: h,
      padding: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--km-color-black)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...line,
      top: 0,
      transform: open ? `translateY(${h / 2 - 1}px) rotate(20deg)` : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...line,
      top: h / 2 - 1,
      opacity: open ? 0 : 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...line,
      bottom: 0,
      transform: open ? `translateY(-${h / 2 - 1}px) rotate(-20deg)` : 'none'
    }
  }));
}

/**
 * HeaderNavigation — desktop-left-rail (≥1204px: 180px rail, 100vh) or tablet-mobile-top (fixed bar).
 */
function HeaderNavigation({
  variant = 'desktop-left-rail',
  items = NAV_ITEMS,
  activeIndex = -1,
  logoSrc,
  onMenuClick,
  menuOpen = false
}) {
  if (variant === 'tablet-mobile-top') {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 'var(--km-z-index-header)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        padding: '0 var(--km-space-5)',
        background: 'var(--km-color-white)'
      }
    }, logoSrc && /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, /*#__PURE__*/React.createElement("img", {
      src: logoSrc,
      alt: "\u795E\u5C71\u307E\u308B\u3054\u3068\u9AD8\u5C02",
      style: {
        height: '48px',
        width: 'auto',
        display: 'block'
      }
    })), /*#__PURE__*/React.createElement(MenuButton, {
      size: "mobile",
      open: menuOpen,
      onClick: onMenuClick
    }));
  }
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 'var(--km-size-desktop-rail)',
      minHeight: '100vh',
      boxSizing: 'border-box',
      background: 'var(--km-color-white)',
      borderRight: 'var(--km-border-width-thin) solid var(--km-color-border-subtle)',
      zIndex: 'var(--km-z-index-header)'
    }
  }, logoSrc && /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'block',
      padding: 'var(--km-space-5) var(--km-space-5) 0'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "\u795E\u5C71\u307E\u308B\u3054\u3068\u9AD8\u5C02",
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--km-space-10)',
      padding: '0 0 0 var(--km-space-8)'
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(NavLink, {
    key: i,
    item: item,
    active: i === activeIndex
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--km-color-black)',
      color: 'var(--km-color-white)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--km-space-2)',
      padding: 'var(--km-space-4) var(--km-space-5)',
      textDecoration: 'none',
      color: 'inherit',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-base-sm)',
      borderBottom: '1px solid rgba(255,255,255,.3)'
    }
  }, "\u4E2D\u5B66\u751F\u5411\u3051LINE"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--km-space-2)',
      padding: 'var(--km-space-4) var(--km-space-5)',
      textDecoration: 'none',
      color: 'inherit',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: 'var(--km-font-size-base-sm)'
    }
  }, "\u304A\u554F\u3044\u5408\u308F\u305B")));
}
Object.assign(__ds_scope, { MenuButton, HeaderNavigation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/HeaderNavigation.jsx", error: String((e && e.message) || e) }); }

// components/navigation/OverlayNavigation.jsx
try { (() => {
const {
  useState
} = React;
const DEFAULT_ITEMS = [{
  label: '学校案内',
  href: '#'
}, {
  label: '学校生活',
  href: '#'
}, {
  label: '学校便り',
  href: '#'
}, {
  label: '入試情報',
  href: '#'
}];
function OverlayLink({
  item,
  onNavigate
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: item.href || '#',
    onClick: onNavigate,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: 'var(--km-color-white)',
      textDecoration: 'none',
      fontFamily: 'var(--km-font-sans-ja)',
      fontWeight: 'var(--km-font-weight-bold)',
      fontSize: '24px',
      letterSpacing: 'var(--km-letter-spacing-body)',
      opacity: hover ? 'var(--km-opacity-hover-muted)' : 1,
      transition: 'var(--km-motion-base)'
    }
  }, item.label);
}

/**
 * OverlayNavigation (#sp_nav) — full-screen overlay opened from the mobile menu button.
 * Closed: opacity 0 + pointer-events none. Open: a giant black circle scales up behind the links.
 */
function OverlayNavigation({
  open = false,
  items = DEFAULT_ITEMS,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 'var(--km-z-index-overlay)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'var(--km-motion-base)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '250vmax',
      height: '250vmax',
      borderRadius: 'var(--km-radius-pill)',
      background: 'var(--km-color-black)',
      transform: `translate(-50%,-50%) scale(${open ? 1 : 0})`,
      transition: 'transform .6s ease-in-out'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--km-space-8)'
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement(OverlayLink, {
    key: i,
    item: item,
    onNavigate: onClose
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "\u9589\u3058\u308B",
    style: {
      position: 'absolute',
      top: 'var(--km-space-5)',
      right: 'var(--km-space-5)',
      width: '45px',
      height: '45px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--km-color-white)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: '50%',
      width: '100%',
      height: '2px',
      background: 'currentColor',
      transform: 'rotate(45deg)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: '50%',
      width: '100%',
      height: '2px',
      background: 'currentColor',
      transform: 'rotate(-45deg)'
    }
  })));
}
Object.assign(__ds_scope, { OverlayNavigation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/OverlayNavigation.jsx", error: String((e && e.message) || e) }); }

// components/layout/GlobalShell.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
/**
 * GlobalShell — the common page frame: left rail header ≥1204px,
 * top fixed header + overlay menu below that; white main canvas; footer.
 */
function GlobalShell({
  children,
  logoSrc,
  whiteLogoSrc,
  activeIndex = -1,
  navItems,
  forceVariant
}) {
  const [wide, setWide] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1204 : true);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1204px)');
    const fn = e => setWide(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  const isRail = forceVariant ? forceVariant === 'desktop-left-rail' : wide;
  if (isRail) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'stretch',
        background: 'var(--km-color-white)',
        minHeight: '100vh'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.HeaderNavigation, {
      variant: "desktop-left-rail",
      logoSrc: logoSrc,
      activeIndex: activeIndex,
      items: navItems
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("main", null, children), /*#__PURE__*/React.createElement(__ds_scope.Footer, {
      logoSrc: logoSrc
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--km-color-white)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.HeaderNavigation, {
    variant: "tablet-mobile-top",
    logoSrc: logoSrc,
    menuOpen: menuOpen,
    onMenuClick: () => setMenuOpen(!menuOpen)
  }), /*#__PURE__*/React.createElement(__ds_scope.OverlayNavigation, {
    open: menuOpen,
    items: navItems,
    onClose: () => setMenuOpen(false)
  }), /*#__PURE__*/React.createElement("main", null, children), /*#__PURE__*/React.createElement(__ds_scope.Footer, {
    logoSrc: logoSrc,
    size: "mobile"
  }));
}
Object.assign(__ds_scope, { GlobalShell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/GlobalShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AdmissionScreen.jsx
try { (() => {
const ASSETS = '../../assets';
function AdmissionScreen({
  onNavigate,
  navItems
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlobalShell, {
    logoSrc: `${ASSETS}/logos/logo.svg`,
    activeIndex: 3,
    navItems: navItems,
    forceVariant: "desktop-left-rail"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: '0 var(--km-space-10)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ArcPageHeading, {
    label: "2027\u5E74\u5EA6",
    title: "\u5165\u8A66\u60C5\u5831"
  }), /*#__PURE__*/React.createElement(__ds_scope.Breadcrumb, {
    items: [{
      label: 'Top',
      href: '#'
    }, {
      label: '入試情報',
      href: '#'
    }, {
      label: '2027年度入試情報'
    }]
  }), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--km-size-container-inner)',
      margin: '0 auto',
      padding: 'var(--km-space-15) 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 var(--km-font-size-body-large)/var(--km-line-height-body) var(--km-font-sans-ja)',
      letterSpacing: '.05em'
    }
  }, "\u795E\u5C71\u307E\u308B\u3054\u3068\u9AD8\u5C02\u306F\u3001\u30C6\u30AF\u30CE\u30ED\u30B8\u30FC\u30FB\u30C7\u30B6\u30A4\u30F3\u30FB\u8D77\u696D\u5BB6\u7CBE\u795E\u3092\u5B66\u30765\u5E74\u5236\u306E\u9AD8\u7B49\u5C02\u9580\u5B66\u6821\u3067\u3059\u30022027\u5E74\u5EA6\u306E\u5165\u5B66\u8005\u9078\u629C\u306B\u95A2\u3059\u308B\u60C5\u5831\u3092\u304A\u77E5\u3089\u305B\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--km-space-8)',
      marginTop: 'var(--km-space-15)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, null, "\u52DF\u96C6\u8981\u9805\u3092\u898B\u308B"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "black"
  }, "Web\u51FA\u9858\u306F\u3053\u3061\u3089")))), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--km-size-container-inner)',
      margin: '0 auto',
      padding: '0 0 var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LinkCtaCards, {
    items: [{
      title: '学校説明会',
      description: 'オンライン・現地開催の説明会日程と申込はこちら。',
      image: `${ASSETS}/img/photo_experience.jpg`
    }, {
      title: 'よくある質問',
      description: '入試・出願・学費に関するよくある質問をまとめました。'
    }]
  })))));
}
Object.assign(__ds_scope, { AdmissionScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AdmissionScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const ASSETS = '../../assets';
function HomeScreen({
  onNavigate,
  navItems
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlobalShell, {
    logoSrc: `${ASSETS}/logos/logo.svg`,
    activeIndex: -1,
    navItems: navItems,
    forceVariant: "desktop-left-rail"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: 'var(--km-space-25) var(--km-space-10) var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: '700 52px/1.6 var(--km-font-sans-ja)',
      letterSpacing: '.05em'
    }
  }, "\u4EBA\u9593\u306E\u672A\u6765\u3092", /*#__PURE__*/React.createElement("br", null), "\u5909\u3048\u308B\u5B66\u6821\u3002")), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, {
    delay: 150
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'var(--km-space-8) 0 0',
      font: '500 var(--km-font-size-body-large)/var(--km-line-height-body) var(--km-font-sans-ja)',
      letterSpacing: '.05em',
      maxWidth: '30em'
    }
  }, "\u30C6\u30AF\u30CE\u30ED\u30B8\u30FC\xD7\u30C7\u30B6\u30A4\u30F3\xD7\u8D77\u696D\u5BB6\u7CBE\u795E\u3092\u5B66\u3076\u3001\u5FB3\u5CF6\u770C\u795E\u5C71\u753A\u306E\u79C1\u7ACB\u9AD8\u7B49\u5C02\u9580\u5B66\u6821\u3002")), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, {
    delay: 300
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 'var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${ASSETS}/img/kamiyama.jpg`,
    alt: "\u795E\u5C71\u753A\u306E\u98A8\u666F",
    style: {
      display: 'block',
      width: '100%',
      aspectRatio: '21/9',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: `${ASSETS}/illustrations/illust_01.png`,
    alt: "",
    style: {
      position: 'absolute',
      right: '-20px',
      bottom: '-40px',
      width: '180px'
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: '0 var(--km-space-10) var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 var(--km-space-15)',
      font: '700 var(--km-font-size-heading-2)/1.5 var(--km-font-sans-ja)',
      letterSpacing: '.05em'
    }
  }, "\u5B66\u6821\u4FBF\u308A"), /*#__PURE__*/React.createElement(__ds_scope.NewsList, {
    items: [{
      date: '2026.06.28',
      category: 'お知らせ',
      title: '2027年度入試情報を公開しました'
    }, {
      date: '2026.06.15',
      category: 'イベント',
      title: '学校説明会（オンライン）の申込を開始しました'
    }, {
      date: '2026.05.30',
      category: '学校便り',
      title: '1年生の神山ロングホームルームを実施しました'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--km-space-10)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "mobile"
  }, "\u4E00\u89A7\u3092\u898B\u308B"))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: '0 var(--km-space-10) var(--km-space-15)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 'var(--km-space-8)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.HoverMaskLink, {
    src: `${ASSETS}/img/curriculum.jpg`,
    alt: "\u30AB\u30EA\u30AD\u30E5\u30E9\u30E0",
    label: "\u30AB\u30EA\u30AD\u30E5\u30E9\u30E0"
  }), /*#__PURE__*/React.createElement(__ds_scope.HoverMaskLink, {
    src: `${ASSETS}/img/oneday.jpg`,
    alt: "1\u65E5\u306E\u6D41\u308C",
    label: "1\u65E5\u306E\u6D41\u308C"
  }), /*#__PURE__*/React.createElement(__ds_scope.HoverMaskLink, {
    src: `${ASSETS}/img/gallery.jpg`,
    alt: "\u307E\u308B\u3054\u3068\u30AE\u30E3\u30E9\u30EA\u30FC",
    label: "\u307E\u308B\u3054\u3068\u30AE\u30E3\u30E9\u30EA\u30FC"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: '0 var(--km-space-10) var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LinkCtaCards, {
    items: [{
      title: '学校案内',
      description: '教育理念・カリキュラム・教員紹介。神山まるごと高専のすべて。',
      image: `${ASSETS}/img/about.jpg`,
      onClick: e => {
        e && e.preventDefault();
      }
    }, {
      title: '入試情報',
      description: '2027年度入試の概要と出願方法はこちらから。',
      image: `${ASSETS}/img/admissions.jpg`,
      linkText: '入試情報を見る',
      onClick: e => {
        e && e.preventDefault();
        onNavigate && onNavigate('admission');
      }
    }]
  })));
}
Object.assign(__ds_scope, { HomeScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/InquiryScreen.jsx
try { (() => {
const ASSETS = '../../assets';
function InquiryScreen({
  navItems
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.GlobalShell, {
    logoSrc: `${ASSETS}/logos/logo.svg`,
    activeIndex: -1,
    navItems: navItems,
    forceVariant: "desktop-left-rail"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--km-size-container)',
      margin: '0 auto',
      padding: '0 var(--km-space-10)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Breadcrumb, {
    items: [{
      label: 'Top',
      href: '#'
    }, {
      label: 'お問い合わせ'
    }]
  }), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 'var(--km-space-10) 0 var(--km-space-15)',
      font: '700 var(--km-font-size-heading-2)/1.5 var(--km-font-sans-ja)',
      letterSpacing: '.05em'
    }
  }, "\u304A\u554F\u3044\u5408\u308F\u305B")), /*#__PURE__*/React.createElement(__ds_scope.RevealMotion, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--km-size-container-inner)',
      margin: '0 auto',
      paddingBottom: 'var(--km-space-15)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--km-space-10)',
      font: '500 var(--km-font-size-base)/var(--km-line-height-body) var(--km-font-sans-ja)',
      letterSpacing: '.05em'
    }
  }, "\u5B66\u6821\u898B\u5B66\u3001\u53D6\u6750\u3001\u305D\u306E\u4ED6\u306E\u304A\u554F\u3044\u5408\u308F\u305B\u306F\u4E0B\u8A18\u30D5\u30A9\u30FC\u30E0\u3088\u308A\u304A\u9001\u308A\u304F\u3060\u3055\u3044\u3002"), /*#__PURE__*/React.createElement(__ds_scope.HubSpotFormEmbed, {
    variant: "inquiry"
  })))));
}
Object.assign(__ds_scope, { InquiryScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/InquiryScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.HoverMaskLink = __ds_scope.HoverMaskLink;

__ds_ns.LinkCtaCards = __ds_scope.LinkCtaCards;

__ds_ns.CampaignLandingPage = __ds_scope.CampaignLandingPage;

__ds_ns.NewsList = __ds_scope.NewsList;

__ds_ns.HubSpotFormEmbed = __ds_scope.HubSpotFormEmbed;

__ds_ns.ArcPageHeading = __ds_scope.ArcPageHeading;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.GlobalShell = __ds_scope.GlobalShell;

__ds_ns.RevealMotion = __ds_scope.RevealMotion;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.MenuButton = __ds_scope.MenuButton;

__ds_ns.HeaderNavigation = __ds_scope.HeaderNavigation;

__ds_ns.OverlayNavigation = __ds_scope.OverlayNavigation;

__ds_ns.AdmissionScreen = __ds_scope.AdmissionScreen;

__ds_ns.HomeScreen = __ds_scope.HomeScreen;

__ds_ns.InquiryScreen = __ds_scope.InquiryScreen;

})();
