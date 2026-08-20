# Bhoomi Plots - Real Estate Website

This repository contains the static implementation of the Bhoomi Plots & Land real estate website. It has been reorganized into a clean static folder structure in preparation for a future Next.js migration.

## Directory Structure

The current legacy/static implementation is contained entirely within the `static-site/` folder:

```
Bhoomi-Plot/
├── static-site/
│   ├── index.html                  # Main landing page
│   ├── pages/                      # All other HTML pages (about, contact, projects, etc.)
│   └── assets/                     # All static assets
│       ├── css/styles.css          # Global stylesheet
│       ├── js/script.js            # Interactivity scripts
│       ├── images/                 # Logo and images
│       └── videos/                 # Hero video and testimonial videos
```

## How to Run Locally

You can run the static website using any local web server. For example, using Python or npx:

### Using Python:
```bash
cd static-site
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Using Node (npx serve):
```bash
npx serve static-site
```
Then open `http://localhost:3000` in your browser.

## Next.js Migration

This static HTML implementation is preserved as the current source of truth. It is organized cleanly so it can serve as a reference before migrating components, routing, and styling to a React/Next.js environment.
