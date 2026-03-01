# AGENTS.md - Agentic Coding Guidelines

## Project Overview

This is a **static website** (HTML/CSS/JS) deployed to GitHub Pages. It is a personal portfolio/landing page with interactive features including image galleries, zodiac constellation display, and media playback.

- **Project type**: Vanilla JavaScript website (no framework)
- **Deployment**: GitHub Pages (`fibonacciyys.github.io`)
- **Entry point**: `index.html`

---

## Build / Lint / Test Commands

This project does **not** use any build tools, package managers, or test frameworks.

### Running the Site

Since this is a static website, you can simply open `index.html` in a browser, or serve it locally:

```bash
# Using Python (Python 3)
python -m http.server 8000

# Using PHP
php -S localhost:8000

# Using npx (if available)
npx serve .
```

Then visit `http://localhost:8000`

### Linting

No JavaScript linting is configured. If you wish to add linting:

```bash
# Install ESLint
npm init -y
npm install eslint --save-dev

# Run ESLint
npx eslint js/**/*.js
```

### Testing

No test framework is configured. For this static site, manual testing in browser is recommended.

---

## Code Style Guidelines

### General Principles

- This is a **vanilla JavaScript (ES5-era)** codebase
- No TypeScript, no React, no modern frameworks
- Keep changes minimal and consistent with existing style

### JavaScript Conventions

1. **Use `'use strict';`** at the top of JavaScript files
2. **Variable declarations**: Use `var` (existing codebase uses ES5 style)
3. **Functions**: Use function declarations (`function name() {}`)
4. **DOM ready**: Place initialization code in script tags at end of body, or use `window.onload`
5. **Event handling**: Use `element.onclick = function() {}` style (not `addEventListener`)

### Naming Conventions

- **Functions**: `camelCase` (e.g., `AddBigButtonEvent`, `hasClass`)
- **Variables**: `camelCase` (e.g., `bigb_d`, `small_div`)
- **CSS classes**: `snake_case` or `kebab-case` (e.g., `big_b_div`, `bechange`)
- **IDs**: `camelCase` or `snake_case` (e.g., `big_b`, `change-part`)

### HTML Structure

- Use semantic HTML where possible
- Keep IDs and classes consistent with existing patterns
- Chinese text is used in UI elements (e.g., "全部查看原图", "星座图")

### CSS

- CSS files: `css/style.css`, `css/css1.css`
- Use existing class naming patterns
- Keep styles in CSS files rather than inline

### Error Handling

- Use `alert()` for user-facing errors (consistent with existing code)
- Use `console.log()` for debugging
- No `try/catch` blocks currently used

### jQuery

- jQuery is included (`js/jquery.min.js`)
- Some navigation code uses jQuery (`js/jquery-nav.js`)
- Main interactivity uses vanilla JavaScript

---

## File Structure

```
fibonacciyys.github.io/
├── index.html          # Main entry point
├── css/
│   ├── style.css       # Main styles
│   └── css1.css        # Additional styles
├── js/
│   ├── app.js          # Particle.js config
│   ├── interact.js    # Main interactivity (user code)
│   ├── jquery.min.js  # jQuery library
│   ├── jquery-nav.js  # Navigation (jQuery)
│   └── particles.js   # Particle effect library
└── static/             # Static assets (images, videos, audio)
    ├── py/             # Text files
    ├── py_img/        # Images
    ├── 51/            # Image gallery
    ├── yy/            # Image gallery
    ├── aimer/         # Image gallery
    ├── LAST_STARDUST.mp4
    └── 六等星.mp3
```

---

## Adding New Features

1. **New JavaScript**: Add to `js/interact.js` or create new file
2. **New CSS**: Add to `css/style.css` or `css/css1.css`
3. **New pages**: Create in root or `static/` directory
4. **Testing**: Test manually in browser after changes

---

## Notes for Agents

- This is a simple, mature project - avoid over-engineering
- Do not add build tools (Webpack, Vite, etc.) unless explicitly requested
- Do not add TypeScript, React, or other frameworks
- Maintain the existing Chinese/English mixed UI style
- When in doubt, match the existing code patterns exactly
