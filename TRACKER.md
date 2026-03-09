# TRACKER.md

Track new features, bugs, and problems for the AzeroTech project.

**Status labels:** `Todo` · `In Progress` · `Done` · `Blocked`

---

## Features

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| — | — | — | — |

---

## Future Features

> Items sourced from `Azerotech.md` spec and additional suggestions. Use this table to plan upcoming work.

| # | Feature | Source | Description | Priority |
|---|---------|--------|-------------|----------|
| 1 | Backend / Database integration | Spec | Wire up appointment booking and accessory reservations to Vercel Postgres via Next.js API routes. Currently all forms use local state only. | High |
| 2 | Repair Status Checker | Spec | Page where customers enter their phone number or repair receipt number and see their repair stage: Device Received → Waiting for Parts → Fixing → Ready for Pickup. | High |
| 3 | Disable/hide booked time slots | Spec | Pull booked appointment slots from DB and mark them as unavailable in the booking form so customers can't double-book. | High |
| 5 | Admin dashboard | Spec | Internal page (password-protected) for the shop owner to view, manage, and update appointments and reservations. | Medium |
| 6 | Repair tracking panel for staff | Spec | Staff-facing UI to update repair status stages so customers see live progress via the Repair Status Checker. | Medium |
| 7 | Inventory management | Spec | Admin UI to add, edit, and remove accessory products and manage stock counts. | Medium |
| 8 | Customer repair history | Spec | Allow returning customers to look up past repairs by phone number. | Low |
| 9 | Multi-branch management | Spec | Support for a second shop location — add it to the map embed and let customers choose a branch when booking. | Low |
| 11 | FAQ section | Suggestion | Collapsible FAQ on the Services or Home page answering common questions (repair time, warranty, price range). Reduces repetitive customer messages. | Medium |
| 12 | Customer reviews / testimonials | Suggestion | Static or dynamic testimonials section on the homepage to build trust with new visitors. | Medium |
| 13 | Print / save appointment confirmation | Suggestion | After a successful booking, let customers download or print a simple confirmation slip with their booking details. | Medium |
| 14 | Custom 404 error page | Suggestion | Branded not-found page matching the site design instead of the default Next.js error page. | Low |
| 15 | SEO & Open Graph setup | Suggestion | Add page-level `<title>`, `<meta description>`, and Open Graph tags so the site looks good when shared on social media and ranks better in search. | Medium |
| 16 | Skeleton loaders for accessories | Suggestion | Show animated placeholder cards while accessory product data loads instead of a blank grid. | Low |
| 17 | Appointment number generation | Suggestion | Generate a unique appointment ID (format: `AZT-YYYYMMDD-XXXX`) when a booking is submitted. Display it on the confirmation screen so customers can show it at the shop. Admin dashboard will use it to look up and validate bookings. | High |

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
