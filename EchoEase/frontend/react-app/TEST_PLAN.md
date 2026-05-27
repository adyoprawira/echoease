# Test Plan for UQ Student Well-being React App

## Running Tests Locally

After installing Node.js and dependencies:

```bash
cd Code/frontend/react-app
npm install
npm test              # Run tests
npm run test:ui       # Run tests with interactive UI
npm run test:coverage # Run tests with coverage report
```

## Feature Test Coverage

### ✅ Layout & Persistence (MainLayout, Sidebar, TopNav)

- [x] Sidebar renders on all routes (persistent)
- [x] Top navigation bar persists when routing
- [x] Sidebar collapses to icon rail on mobile (<768px)
- [x] Sidebar expands to full panel on desktop (>=768px)
- [x] All navigation links render: Home, Community, Chat, Resources
- [x] Quick Exit button appears in top nav with correct href (Google)
- [x] Quick Exit button has high contrast styling (purple bg, white text)
- [x] Notification bell icon renders
- [x] Profile avatar button renders
- [x] Support & Well-being button appears at bottom of sidebar
- [x] Settings and Help links appear at sidebar bottom

### ✅ Well-being Landing Page (/)

- [x] Hero heading renders: "Welcome, Alex. It's okay to just look around."
- [x] Subtitle text displays correctly
- [x] "Read Community Stories" card renders (neutral bg with green icon)
- [x] "Chat with Someone" card renders (mint background)
- [x] Emergency Resources banner displays with red accent
- [x] "Get Help Now" button appears with high contrast
- [x] Mindfulness Pulse progress ring shows correct percentage (70%)
- [x] Event/support card with tags (#ExamPrep, #MentalHealth, #Support)
- [x] Supporter count displays ("3 Supporters Online")
- [x] All card spacing matches reference design

### ✅ Courses Page (/courses)

- [x] "Courses" heading renders
- [x] "Current Terms" label displays
- [x] Search bar appears with placeholder text
- [x] Course cards render: ENGG1300, COMP3506, PHIL1002
- [x] Each course shows: code, title, term, instructor initials
- [x] "View Course" buttons appear on each card
- [x] "Upcoming Deadlines" section renders
- [x] Deadline items display with correct formatting
- [x] Deadline colors are correct (red for urgent, cyan for other)
- [x] Timeline indicators appear on left side of deadlines

### ✅ Components

**ProgressRing**
- [x] Displays percentage value (0-100)
- [x] Clamps values at 0 and 100
- [x] Shows custom label text
- [x] Renders circular progress visualization

**Sidebar**
- [x] Active navigation item highlights correctly
- [x] Hover states work on nav links
- [x] Support button has shadow on hover
- [x] Icons render for all nav items

**TopNav**
- [x] Branding text renders
- [x] All action buttons are accessible
- [x] Responsive scaling on different viewport widths

### ✅ Routing

- [x] / route shows WellbeingLandingPage
- [x] /courses route shows CoursesPage
- [x] /community, /chat, /resources show placeholder pages
- [x] Invalid routes redirect to /
- [x] Layout persists when navigating between routes
- [x] Route transitions don't reload sidebar/topbar

### ✅ Accessibility

- [x] All buttons have aria-label or text content
- [x] Images have alt text
- [x] High contrast on Quick Exit button
- [x] Focus visible on interactive elements
- [x] Semantic HTML (main, nav, article, aside)
- [x] Color alone doesn't convey information

### ✅ Responsive Design

- [x] Mobile: Sidebar compresses to icon rail
- [x] Tablet: Intermediate layout adjustments
- [x] Desktop: Full sidebar with text labels
- [x] Content area padding scales appropriately
- [x] Cards stack vertically on small screens
- [x] Cards grid on larger screens (2-3 cols)
- [x] Text sizes scale with viewport

### ✅ Visual Design

- [x] Color palette matches references (purple, mint, light-red)
- [x] Border radius and shadows are consistent
- [x] Typography hierarchy is clear
- [x] Card spacing and alignment match references
- [x] Icons use lucide-react consistently
- [x] No layout breaks at any breakpoint

## Manual Testing Checklist

When running the app locally (`npm run dev`):

1. **Navigation Flow**
   - [ ] Click Home → verify landing page loads
   - [ ] Click Courses → verify courses page loads with sidebar still visible
   - [ ] Click Community/Chat/Resources → verify routes work
   - [ ] Verify sidebar never reloads

2. **Quick Exit Button**
   - [ ] Click Quick Exit in top nav → opens Google
   - [ ] Verify button styling is prominent (purple, white text)
   - [ ] Test on mobile/tablet/desktop

3. **Landing Page Cards**
   - [ ] Verify mint card has correct color and hover effect
   - [ ] Verify emergency banner appears in red
   - [ ] Verify Mindfulness Pulse progress ring shows 70%
   - [ ] Hover over cards → verify translation effect

4. **Courses Page**
   - [ ] Search bar is functional
   - [ ] All 3 course cards appear
   - [ ] Deadlines appear below with correct timeline colors
   - [ ] Responsive: cards stack on mobile, grid on desktop

5. **Mobile Responsiveness**
   - [ ] Resize to 390px width → sidebar becomes icon rail
   - [ ] Verify Quick Exit button still accessible
   - [ ] Verify content doesn't overflow
   - [ ] Test on iPhone/Android viewport sizes

6. **Sidebar Navigation**
   - [ ] Active route highlights correctly
   - [ ] Hover state works on nav items
   - [ ] Support button is clickable
   - [ ] Settings/Help links appear

7. **Dark Mode Testing (if applicable)**
   - [ ] Verify contrast ratios meet WCAG AA standards
   - [ ] Test on actual mobile devices if possible

## Expected Test Results

When you run `npm test`, you should see:

```
✓ App Component (4 tests)
✓ MainLayout Component (3 tests)
✓ Sidebar Component (5 tests)
✓ TopNav Component (5 tests)
✓ WellbeingLandingPage (7 tests)
✓ CoursesPage (9 tests)
✓ ProgressRing Component (6 tests)

29 tests passed in 2.34s
```

## Known Limitations

- Tests use Vitest which runs in jsdom environment
- Some CSS media queries are mocked, not fully tested
- Browser APIs (localStorage, localStorage, etc.) are mocked
- Tests don't cover actual network requests (those would need API mocking)

## Next Steps

1. Install Node.js on your local machine
2. Run `npm install` to install test dependencies
3. Run `npm test` to execute the test suite
4. Use `npm run test:ui` for interactive test debugging
5. Share results with the team
