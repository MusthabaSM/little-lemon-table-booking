# Little Lemon Restaurant — Meta Front-End Capstone

A responsive table reservation web application for **Little Lemon**, a family-owned Mediterranean restaurant in Chicago, built in adherence to the **Meta Front-End Developer Capstone** specifications.

---

## Quick Start (How to Run Locally)

Follow these steps to run the application and test suite locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MusthabaSM/little-lemon-table-booking.git
   cd little-lemon-table-booking
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run automated unit tests:**
   ```bash
   npm test
   ```
   Runs 23 tests verifying form validation, reducer state transitions, and API utilities.

5. **Run linter and build:**
   ```bash
   npm run lint   # Code quality check (0 warnings, 0 errors)
   npm run build  # Compiles production bundle into dist/
   ```

---

## Peer Review Evaluation Rubric

This section maps directly to the Meta Front-End Capstone peer review criteria:

| Rubric Question | Implementation Details | File References |
| :--- | :--- | :--- |
| **1. UX / UI Design & Implementation** | Adheres to official Little Lemon brand specifications: primary lemon green (`#495E57`), lemon yellow (`#F4CE14`), peach accents, **Markazi Text** for serif headings, and **Karla** for interface/body text. Features a hero banner, weekly specials, customer testimonials, and founder story. | `src/index.css`<br>`src/components/Hero.jsx`<br>`src/components/Specials.jsx` |
| **2. Accessibility (a11y)** | WCAG 2.1 compliant. Includes `<a href="#main-content" class="skip-link">`, explicit `<label for="...">` associations, `aria-required`, `aria-invalid`, `aria-describedby` error announcements, `role="alert"` live regions, and full keyboard navigation. | `src/components/BookingForm.jsx`<br>`src/components/FormField.jsx`<br>`src/components/Header.jsx` |
| **3. Unit Tests** | 23 passing tests covering component rendering, field labels, HTML5 validation attributes, JS validation functions, `initializeTimes`, `updateTimes` reducer transitions, and simulated submission. | `src/tests/BookingForm.test.jsx`<br>`src/tests/bookingUtils.test.js` |
| **4. Functional Booking Form & Validation** | Dynamic date selection triggers `updateTimes` to refresh available slots. Implements dual-layer validation (HTML5 attributes + JS validation) with instant inline error alerts and summary banner. | `src/components/BookingForm.jsx`<br>`src/utils/validation.js`<br>`src/utils/bookingUtils.js` |
| **5. Semantics & Responsiveness** | Built entirely with semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<footer>`). Responsive across mobile (320px+), tablet, and desktop viewports using CSS Grid and Flexbox. | `src/App.jsx`<br>`src/index.css`<br>`index.html` |
| **6. Git Repository & Commits** | Structured with progressive, conventional commit history across each development milestone (scaffolding, styling, UI components, booking logic, tests, and CI/CD). | Git commit history |
| **7. Code Structure & Maintainability** | Clean modular architecture separating components, constants, utility functions, and test files. Comprehensive JSDoc docstrings and descriptive naming throughout. | `src/components/`<br>`src/utils/`<br>`src/constants/` |
| **8. Edge Cases & Error Handling** | Prevents selecting past dates, clamps guest range (1–10), validates email syntax, handles API submission failures with accessible error banners, and falls back to default times if no slots are available. | `src/utils/bookingUtils.js`<br>`src/utils/validation.js` |
| **9. Documentation & Setup** | Clear setup instructions, project directory structure, test commands, and deployment guidance provided. | `README.md` |

---

## Project Structure

```
little-lemon-table-booking/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD deployment workflow
├── public/
│   ├── favicon.svg               # Little Lemon brand favicon
│   ├── icons.svg                 # SVG sprite sheet
│   └── images/                   # Optimized food & restaurant photography
├── src/
│   ├── components/
│   │   ├── About.jsx             # Little Lemon founders story (Mario & Adrian)
│   │   ├── BookingForm.jsx       # Table reservation form with dual validation
│   │   ├── BookingSection.jsx    # useReducer container for booking state
│   │   ├── ConfirmedBooking.jsx  # Confirmation receipt with booking ID
│   │   ├── Footer.jsx            # Footer navigation, contact info, and hours
│   │   ├── FormField.jsx         # Accessible form field wrapper (a11y)
│   │   ├── Header.jsx            # Responsive navigation & mobile menu drawer
│   │   ├── Hero.jsx              # Hero banner with reservation CTA
│   │   ├── NotificationModal.jsx # Accessible modal dialog for notices
│   │   ├── Specials.jsx          # Weekly dish specials with delivery tags
│   │   └── Testimonials.jsx      # Customer review cards with star ratings
│   ├── constants/
│   │   ├── occasions.js          # Dining times, occasions, and seating options
│   │   └── restaurantData.js     # Little Lemon menu specials, bio, and reviews
│   ├── tests/
│   │   ├── BookingForm.test.jsx  # Tests for form rendering & validation
│   │   └── bookingUtils.test.js  # Tests for reducer & API time functions
│   ├── utils/
│   │   ├── bookingUtils.js       # fetchAPI, submitAPI, initializeTimes, updateTimes
│   │   └── validation.js         # Input validation functions & patterns
│   ├── App.jsx                   # Main layout and coordinator
│   ├── index.css                 # Complete Little Lemon responsive stylesheet
│   ├── main.jsx                  # React application entrypoint
│   └── setupTests.js             # Vitest test environment configuration
├── index.html                    # HTML5 entrypoint with Google Fonts & SEO meta
├── package.json                  # Dependencies and npm scripts
└── vite.config.js                # Vite, base path, and Vitest configuration
```

---

## Live Deployment (GitHub Pages)

This repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml` that automatically tests, lints, builds, and publishes to **GitHub Pages** on every push to `main`.

To enable GitHub Pages:
1. Go to repository **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. The deployed site will be available at:
[Live Demo](https://musthabasm.github.io/little-lemon-table-booking/)
