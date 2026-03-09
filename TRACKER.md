# TRACKER.md

Track new features, bugs, and problems for the AzeroTech project.

**Status labels:** `Todo` · `In Progress` · `Done` · `Blocked`

---

## Completed Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | Backend / Database integration | Replaced all `localStorage` usage with MongoDB Atlas. Appointments and reservations are saved via Next.js API routes (`/api/appointments`, `/api/reservations`) and persisted in the cloud database. |
| 2 | Admin dashboard | Password-protected internal page (`/admin`) for the shop owner to view and manage appointments and reservations. Includes status dropdowns (Pending → Confirmed → Completed → Cancelled) and a live refresh button. |
| 3 | Inventory management | Admin Inventory tab showing all products with live stock counts. Supports +/− buttons, manual input, and quick-set shortcuts (5 / 10 / 20). Stock updates are saved to MongoDB via `PATCH /api/products/[id]`. |
| 4 | Out-of-stock display | Accessories page reads `stock` from MongoDB. Products with 0 stock show a greyscale image with an "Out of Stock" overlay and a disabled Reserve button. |
| 5 | Product list connected to MongoDB | Accessories product grid is fetched from `/api/products` (MongoDB) instead of a hardcoded array. Categories are derived dynamically from the database. Includes animated skeleton loaders while fetching. |
| 6 | Skeleton loaders for accessories | Animated placeholder cards shown while product data loads from the database instead of a blank grid. |

---

## Upcoming Features

| # | Feature | Source | Description | Priority |
|---|---------|--------|-------------|----------|
| 1 | Repair Status Checker | Spec | Page where customers enter their phone number or repair receipt number and see their repair stage: Device Received → Waiting for Parts → Fixing → Ready for Pickup. | High |
| 2 | Disable/hide booked time slots | Spec | Pull booked appointment slots from DB and mark them as unavailable in the booking form so customers can't double-book. | High |
| 3 | Appointment number generation | Suggestion | Generate a unique appointment ID (format: `AZT-YYYYMMDD-XXXX`) when a booking is submitted. Display it on the confirmation screen so customers can show it at the shop. Admin dashboard will use it to look up and validate bookings. | High |
| 4 | Repair tracking panel for staff | Spec | Staff-facing UI to update repair status stages so customers see live progress via the Repair Status Checker. | Medium |
| 5 | Customer repair history | Spec | Allow returning customers to look up past repairs by phone number. | Low |
| 6 | Multi-branch management | Spec | Support for a second shop location — add it to the map embed and let customers choose a branch when booking. | Low |
| 7 | FAQ section | Suggestion | Collapsible FAQ on the Services or Home page answering common questions (repair time, warranty, price range). Reduces repetitive customer messages. | Medium |
| 8 | Customer reviews / testimonials | Suggestion | Static or dynamic testimonials section on the homepage to build trust with new visitors. | Medium |
| 9 | Print / save appointment confirmation | Suggestion | After a successful booking, let customers download or print a simple confirmation slip with their booking details. | Medium |
| 10 | Custom 404 error page | Suggestion | Branded not-found page matching the site design instead of the default Next.js error page. | Low |
| 11 | SEO & Open Graph setup | Suggestion | Add page-level `<title>`, `<meta description>`, and Open Graph tags so the site looks good when shared on social media and ranks better in search. | Medium |

---

## Bugs

| # | Bug | Description | Status |
|---|-----|-------------|--------|
| 1 | Header nav text invisible on scroll | Nav link text is black and becomes invisible against the dark background when the user scrolls down | `Todo` |
| 2 | Logo and title overlap on small screens | "AzeroTech" title text overlaps with the logo in portrait/small screen orientations due to insufficient spacing | `Todo` |

---

## Problems / Issues

| # | Problem | Description | Status |
|---|---------|-------------|--------|
| — | — | — | — |
