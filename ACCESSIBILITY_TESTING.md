# Accessibility Testing Guide

## How to Test the Portfolio's Accessibility Features

### Keyboard Navigation Testing

1. **Tab Key Navigation**
   - Press `Tab` to navigate through all interactive elements
   - Press `Shift + Tab` to navigate backwards
   - Verify focus indicators are visible on each element

2. **Skip Link**
   - Press `Tab` once when page loads
   - The "Skip to main content" link should appear at the top
   - Press `Enter` to skip navigation

3. **Menu Navigation**
   - Use `Tab` to navigate to menu items
   - Press `Enter` to activate a menu link
   - On mobile, press `Escape` to close the menu

4. **Form Interaction**
   - Navigate to form fields with `Tab`
   - Fill in fields and press `Enter` to submit
   - Error messages appear inline and are announced to screen readers

### Screen Reader Testing

Test with popular screen readers:
- **Windows**: NVDA (free) or JAWS
- **Mac**: VoiceOver (built-in, press Cmd+F5)
- **Linux**: Orca

**What to verify:**
- Page title is announced
- Headings are properly announced with levels
- Form labels are associated with inputs
- Error messages are announced
- Button purposes are clear
- Navigation structure is logical

### Visual Testing

1. **Responsive Design**
   - Test on mobile (375px width)
   - Test on tablet (768px width)
   - Test on desktop (1200px+ width)

2. **Focus Indicators**
   - All interactive elements should have visible focus
   - Focus should be a blue outline (3px solid)

3. **Color Contrast**
   - Use browser dev tools to check contrast ratios
   - All text should meet WCAG AA standards (4.5:1 for normal text)

### Browser Testing

Test in multiple browsers:
- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Android)

### Accessibility Checklist

- [x] Skip to main content link
- [x] Semantic HTML (header, nav, main, section, footer)
- [x] Proper heading hierarchy (h1 -> h2 -> h3)
- [x] ARIA labels and roles
- [x] Keyboard accessible (Tab, Enter, Escape)
- [x] Focus indicators
- [x] Form labels and validation
- [x] Screen reader announcements
- [x] Responsive design
- [x] Reduced motion support
- [x] High contrast mode support

## Tools for Automated Testing

1. **Lighthouse** (in Chrome DevTools)
   - Run an accessibility audit
   - Target: 95+ score

2. **axe DevTools** (browser extension)
   - Install and run on the page
   - Fix any issues reported

3. **WAVE** (browser extension)
   - Visual accessibility checker
   - Verify no errors

## Quick Test Commands

```bash
# Start local server
python -m http.server 8000

# Then open http://localhost:8000 in browser
```

## Expected Behavior

- All sections are keyboard accessible
- Form validation works with clear error messages
- Mobile menu opens/closes properly
- Smooth scrolling works for anchor links
- No JavaScript errors in console
- Page loads and is usable without JavaScript (progressive enhancement)
