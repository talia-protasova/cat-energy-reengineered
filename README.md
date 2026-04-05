# Cat Energy - Nutrition for Your Cat

A re-engineering of a static HTML Academy training project into a modern Angular 19 SPA. The original was a Gulp-based layout exercise; this version rebuilds it from scratch with a component-driven architecture, layered styling system, reactive forms, and light/dark theming.

**Live demo (legacy baseline):** [talia-protasova.github.io/cat-energy](https://talia-protasova.github.io/cat-energy/index.html) · [original source](https://github.com/talia-protasova/cat-energy)

---

## Lighthouse (production build)

| Page | Performance | Accessibility | Best Practices | SEO |
|------|-------------|---------------|----------------|-----|
| `/` | 100 | 100 | 100 | 100 |
| `/catalog` | 100 | 100 | 100 | 100 |

Measured with `ng build` + `npx serve --single`, Lighthouse desktop, no throttling.

---

## Tech Stack

- **Angular 19** - standalone components, lazy-loaded routes, signals
- **TypeScript 5.7**
- **SCSS** - token-based design system, `data-theme` theming
- **ngx-mask** - phone input formatting
- **Angular Reactive Forms** - with accessibility markup

---

## Project Structure
src/
├── app/
│   ├── core/
│   │   ├── data/          # Static data: navigation, products, social links
│   │   ├── models/        # TypeScript interfaces
│   │   └── services/      # ThemeService, ScrollService
│   ├── layout/
│   │   ├── header/        # Header + Navigation (headerVariant via route data)
│   │   └── footer/
│   ├── pages/
│   │   ├── home/
│   │   │   └── sections/  # promo, advantages, categories, example
│   │   │       └── example/  # before/after slider + stats
│   │   ├── catalog/       # CatalogList, ProductCard, BonusBanner, AddMore
│   │   └── program-selection/
│   │       └── success-message/
│   └── shared/
│       └── components/
│           ├── controls/
│           │   ├── input/      # CVA - text, number, email, tel + icon + mask
│           │   ├── textarea/   # CVA
│           │   ├── radio/      # Presentational, checked via input()
│           │   └── checkbox/   # Presentational, checked via input()
│           ├── loader/
│           ├── scroll-top-button/
│           ├── social-links/
│           └── theme-toggle/
└── styles/
├── tokens/     # colors, spacing, typography, motion, elevation, radius, breakpoints
├── theme/      # light.scss / dark.scss - token-to-variable mapping
├── abstracts/  # media, images, motion, typography mixins
├── base/       # reset, base
├── layout/     # wrapper
└── ui/         # buttons, fonts

---

## Styling System

Three-layer architecture that separates concerns at each level.

**Tokens** (`styles/tokens/`) define raw values: color palette, and breakpoints, etc 

**Themes** (`styles/theme/`) map tokens to CSS custom properties scoped under `[data-theme="light"]` and `[data-theme="dark"]`. Theme switches at runtime via `ThemeService`, which sets the attribute on `<html>` and persists the preference to `localStorage`.

**Abstracts** (`styles/abstracts/`) expose SCSS mixins and helpers built on top of tokens - responsive breakpoints, responsive background images, motion presets, and typography helpers. Page-level component styles import only what they need.

Component SCSS budgets are enforced in `angular.json` (warning at 6 KB, error at 8 KB), which motivated extracting the shared controls into their own scoped stylesheets.

---

## Routing

All routes are lazy-loaded via `loadComponent`. The shell layout - header, `<router-outlet>`, footer - lives in `AppComponent` and is shared across all pages:
```html
<app-header />
<main id="main-content">
  <router-outlet />
</main>
<app-footer />
```

| Path | Component | Route data |
|------|-----------|------------|
| `/` | `HomeComponent` | `headerVariant: 'index'` |
| `/catalog` | `CatalogComponent` | `headerVariant: 'default'` |
| `/program-selection` | `ProgramSelectionComponent` | `headerVariant: 'default'` |
| `/**` | → `/` | wildcard redirect |

`headerVariant` is passed through route data and consumed by the header to switch its visual mode - the index page has a full-bleed hero variant, other pages use the default.

---

## Shared Form Controls

The `program-selection` form uses four reusable controls from `shared/components/controls/`:

**`app-input`** implements `ControlValueAccessor` - handles `text`, `number`, `email`, and `tel` types; renders an optional SVG icon; integrates `ngx-mask` for phone formatting; surfaces `hasError` and `errorText` as inputs so validation display stays in the parent.

**`app-textarea`** implements `ControlValueAccessor` with minimal surface area - `id` and `placeholder` inputs, value managed via `signal()`.

**`app-radio`** and **`app-checkbox`** are presentational: no CVA, `checked` comes in as `input()`, selection emits via `output()`. This avoids the multi-instance CVA sync problem where Angular calls `writeValue` only on mount, not on sibling changes.

---

## Program Selection Form

Reactive form with grouped controls, client-side validation, and accessibility:

- `aria-invalid` + `aria-describedby` on all inputs
- `role="alert"` + `aria-live="polite"` on success state
- `aria-busy` on submit button during loading
- Phone field formatted with `ngx-mask`
- Loading and submitted states managed via Angular signals
- Verified with WAVE (WebAIM) across all three pages - no errors detected, AIM Score 10/10 on each.

---

## Responsive Images

Every image is served in three breakpoint variants (mobile / tablet / desktop), two resolutions (@1x / @2x), and two formats (WebP + PNG/JPG fallback) using `<picture>` with `<source>` elements. The LCP image on each page has `fetchpriority="high"` and `loading="eager"`.

---

## Getting Started
```bash
npm install
npm start        # dev server → http://localhost:4200
npm run build    # production build → dist/
```

To preview the production build with correct SPA routing:
```bash
npx serve dist/cat-energy-reengineered/browser --single
```

---

## Status

| Feature | Status |
|---------|--------|
| All three pages | ✅ |
| Responsive images + LCP optimization | ✅ |
| Reactive form | ✅ |
| Accessibility audit (WAVE, all 3 pages) | ✅ 10/10 || Light / dark theme | ✅ |
| Shared CVA controls | ✅ |
| Lighthouse 100 in production | ✅ |

