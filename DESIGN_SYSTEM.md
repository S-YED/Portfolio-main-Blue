# Portfolio — Complete Design System

A reference for cloning this site with a different color scheme.
Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

---

## 1. Tech & Architecture

| Concern | Choice |
|---|---|
| Framework | Next.js 14.2 (App Router, `app/` dir) |
| Language | TypeScript |
| Styling | Tailwind CSS (utility-first) + a little global CSS |
| Animation | Framer Motion (`motion.*`, `whileInView`) |
| Theming | `next-themes`, class-based dark mode (`darkMode: "class"`), default = **light** |
| Fonts | `Fira_Sans` (Google) + Tailwind `font-mono` (terminal motif) |
| Icons | `react-icons` (Fi, Fa6, Si, Md) + local SVGs via `@svgr/webpack` |
| Extras | `roughjs` (hand-drawn underline), `react-typed` (typing effect), Three.js cloud bg |

**Route groups:** `app/(default_site)/` holds the portfolio (layout + page + blog). `app/layout.tsx` is the root (html/body + ThemeProvider).

**Component folders:**
- `app/ui/landing/` — page sections (Hero, Skills, Experience, Projects, Flex, CommunityWork, MoreAboutMe, Contact, UserInfo)
- `app/ui/universal/` — Navbar, Footer
- `app/ui/components/` — shared (SectionHeading, CursorLight, CloudBackground, github-map, MotionProvider, loaders)
- `app/lib/constants.ts` — all content data (skills, projects, achievements)
- `app/lib/definitions.ts` — TypeScript types

---

## 2. Color System (BLUE theme — centralized)

> This is the **blue** clone. All brand colors were refactored into **CSS variables**
> so the whole site can be re-skinned from **one place**: the `:root` block at the
> top of `app/globals.css`.

### 2a. The single source of truth — `app/globals.css` → `:root`
```css
:root {
  --accent: #2b5fb3;             /* primary accent (light mode)             */
  --accent-dark: #6cb6f5;        /* primary accent (dark mode)              */
  --accent-strong: #22467f;      /* deeper accent — logo, name, light hover */
  --accent-hover-dark: #a7d2f7;  /* dark-mode primary button hover          */
  --underline-light: #4f78bf;    /* nav link underline (light)              */
  --underline-dark: #a9d2f2;     /* nav link underline (dark)               */
  --gradient-from: #1d4ed8;      /* page background gradient origin          */
  --card-dark-rgb: 30 38 54;     /* card surface (dark) = #1e2636            */
  --chip-dark: #26344a;          /* tech-stack chip surface (dark)           */
}
```
**Edit these 9 values and the entire site re-skins.** `tailwind.config.ts` maps them to
utility classes (`accent`, `accent-dark`, `accent-strong`, `accent-hover`,
`underline-light`, `underline-dark`, `card-surface`, `chip-surface`), so components never
hardcode brand hexes anymore.

### 2b. A few colors live in their own files (not in `:root`)
| Where | What | Note |
|---|---|---|
| `globals.css` `.color-github-1..10` | GitHub heatmap (10-step blue ramp, light + dark) | self-contained in one file |
| `globals.css` focus ring + `.cursor-light` | `#6cb6f5` glow | edit here if changing the glow |
| `CloudBackgroundScene.tsx` | 3D cloud tints + spotlights (blue) | Three.js colors, set in JS |
| `Hero.tsx` | card shadow `rgba(108,182,245,0.08)` | blue-tinted glow |

### 2c. Intentionally NOT blue (kept as-is)
- **Backgrounds** `#eaeaea` (light) / `#282c33` (dark) — neutral grays, work with any accent.
- **`#ffa500`** — the orange hand-drawn underline under the name (`Hero.tsx`). A complementary
  pop that looks great against blue; kept on purpose.
- **`cyan-*`** — secondary accent (project-card title underline, some links). Stays as a
  cool-tone companion to the blue primary.
- Platform colors on blog share buttons (WhatsApp green, LinkedIn/Facebook blue), neutral grays/borders.

### 2d. Neutral / text palette (Tailwind defaults — kept)
- Text: `text-neutral-800` / `text-neutral-900` (light), `dark:text-white` / `dark:text-neutral-100`
- Muted: `text-neutral-500` / `dark:text-neutral-400`
- Secondary links: `cyan-700/800` (light), `cyan-200/300` (dark); LinkedIn `blue-600/400`

---

