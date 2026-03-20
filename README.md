# Bucks2Bar

Bucks2Bar is a lightweight personal finance tracker built with plain HTML and vanilla JavaScript. It lets you enter monthly income and expense values in a table and view them instantly in a bar chart.

## Features

- Monthly data entry for income and expense across Jan-Dec
- Real-time chart updates as you type in the Data tab
- Tabbed interface for switching between Data and Chart views
- PNG chart export using the Download button
- Username input with built-in validation rules:
  - Minimum 5 characters
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character

## Tech Stack

- HTML5
- Vanilla JavaScript (ES6+)
- Bootstrap 5.3.3 (CDN)
- Chart.js 4.4.2 (CDN)

## Project Structure

- `index.html`: App UI, Bootstrap layout, monthly input table, chart canvas
- `script.js`: Input parsing, chart initialization/sync, download handling

## How It Works

- `DOMContentLoaded` initializes the app.
- `initializeChart()` creates one Chart.js bar chart instance.
- `setupInputListeners(chart)` attaches `input` event listeners to all monthly fields.
- `syncChart(chart)` reads current values from inputs and updates chart datasets.
- `setupDownloadButton()` exports the chart canvas to `income-expense-chart.png`.

## Run Locally

No build step is required.

1. Open `index.html` directly in a browser.
2. Enter values in the Data tab.
3. Switch to Chart to view updates.
4. Click Download to export the current chart as PNG.

## Notes

- The app is static and framework-free.
- Form inputs are the source of truth; values are read directly from the DOM.
- Defensive checks prevent runtime errors if chart elements or libraries are missing.
