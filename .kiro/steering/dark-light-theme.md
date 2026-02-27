---
inclusion: fileMatch
fileMatchPattern: "src/components/**,src/app/**"
---

# Dark/Light Theme Guidelines

This project supports dark and light mode via `next-themes` with Tailwind CSS `dark:` variant.

## Architecture

- `src/components/theme-provider.tsx` — wraps the app with `next-themes` (attribute="class", defaultTheme="dark")
- `src/components/theme-toggle.tsx` — sun/moon toggle button in the header
- `src/app/globals.css` — contains `:root` (light) and `.dark` (dark) CSS variable definitions
- `@custom-variant dark (&:is(.dark *))` enables Tailwind's `dark:` prefix

## Rules for All Components

1. Never hardcode dark-only colors. Always provide both light and dark variants.
2. Use the pattern: `text-slate-900 dark:text-white` for primary text.
3. Use the pattern: `text-slate-500 dark:text-slate-400` for muted text.
4. Use the pattern: `bg-white dark:bg-slate-900` or `bg-slate-50 dark:bg-slate-950` for section backgrounds.
5. Use the pattern: `border-slate-200 dark:border-white/10` for borders.
6. Glass effects: `bg-white dark:bg-white/5 dark:backdrop-blur-md` for glass cards.
7. Gradient orbs: `bg-blue-100/50 dark:bg-blue-500/10` for decorative blurs.
8. Icons: `text-blue-600 dark:text-blue-400` for brand-colored icons.
9. CTA buttons keep the same gradient style in both modes (red gradient with white text).
10. The hero section and LampEffect are inherently dark in both modes — they use deep blue/slate backgrounds.

## Color Mapping Quick Reference

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Section bg | `bg-white` or `bg-slate-50` | `dark:bg-slate-950` or `dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950` |
| Primary text | `text-slate-900` | `dark:text-white` |
| Muted text | `text-slate-500` | `dark:text-slate-400` |
| Card bg | `bg-white` | `dark:bg-white/5` |
| Card border | `border-slate-200` | `dark:border-white/10` |
| Link hover | `hover:text-slate-900` | `dark:hover:text-white` |
| Form inputs | `bg-white border-slate-300` | `dark:bg-white/5 dark:border-white/10` |
| Footer bg | `bg-slate-100` | `dark:bg-slate-950` |
| Header bg (scrolled) | `bg-white/80` | `dark:bg-slate-950/80` |

## When Creating New Sections

- Start with the light mode design as the base classes
- Add `dark:` variants for every color-related class
- Test both modes visually before committing
- The toggle is in the sticky header — use it to verify
