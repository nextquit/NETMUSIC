# NETMUSIC — Web Version

Unlimited Music Streaming web app, rebuilt from the original APK source.

## Stack
- **React 19** (via `createRoot`)
- **Vite 6** (build tool + dev server)
- Plain CSS (no framework)

## Pages
1. **Terms & Conditions** — accept once, stored in `localStorage`
2. **Landing / Sign In** — email + password, loading spinner, features grid, trending carousel
3. **Create Account** — form with validation, animated success screen
4. **Home** — sticky nav, collapsible sidebar, time-of-day welcome banner, dark/light mode

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
# output → dist/
```

## Data
All auth data lives in `localStorage`:
- `nm_terms_accepted` — `"yes"` after terms are accepted
- `nm_accounts` — JSON array of registered users
- `nm_current_user` — currently logged-in user `{ name, email }`
