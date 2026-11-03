# Portfolio

One-page portfolio site for a fictional web developer — a team project from the
[GoIT](https://goit.global) Fullstack course (JavaScript module, March 2025),
built in Scrum sprints.

**Live demo:** [zoiapzp.github.io/js-project](https://zoiapzp.github.io/js-project/)

## Sections

Header · Hero · About me · Benefits · Projects · FAQ · Covers · Reviews · "Let's work together"
(contact form in the footer).

## Features

- **Swiper carousels** for skills, projects and reviews, with buttons and keyboard control
- **Accordions** ([accordion-js](https://github.com/michu2k/Accordion)) for About me and FAQ
- **Reviews from an API** (`portfolio-js.b.goit.study`) with a saved fallback: if the API does not
  respond, the site shows a local copy of the reviews and avatars (`src/data/reviews.json`)
- **Contact form** sends the request to the API and shows a thank-you modal; if the service is
  unavailable, it shows a clear message and keeps what the user typed

## Tech stack

- HTML partials (`vite-plugin-html-inject`), SCSS with BEM blocks, vanilla JavaScript (ES modules)
- [Swiper](https://swiperjs.com), [accordion-js](https://github.com/michu2k/Accordion), [axios](https://axios-http.com)
- [Vite](https://vitejs.dev) for development and build, deployed to GitHub Pages

## My part

I built the **FAQ section** (`src/partials/faq.html`, `src/scss/blocks/_faq.scss`, `src/js/faq.js`):
markup, styles and the accordion behaviour. In my fork I later added the API fallback for reviews
and the "service unavailable" handling for the contact form.

## Team

Built by a team of 7 developers working in Git branches with pull requests and code review.
Team lead: [Jaelouss](https://github.com/Jaelouss).
Original repository: [Jaelouss/js-project](https://github.com/Jaelouss/js-project).

## Run locally

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```
