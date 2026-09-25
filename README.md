# Athiya Deviyani — personal site (plain HTML version)

This replaces the old al-folio Jekyll site. There is no build step, no Ruby,
no GitHub Actions workflow, and nothing to break. It is just HTML, CSS, and
a tiny bit of JS, served as-is.

## Structure

```
newsite/
├── index.html           ← about + news
├── publications.html    ← all papers, posters, and projects
├── teaching.html
├── cv.html               ← downloadable CV + inline preview
├── 404.html
└── assets/
    ├── css/style.css    ← all site styling, one file
    ├── js/main.js       ← nav highlighting + footer year, ~15 lines
    ├── img/             ← profile photo, etc.
    └── papers/          ← your PDFs (papers, posters, CV)
```

Each page is a complete, standalone HTML file. There's no templating
engine, so the header/nav is repeated at the top of each page — if you
want to change the nav links, you'll do a find-and-replace across the
HTML files (ask me and I can do this for you in seconds any time).

## How to update things

- **Add a paper**: drop the PDF into `assets/papers/`, then copy one
  `<li class="pub-item">...</li>` block in `publications.html` and edit
  the title/authors/links.
- **Add a news item**: copy one `<li>` block in the timeline in
  `index.html` and edit the date and text.
- **Update your bio**: edit the `<div class="bio">` paragraphs in
  `index.html` directly.
- **Swap your CV**: replace `assets/papers/AthiyaDeviyani_CV_Academic.pdf`
  with a new file of the same name (or update the filename in `cv.html`).
- **Change colors/fonts**: everything lives in `assets/css/style.css` at
  the top, under `:root`. Change the hex values there and the whole site
  updates.

No Markdown front-matter, no `_config.yml`, no Liquid syntax to learn.

## Hosting on GitHub Pages without any Actions pipeline

This is the important part — you can serve plain HTML from GitHub Pages
with **zero workflow files** (no `.github/workflows/`, no build, nothing
that can fail):

1. Push these files to the root of your `<username>.github.io` repo
   (replacing everything that's there now, except maybe keep your
   `LICENSE` and `README.md` if you'd like).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to **"Deploy from a
   branch"** (NOT "GitHub Actions").
4. Set the branch to `main` (or whichever branch you push to) and the
   folder to `/ (root)`.
5. Save. GitHub will serve the files directly — no build, no Actions run,
   no YAML to debug. Pushing a commit to that branch updates the live
   site within a minute or two.

If you ever see a leftover `.github/workflows/` folder from the old
template, you can delete it — it has nothing to do with this version of
the site and is most likely the source of the errors you were seeing.

## Local preview

Just double-click `index.html` to open it in a browser — no server
needed for casual browsing. If links seem off when opening via
`file://`, you can instead run, from inside the `newsite/` folder:

```
python3 -m http.server 8000
```

and visit `http://localhost:8000` in your browser.
