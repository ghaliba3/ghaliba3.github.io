# AWS Generative AI Developer — Practice Exam

A self-contained static webapp: 300 professional-difficulty practice questions across 10
AWS generative-AI domains, with Practice / Exam / timed Mock-exam modes and Google Sign-In
for per-user progress.

Live: https://ghaliba3.github.io/GenAI/

## Files
- `index.html`, `styles.css`, `app.js` — the app (no build step)
- `data/questions.json` — the 300 questions (assembled from `data/batches/*.json`)

## Run locally
```
python3 -m http.server 8077
# open http://127.0.0.1:8077/
```

## Enabling Google Sign-In

Sign-in uses **Google Identity Services** entirely client-side — no backend. Progress is
saved per signed-in Google account (and a separate "guest" profile) in the browser's
localStorage. Until you add a Client ID, the app runs in guest mode and shows a small
"Sign-in not configured" hint.

### 1. Create an OAuth Client ID
1. Go to https://console.cloud.google.com/ → create/select a project.
2. **APIs & Services → OAuth consent screen** → configure (External, add your email as a
   test user). No restricted scopes are needed — sign-in only requests basic profile.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**.
4. Application type: **Web application**.
5. **Authorized JavaScript origins** — add the origins you'll serve from:
   - `https://ghaliba3.github.io`
   - `http://localhost:8077` and `http://127.0.0.1:8077` (for local testing)
   - (No redirect URI is required for the GIS button/ID-token flow.)
6. Copy the generated **Client ID** (looks like `1234567890-abc123.apps.googleusercontent.com`).

### 2. Add it to the app
In `app.js`, set:
```js
const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
```
Commit and push. The Google button appears automatically once a valid ID is present.

### Notes / limits
- This is **client-side identity only** — it personalizes the app and namespaces saved
  progress per account. It is **not** a secure auth boundary and does not gate content on a
  server (none exists). Progress is stored locally per browser, not synced across devices.
- The `https://ghaliba3.github.io` origin must be authorized or Google will block the button.
