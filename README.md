# ARS Premium – The Automotive Atelier
**Restore. Protect. Maintain.** One merged frontend (React 18 + TypeScript + Vite + Tailwind + React Router) built from
`ARS-premium-main` (brand, hero, content, photos, videos) and `Animated_car_site-main` (scroll-controlled video / frame
sequences, service pages, cart, forms).

## Run
```bash
npm install
npm run dev        # development
npm run build      # tsc --noEmit && vite build
npm run preview
```

## What is where
| Area | File(s) |
|---|---|
| Original 15 services (unchanged) | `src/data/services.ts` |
| Full catalogue A–G (15 originals + new request-a-quote services) | `src/data/catalogue.ts` |
| ARS Premium copy (method, why ARS, FAQs, hero) | `src/data/ars.ts` |
| Related-parts inspection rules | `src/data/inspection.ts` |
| Sample health report data | `src/data/health.ts` |
| Prices (empty – nothing invented) | `src/data/pricing.ts` |
| Contact details (empty – nothing invented) | `src/data/site.ts` |
| Packages (original 3 drafts, `approved:false`) | `src/data/packages.ts` |
| Before/after pairs (all `illustrative: true`) | `src/data/comparisons.ts` |

## Routes (24 page types)
`/` `/about` `/services` `/services/:slug` `/detailing` `/mechanical` `/electrical` `/ac-services` `/interior-restoration`
`/paint-correction` `/ceramic-graphene` `/ppf` `/replacement-services` `/related-parts-inspection` `/vehicle-health-report`
`/packages` `/gallery` `/booking` `/cart` `/dashboard` `/service-history` `/blog` `/contact` `/faqs`

## Before launch – ARS must supply
- Phone, WhatsApp, email, address, hours → `src/data/site.ts` (WhatsApp buttons appear automatically).
- Approved prices → `src/data/pricing.ts`; approved packages → set `approved: true` in `packages.ts`.
- Real before/after photos → replace files in `public/comparisons` and set `illustrative: false`.
- Verified customer project photos and genuine reviews (testimonials and statistics were intentionally left out).
- A form endpoint: set `VITE_FORM_ENDPOINT`, otherwise requests are saved on the visitor's device only (the UI says so).

## Media notes
- `public/reference/*` are tiles cut from the supplied reference collage. They are illustrative and labelled as such.
- `public/ars/ba-before.jpg` / `ba-after.jpg` are the two halves of the original `ba.jpg` sample.
- `public/brand/*` are transparent versions of the supplied ARS logo.