## 3. Typography
- **Body/UI:** `font-mono` is used heavily as the signature "developer terminal" look.
- **Display:** Fira Sans (loaded in `app/lib/fonts.ts`, weight 400, `display: swap`).
- **Scale (responsive, mobile→sm):**
  - h1 (Hero name): `text-3xl sm:text-4xl`
  - h2 (SectionHeading): `text-xl sm:text-2xl font-semibold`
  - h3 (card title): `text-base sm:text-lg font-semibold`
  - body: `text-sm sm:text-base` (sometimes `sm:text-lg`)
  - small/meta: `text-xs`
- **Motif:** every section heading is prefixed with a `$` prompt; nav links with `/`. Reinforces the terminal theme.
- Reading width capped at `max-w-[75ch]` for prose blocks.

---

## 4. Layout & Spacing
- **Page container:** `max-w-screen-xl`, centered, `px-5`.
- **Section rhythm:** `gap-14 lg:gap-28` between major sections; `gap-10` within.
- **Section heading pattern:** `<SectionHeading name="..." />` renders `$ name` (h2).
- **Padding:** cards `py-5 px-4`; buttons `px-4 py-2`; Hero card `p-6 sm:p-8`.
- **Radius:** `rounded-lg` (buttons/chips), `rounded-xl` (cards), `rounded-2xl` (Hero glass card), `rounded-full` (cursor glow).
- **Shadows:** `shadow-2xl` (cards); custom purple glow on Hero card.

---

## 5. Signature Effects (the "personality")
1. **Dark-mode circle reveal** — `body::before` clip-path circle expands from top-right on theme toggle (`globals.css`, 0.4s ease).
2. **Cursor light** — radial purple glow that follows the mouse (`CursorLight` + `.cursor-light`, `mix-blend-mode: screen`, `blur(35px)`).
3. **Glassmorphism Hero card** — `bg-white/40 dark:bg-[#282c33]/50 backdrop-blur-md` + purple shadow.
4. **Roughjs underline** — hand-drawn orange line under the typed name.
5. **Typing effect** — `react-typed` types out the name.
6. **3D tilt project cards** — `onMouseMove` computes `rotateX/rotateY` (perspective 300px).
7. **Framer Motion reveals** — `initial={{opacity:0, y:10}} whileInView` with staggered `delay` across lists.
8. **Animated underlines** — nav links + card titles grow an underline on hover (`after:` pseudo + `w-0 → w-full`).
9. **Background** — fixed gradient blur (`from-pink-700`) + Three.js `CloudBackground`.

---

## 6. Component Recipes (copy these patterns)

**Button — primary (Hero CTA):**
```
bg-accent text-white border-accent hover:bg-[#593563]
dark:bg-accent-dark dark:text-neutral-900 dark:border-accent-dark dark:hover:bg-[#d798ec]
px-4 py-2 rounded-lg border font-semibold transition-colors duration-300
```
**Button — secondary / control:**
```
bg-transparent text-neutral-800 dark:text-neutral-100
border-neutral-400 dark:border-[#47494e]
hover:border-accent dark:hover:border-accent-dark
```
**Section heading:** `<span class="text-accent dark:text-accent-dark">$</span> <span class="font-mono">{name}</span>`

**Tech chip:** `px-2 py-1 rounded-lg dark:bg-chip-surface bg-neutral-900 text-xs text-neutral-100`

**Project card:** image (h-200, border-2, group-hover scale-105) → body (`dark:bg-card-surface bg-white`) → title w/ cyan underline → description → tech chips → date.

---

## 7. How to Re-skin to Another Color

**One-step path (recolors ~all of the site):** open `app/globals.css` and edit the 9
variables in the `:root` block (see §2a). Pick a primary, a lighter dark-mode variant, a
deeper "strong" shade, and matching underline/hover/gradient tints. Save — done.

**For a fully polished new hue, also touch these few extras (§2b):**
1. GitHub heatmap ramp in `globals.css` (`.color-github-1..10`, light + dark) — regenerate a 10-step ramp in the new hue.
2. `CloudBackgroundScene.tsx` — the cloud tint arrays + spotlight colors.
3. `Hero.tsx` — card shadow `rgba(108,182,245,0.08)` → rgba of the new accent.
4. `app/layout.tsx` — `viewport.themeColor` (mobile browser chrome).
5. Optionally `#ffa500` (Hero underline) — the complementary pop; change only if you want.

**Backgrounds** (`#eaeaea` light / `#282c33` dark) are neutral — change only for a different base.

**Content** lives entirely in `app/lib/constants.ts` (skills/projects/achievements) and component text — swap freely.
