# Bucks2Bar Project Guidelines

Bucks2Bar is a lightweight personal financial tracking app. Users enter monthly income and expenses in a data table and visualize them in a real-time bar chart. No build tools or frameworks—pure HTML, vanilla JavaScript, and CDN-loaded libraries.

## Code Style

**JavaScript conventions:**

- Vanilla ES6+; no frameworks or build tools
- Camel case for functions and variables: `readMonthlyValues()`, `setupDownloadButton()`
- UPPERCASE for module-level constants: `MONTHS`, `MONTH_LABELS`
- Lowercase 3-letter keys for months: `jan`, `feb`, `mar`, etc.
- Query elements via data attributes when possible, not ID explosion:  
  `document.querySelectorAll('input[data-type][data-month]')`

**HTML conventions:**

- Semantic markup with Bootstrap 5.3.3 components
- All inputs must have `data-type` and `data-month` attributes for JS queries
- Include `aria-label` attributes for accessibility on all form inputs
- Month inputs follow pattern: `id="{type}-{month}"` (e.g., `income-jan`, `expense-dec`)

**Chart.js:**

- Single chart instance; update via `syncChart(chart)` on value changes
- Use responsive mode with `maintainAspectRatio: false` for Bootstrap `ratio-16x9` container
- Color scheme: Income (blue `rgba(13, 110, 253, ...)`) and Expense (red `rgba(220, 53, 69, ...)`)

## Architecture

**Single-page static app:**

- No build process; direct HTML file execution in browser
- External libraries via CDN with integrity hashes: Bootstrap, Chart.js
- All HTML in one file; JavaScript in `script.js`
- No separate config files, package.json, or node_modules

**Data flow:**

- Form inputs are the source of truth; no separate data model
- JavaScript reads input values on demand: `readMonthlyValues(type)`
- Chart syncs to inputs in real-time on every `input` event
- Download function reads canvas pixels via `canvas.toDataURL('image/png')`

**Entry point:**

- `DOMContentLoaded` event initializes chart, input listeners, and download button
- Functions are discrete, non-OOP: `initializeChart()`, `syncChart()`, `setupInputListeners()`, `setupDownloadButton()`

## Conventions

**Month handling:**

- Always use 3-letter lowercase keys (`jan`, `feb`, ..., `dec`) in code
- Use `MONTHS` constant array to iterate months consistently
- Use `MONTH_LABELS` for display text in chart/UI ("Jan", "Feb", etc.)
- Never hard-code month names; arrays ensure consistency

**Input-driven state:**

- No separate state object; read values directly from form `input.value`
- Helper: `toNumberOrZero(value)` safely parses input strings with fallback to 0
- Always validate element existence before reading: `if (!input) return 0`

**Real-time synchronization:**

- Chart updates on `input` event (not `change` or `blur`)
- Listeners attached once on page load, not per-month
- `syncChart(chart)` is the single source of truth for updates

**Defensive coding:**

- Check DOM elements exist before use: `if (!canvas)`
- Check libraries are loaded: `if (typeof Chart === 'undefined')`
- Return early on null/missing elements: `if (!chart) return`

**Accessibility:**

- Every input must have an `aria-label` describing the field
- Semantic HTML: `<table>`, `<thead>`, `<th scope="row">` for month labels
- Bootstrap classes handle responsive design; no media queries needed

## Testing & Development

**Manual browser testing:**

- Open `index.html` directly in browser (no build step needed)
- Test features: enter values in Data tab, confirm chart updates in real-time
- Test download: click "Download PNG" button, verify image exports
- Check responsive design by resizing browser window

**No automated build or test framework:**

- Linting: optional; follow code style conventions above
- Deployment: serve static asset folder (just HTML + JS)

## Key Files

- **index.html** — UI template, Bootstrap structure, all 12 month inputs
- **script.js** — All functionality: chart initialization, input sync, download handler
