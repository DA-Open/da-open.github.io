# DA-Open — DAClaw landing page

The official GitHub Pages site for **DAClaw — a steerable data agent and a
full-stack data-agent research platform**.

It is a zero-build static site (plain HTML/CSS/JS), so GitHub Pages can serve the
repository root directly — no Jekyll, no bundler, no CI step.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page markup and content |
| `styles.css` | Full design system (warm-ivory / vermilion / ink-green / acid-lime editorial theme) |
| `script.js` | Scroll progress, reveal-on-scroll, mobile nav, product-screen tabs, video wiring |
| `site-config.js` | Single place to plug in the demo video |
| `assets/` | Favicon, video poster, and real DAClaw product screenshots |

## Add the demo video

The homepage reserves a full-width cinematic stage for the product film. Until a
video is supplied it shows an animated placeholder.

1. Put the video in the repo, e.g. `assets/daclaw-demo.mp4`, **or** use a CDN / Git LFS URL.
2. Set it in `site-config.js`:

   ```js
   window.DACLAW_SITE = {
     videoSrc: "assets/daclaw-demo.mp4",
   };
   ```

The placeholder is then replaced by a real `<video>` player automatically.

Recommended format: 16:9 MP4, 1080p, H.264. Keep large files on a CDN or Git LFS —
GitHub rejects files over 100 MB.

## Local preview

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

## Deploy on GitHub Pages

1. Push to the `main` branch of `DA-Open/da-open.github.io`.
2. In the repo: **Settings → Pages → Build and deployment**.
3. Source: **Deploy from a branch**, Branch: **`main`** / **`/ (root)`**, then **Save**.
4. The site publishes at <https://da-open.github.io>.

## Credits

Steerable data intelligence by [DA-Open](https://github.com/DA-Open).
Product: [DAClaw](https://github.com/DA-Open/DAClaw).
