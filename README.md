# 🎨 Virtual Art Gallery

A digital gallery for browsing mythological, marine, street, traditional, and
modern artworks — built with plain HTML, CSS, and JavaScript, no framework
or build step required.

## Running it

Open `index.html` directly, or serve the folder with any static host
(Vercel, GitHub Pages, Netlify, etc.).

## Features

- Masonry gallery wall — each piece keeps its true aspect ratio instead of
  being cropped into a uniform square, like frames of different sizes
  actually hung on a wall
- Category filtering (mythological, traditional, marine, street, modern)
  with a visible active state
- Full-screen lightbox with previous/next navigation, keyboard support
  (←/→ to browse, Esc to close), and click-outside-to-close
- Lazy-loaded, size-optimized images (see below)
- Responsive from mobile to desktop; visible keyboard focus throughout

## Image pipeline

The source photos in this repo were originally 1.5–8.5MB each (~40MB
total) — far too heavy for a web page. Two optimized sets are generated
from them:

- `images/grid/` — capped at 700px on the long edge, used in the gallery
  grid (~50–75KB each)
- `images/full/` — capped at 1500px on the long edge, used in the
  lightbox (~280–400KB each)

Total page weight dropped from ~40MB to ~3.2MB. If you add new artwork,
resize new images the same way before committing them — don't drop
full-resolution camera/scan files straight into the repo.

## Adding a new piece

Add an entry to the `artworks` array in `script.js`:

```js
{
  title: "...",
  artist: "...",
  description: "...",
  category: "mythological", // or traditional, marine, street, modern
  image: "images/grid/artN.jpg",
  full: "images/full/artN.jpg"
}
```
