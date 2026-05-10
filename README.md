# Raagalaya Academy — Website

Marketing and class-inquiry website for Raagalaya Academy, a Carnatic vocal music school.

- **Live**: https://raagalayaacademy.com (also reachable at https://raagalaya.netlify.app)
- **Stack**: Vite + React 18 + TypeScript + Tailwind + shadcn/ui + React Router 6
- **Hosting**: Netlify (auto-deploys on push to `main`)
- **Contact form**: Netlify Forms → academy Gmail inbox
- **Content editing**: Decap CMS at https://raagalayaacademy.com/admin

## Local development

```bash
npm install
npm run dev        # http://localhost:8080 — also runs `npm run gallery` first
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run gallery    # rebuild watermarked gallery from _originals/gallery/
npm run lint       # ESLint
npm run test       # Vitest
```

`npm run gallery` runs automatically before `dev` and `build`. It reads pristine
photos from `_originals/gallery/`, watermarks each with `© Raagalaya Academy`,
generates thumbnails, and writes everything to `public/images/gallery/`.

## Project structure

```
src/                       # React app
  App.tsx                  # react-router routes
  components/              # Layout, SectionHeader, NavLink, ui/* (shadcn)
  pages/                   # Home, About, Classes, Events, Gallery, Contact, NotFound
  assets/                  # static imagery imported into pages
  hooks/ lib/

content/                   # CMS-managed content (JSON files written by Decap)
  events/upcoming/*.json
  events/past/*.json
  videos/press/*.json
  videos/mayoral/*.json
  videos/performances/*.json
  gallery.json

public/                    # static files copied verbatim into dist/
  admin/                   # Decap CMS bootstrap (index.html + config.yml)
  images/gallery/          # generated from _originals/gallery/ — gitignored
  favicon.png _redirects ...

_originals/                # tracked: pristine pre-watermark gallery photos
  gallery/*.jpg            # Decap uploads land here

scripts/process-gallery.mjs # watermark + thumbnail generator (sharp)
netlify.toml                # build command, environment, SPA redirect
index.html                  # page shell; embeds the Netlify Forms placeholder
```

## Content updates

Most content is editable via the **Decap CMS admin** at `/admin`, no code
changes required. See [`docs/admin-guide.md`](docs/admin-guide.md) for the
content editor's walkthrough.

Code-side changes (rare):
- **About copy** → `src/pages/About.tsx`
- **Classes** → `src/pages/Classes.tsx`
- **Home hero copy** → `src/pages/Home.tsx`
- **Contact details** (sidebar, social links) → `src/pages/Contact.tsx`

## Deployment

Push to `main` → Netlify auto-deploys via `netlify.toml`. The build runs:
1. `npm run gallery` — watermark + thumbnail generation
2. `vite build` — bundle React app into `dist/`
3. Netlify serves `dist/`, with SPA fallback and Forms detection enabled

Custom domain: `raagalayaacademy.com` (DNS at Porkbun, Let's Encrypt SSL).

## Contact form

The contact form on `/contact` posts to Netlify Forms. Submissions appear in
the Netlify dashboard (**Forms → contact**) and trigger an email notification
to `raagalaya.academy@gmail.com`. Form detection is enabled at the project
level; the static placeholder lives in `index.html` for build-time scanning.
