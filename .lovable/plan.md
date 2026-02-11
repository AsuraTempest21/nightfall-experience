

## Fix: Home Page Reserve Section Cropped on Mobile

### Problem
The "Reserve on Zomato," "Call Now," and "Instagram" buttons in the Location/CTA section at the bottom of the Home page are getting cropped on mobile. The page also has unwanted horizontal scrolling which shifts content off-screen.

### Root Cause
The horizontal scroll is caused by elements elsewhere on the page (likely the map iframe, gallery grid, or hero section) that exceed the viewport width. This creates a wider-than-screen page, making the CTA buttons appear cropped or shifted.

### Fix (3 changes in `src/pages/Index.tsx`)

1. **Add `overflow-x-hidden` to the `<main>` wrapper** -- This kills all horizontal scrolling at the page level without clipping vertical content or individual sections.

2. **Constrain the map iframe container** -- Add `max-w-full` to the map wrapper to ensure it never exceeds the screen width on mobile.

3. **Add `px-4` explicit mobile padding to the CTA column** -- Ensure the buttons column has its own safe padding so content never touches or exceeds screen edges, regardless of the container's behavior.

### Technical Details

- Line 29: Change `<main className="pb-16 md:pb-0">` to `<main className="pb-16 md:pb-0 overflow-x-hidden">`
- Line 185: Add `max-w-full` to the map div
- Line 209: Add `px-1` to the buttons wrapper div to give a tiny extra safety margin

These are minimal, targeted changes that address the root cause (page-level horizontal overflow) rather than symptoms.
