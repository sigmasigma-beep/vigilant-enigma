# Electro's UV

Static front end (Firebase Hosting) + a small Wisp server (anywhere with WebSockets).

## 1. Backend (Wisp server)
Firebase Hosting can't run this, so host `server/` elsewhere. On Render:
1. Push this folder to GitHub.
2. New > Web Service, root directory `server`, build `npm install`, start `npm start`.
3. Your address will be like `wss://your-app.onrender.com/wisp/`  (keep the trailing slash).

## 2. Front end
1. Open `public/index.html` and set `WISP` near the top of the script to your `wss://.../wisp/` address.
2. Optional: put a `favicon.png` in `public/assets/`.
3. In this folder run:
   ```
   npm install
   npm run setup        # copies UV, BareMux and Epoxy into public/ and writes uv.config.js
   npm install -g firebase-tools
   firebase login
   firebase init hosting   # use existing "public" folder, do NOT overwrite index.html, single-page app: No
   firebase deploy --only hosting
   ```
   After the first time, `npm run deploy` does setup + deploy.

## Troubleshooting
- "Ultraviolet files are missing": you skipped `npm run setup`.
- Pages hang or fail to load: check the `WISP` address and that the Wisp server is awake (free hosts sleep).
- Changes not showing: unregister the service worker in DevTools > Application, then hard refresh.
- If `npm install` complains about a version, remove the version numbers in package.json and use `latest`.
