# 🎬 CineScore — Interactive Movie Discovery & Rating SPA

**CineScore** is an interactive, single-page web application that lets film enthusiasts search, discover, rate, and manage custom watchlists using live data from the OMDB API.

---

## ✨ Features

* **🔍 Real-Time Search & API Integration:** Asynchronous search powered by Axios and OMDB API with dynamic result rendering.
* **⭐ Watchlist & Ratings:** Interactive star rating components with local storage persistence to save user preferences across sessions.
* **📊 Viewing Statistics Header:** Live computation of total watch time, average user ratings, and genre distributions across watchlists.
* **🌐 Country Flags & Details:** Country lookup integration using `country-code-lookup` and `react-country-flag` for enhanced movie metadata display.
* **⚡ Modern TypeScript Architecture:** Built with React 19, TypeScript, and strict linting (Oxlint and Stylelint).

---

## 🛠️ Tech Stack

* **Framework:** React 19, TypeScript, Vite
* **HTTP Client:** Axioss
* **UI Utilities:** `country-code-lookup`, `react-country-flag`
* **Code Quality:** Oxlint, Stylelint

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/benyamin-sf/cine-score.git
   cd cine-score
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory:

   ```env
   VITE_OMDB_URL="http://www.omdbapi.com"
   VITE_OMDB_KEY=your_omdb_api_key
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```
