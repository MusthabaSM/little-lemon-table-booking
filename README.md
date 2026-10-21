# Little Lemon Restaurant — Meta Front-End Developer Capstone

A responsive table reservation web application for **Little Lemon**, a family-owned Mediterranean restaurant based in Chicago, developed in adherence to the **Meta Front-End Developer Professional Certificate Capstone** specifications.

---

## Features

- **Semantic HTML & WCAG Accessibility**: Full semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<footer>`), custom skip-links, ARIA live regions for form validation alerts, proper labels (`aria-label`, `aria-describedby`, `aria-required`), and full keyboard navigation.
- **Dynamic Table Booking Engine**:
  - `useReducer` managing available dining slots for any selected date (`initializeTimes`, `updateTimes`).
  - Seeded pseudo-random slot generator (`fetchAPI`) compliant with Capstone guidelines.
  - Interactive table settings (Standard, Booth, Outdoor Patio) and Occasions (Birthday, Anniversary, Engagement).
  - Simulated reservation submission (`submitAPI`) with simulated network delay and local storage persistence.
- **Robust Client-Side Validation**:
  - Dual-layer validation: HTML5 constraint validation (`required`, `min`, `max`, `type`, `pattern`) combined with custom JavaScript validation functions.
  - Live feedback upon input blur and comprehensive accessible error summary banners upon submission attempts.
- **Visual Design & Typography**:
  - Official Little Lemon typography featuring **Markazi Text** for headings and **Karla** for interface/body text.
  - Authentic Little Lemon color system (Primary Lemon Green `#495E57`, Primary Lemon Yellow `#F4CE14`, Salmon `#EE9972`, Peach `#FBDABB`).
  - Responsive layouts from mobile screens up to desktop viewports.
- **Automated Test Suite**:
  - 100% passing Vitest test suite with React Testing Library verifying static text, HTML5 attributes, JavaScript validation functions, reducer state transitions, and form submission flows.

---

## Project Structure

```
Meta_Capstone/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── images/
│       ├── bruschetta.jpg
│       ├── greek-salad.jpg
│       ├── hero-platter.jpg
│       ├── lemon-dessert.jpg
│       └── mario-adrian.jpg
├── src/
│   ├── components/
│   │   ├── About.jsx             # Story of founders Mario & Adrian
│   │   ├── BookingForm.jsx       # Reservation form with validation
│   │   ├── BookingSection.jsx    # Booking state manager & reducer container
│   │   ├── ConfirmedBooking.jsx  # Confirmation receipt with booking ID
│   │   ├── Footer.jsx            # Navigation, contact details, hours, social links
│   │   ├── FormField.jsx         # Accessible reusable form field wrapper
│   │   ├── Header.jsx            # Responsive navigation bar & mobile drawer
│   │   ├── Hero.jsx              # Hero banner with CTA to reservation section
│   │   ├── NotificationModal.jsx # Modal dialog for online menu & order notices
│   │   ├── Specials.jsx          # Weekly dish specials with delivery badges
│   │   └── Testimonials.jsx      # Customer review cards with star ratings
│   ├── constants/
│   │   ├── occasions.js          # Dining slots, occasions, and seating options
│   │   └── restaurantData.js     # Little Lemon menu specials, bio, and reviews
│   ├── tests/
│   │   ├── BookingForm.test.jsx  # Vitest component & form validation tests
│   │   └── bookingUtils.test.js  # Vitest reducer, time & API unit tests
│   ├── utils/
│   │   ├── bookingUtils.js       # fetchAPI, submitAPI, initializeTimes, updateTimes
│   │   └── validation.js         # Date, guest count, email, and name validators
│   ├── App.jsx                   # Application layout and section coordinator
│   ├── index.css                 # Little Lemon design system and CSS stylesheet
│   ├── main.jsx                  # React 19 application entrypoint
│   └── setupTests.js             # Vitest test setup with @testing-library/jest-dom
├── index.html                    # SEO meta tags, Google Fonts, and root mount
├── package.json
└── vite.config.js                # Vite + React + Vitest test runner configuration
```

