// Small interactive helpers for the portfolio
document.addEventListener('DOMContentLoaded', function () {
  
  // Set current year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  
  if (btn && nav) {
    // 1. Set initial ARIA state to collapsed (false) if it's missing
    // This is good practice if the HTML doesn't explicitly set it
    if (btn.getAttribute('aria-expanded') === null) {
      btn.setAttribute('aria-expanded', 'false');
    }
    
    // 2. Add event listener
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Toggle the aria-expanded state on the button
      btn.setAttribute('aria-expanded', String(!expanded));
      
      // Accessibility Improvement:
      // Removed manipulation of nav.setAttribute('aria-hidden', ...).
      // The state is communicated via the button's aria-expanded="true/false".
      // The CSS now uses the aria-expanded state to control visibility, which
      // is the modern, accessible way to manage this pattern.
      // E.g., CSS: .nav-toggle[aria-expanded="true"] + .primary-nav { display: block; }

      // Optional: Add/remove a class to the nav for styling if needed,
      // but the CSS based on aria-expanded is cleaner and sufficient.
    });
  }

  // Smooth scroll for same-page links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Use scrollIntoView, which is accessible, but ensure the target
        // receives focus after scrolling to satisfy WCAG SC 2.4.7 (Focus Visible)
        // for smooth scrolling link targets.
        target.scrollIntoView({behavior:'smooth', block:'start'});
        
        // Accessibility Improvement: Put focus on the target element
        if (target.getAttribute('tabindex') === null) {
             // Temporarily make target focusable if not already, then remove tabindex after focus
             target.setAttribute('tabindex', '-1'); 
             target.focus();
             target.removeAttribute('tabindex'); 
        } else {
            target.focus();
        }
      }
    });
  });
  
  // hide header when scrolling down, show when scrolling up
  // (function () {
  //     // no header hide-on-scroll behavior: header is static
  // })();
});