---

## Available Scripts

In the project root, run:

### `npm run dev`
Starts the local development server with Hot Module Replacement (HMR).

### `npm test`
Runs the Vitest test suite testing reducer functions, time calculations, form rendering, HTML5 validation attributes, and user interaction.

### `npm run lint`
Runs Oxlint across the repository to verify code quality with zero warnings or errors.

### `npm run build`
Compiles and bundles the production-optimized client assets into the `dist/` directory.

### `npm run preview`
Locally previews the production build.

---

## Deployment & GitHub Actions

This repository includes a production-ready CI/CD workflow (`.github/workflows/deploy.yml`) that automatically tests, lints, builds, and deploys the application to **GitHub Pages** on every push.

### Setting Up GitHub Pages:
1. Push this repository to your GitHub account:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Navigate to your repository on GitHub: **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. The workflow will automatically run and publish your site at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## Meta Capstone Peer Review Verification Checklist

| Rubric Checkpoint | Implementation & File Location | Verification Command |
| :--- | :--- | :--- |
| **Semantic HTML & WCAG Accessibility** | Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<fieldset>`, `<footer>`) with ARIA attributes and focus management in [Header.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/Header.jsx), [BookingForm.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/BookingForm.jsx), and [FormField.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/FormField.jsx). | Audited for WCAG 2.1 compliance |
| **Responsive UI & Design System** | Official Little Lemon palette (`#495E57`, `#F4CE14`), Markazi Text headings, Karla body font, responsive mobile-first grid in [index.css](file:///c:/Users/lenovo/Meta_Capstone/src/index.css). | Tested across mobile, tablet, and desktop viewports |
| **State Management with `useReducer`** | `initializeTimes` and `updateTimes` reducer functions managing dynamic booking slots in [bookingUtils.js](file:///c:/Users/lenovo/Meta_Capstone/src/utils/bookingUtils.js) wired to `useReducer` in [BookingSection.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/BookingSection.jsx). | Tested via [bookingUtils.test.js](file:///c:/Users/lenovo/Meta_Capstone/src/tests/bookingUtils.test.js) |
| **Seeded Random API Simulation** | `fetchAPI` slot generation with `seededRandom` and deterministic `getDateSeed`, plus simulated `submitAPI` with latency and storage in [bookingUtils.js](file:///c:/Users/lenovo/Meta_Capstone/src/utils/bookingUtils.js). | Tested via [bookingUtils.test.js](file:///c:/Users/lenovo/Meta_Capstone/src/tests/bookingUtils.test.js) |
| **Dual-Layer Form Validation** | HTML5 attributes (`required`, `min`, `max`, `type`, `pattern`) combined with custom JavaScript validation functions in [validation.js](file:///c:/Users/lenovo/Meta_Capstone/src/utils/validation.js) and [BookingForm.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/BookingForm.jsx). | Tested via [BookingForm.test.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/tests/BookingForm.test.jsx) |
| **Booking Confirmation** | Confirmed reservation receipt displaying unique confirmation ID, summary, and reset action in [ConfirmedBooking.jsx](file:///c:/Users/lenovo/Meta_Capstone/src/components/ConfirmedBooking.jsx). | Interactive UI confirmation flow |
| **Unit Test Coverage** | 23 passing Vitest tests covering static text, HTML5 attributes, JS validation, reducer transitions, and submission in [tests/](file:///c:/Users/lenovo/Meta_Capstone/src/tests/). | `npm test` (23 passed) |
| **Code Quality & Build** | 0 Oxlint warnings or errors; production build bundle generated with zero warnings in [dist/](file:///c:/Users/lenovo/Meta_Capstone/dist/). | `npm run lint` & `npm run build` |
