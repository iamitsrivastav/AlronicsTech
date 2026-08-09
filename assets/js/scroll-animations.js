/**
 * Scroll Reveal Animations
 * 
 * Professional scroll reveal animations using IntersectionObserver API
 * - Lightweight (no external libraries)
 * - High performance
 * - Works in all modern browsers
 * - Respects user's prefers-reduced-motion setting
 */

(function() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Configuration
  const config = {
    rootMargin: '0px 0px -100px 0px', // Trigger 100px before bottom of viewport
    threshold: 0,
    enabled: !prefersReducedMotion
  };

  /**
   * Initialize scroll reveal animations
   * FIXED: Use requestAnimationFrame to ensure accurate DOM measurements
   * ENHANCED: Support for additional animation types (left, right)
   */
  function initScrollAnimations() {
    if (!config.enabled) return;

    // Get all elements with scroll reveal classes
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger'
    );

    if (revealElements.length === 0) return;

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add revealed class to trigger animation
          entry.target.classList.add('revealed');
          // Stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    }, config);

    // Use requestAnimationFrame to ensure DOM is fully measured before checking visibility
    // This fixes the timing bug where getBoundingClientRect() was called too early
    requestAnimationFrame(() => {
      revealElements.forEach(element => {
        // Check if element is already visible on page load
        const rect = element.getBoundingClientRect();
        const isVisibleOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisibleOnLoad) {
          // Element is already in viewport - reveal it immediately
          element.classList.add('revealed');
        } else {
          // Element is below viewport - observe for scroll
          observer.observe(element);
        }
      });
    });
  }

  /**
   * Animate staggered reveals for cards
   * FIXED: Use requestAnimationFrame for accurate measurements
   */
  function initStaggeredReveals() {
    if (!config.enabled) return;

    const staggerContainers = document.querySelectorAll('.scroll-reveal-stagger');

    // Use requestAnimationFrame to ensure accurate DOM measurements
    requestAnimationFrame(() => {
      staggerContainers.forEach(container => {
        // Check if container is already visible on page load
        const rect = container.getBoundingClientRect();
        const isVisibleOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisibleOnLoad) {
          // Container is already in viewport - reveal immediately
          container.classList.add('revealed');
        } else {
          // Container is below viewport - observe for scroll
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Add revealed class to container
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
              }
            });
          }, config);

          observer.observe(container);
        }
      });
    });
  }

  /**
   * Auto-add scroll reveal class to common sections
   * FIXED: Added fallback to ensure sections render even if JS fails
   * ENHANCED: Support for additional animation patterns
   */
  function initAutoReveal() {
    if (!config.enabled) return;

    // Add scroll-reveal to all sections and main article elements
    const sections = document.querySelectorAll(
      'section:not([class*="sticky"]):not([class*="fixed"]), article, .main-content'
    );

    sections.forEach((section, index) => {
      if (!section.classList.contains('scroll-reveal') && 
          !section.classList.contains('scroll-reveal-left') &&
          !section.classList.contains('scroll-reveal-right') &&
          !section.classList.contains('scroll-reveal-scale') &&
          !section.classList.contains('scroll-reveal-stagger')) {
        // Alternate animation directions for visual interest
        if (index % 3 === 0) {
          section.classList.add('scroll-reveal');
        } else if (index % 3 === 1) {
          section.classList.add('scroll-reveal-left');
        } else {
          section.classList.add('scroll-reveal-right');
        }
      }
    });

    // FALLBACK: Ensure all scroll-reveal elements become visible if they're in viewport
    // This prevents sections from staying hidden if visibility detection fails
    requestAnimationFrame(() => {
      setTimeout(() => {
        const allRevealElements = document.querySelectorAll(
          '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-stagger'
        );
        
        allRevealElements.forEach(element => {
          // If element is NOT already revealed, check if it should be
          if (!element.classList.contains('revealed')) {
            const rect = element.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            
            // If in viewport and not revealed, reveal it now (fallback)
            if (isInViewport) {
              element.classList.add('revealed');
            }
          }
        });
      }, 100); // Small delay to ensure DOM is fully stable
    });
  }

  /**
   * Add scroll reveal to dynamically loaded content
   */
  function observeDynamicContent() {
    if (!config.enabled) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              const revealElements = node.querySelectorAll(
                '[class*="card"], [class*="item"], [class*="project"]'
              );
              
              revealElements.forEach(el => {
                if (!el.classList.contains('scroll-reveal') && 
                    !el.classList.contains('scroll-reveal-scale')) {
                  el.classList.add('scroll-reveal-scale');
                }
              });
            }
          });
        }
      });
    });

    // Watch for dynamic content
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  /**
   * Handle theme changes - refresh animations
   */
  function initThemeChangeListener() {
    window.addEventListener('themeChange', () => {
      // Re-initialize animations with new theme
      const revealed = document.querySelectorAll('.revealed');
      revealed.forEach(el => {
        el.classList.remove('revealed');
      });

      // Small delay to allow CSS to be applied
      setTimeout(() => {
        initScrollAnimations();
        initStaggeredReveals();
      }, 50);
    });
  }

  /**
   * Main initialization
   * FIXED: Improved timing with multiple fallbacks
   */
  function init() {
    // Helper function to run initialization
    function runInit() {
      initScrollAnimations();
      initStaggeredReveals();
      initAutoReveal();
      observeDynamicContent();
      initThemeChangeListener();
    }

    // Check current document state
    if (document.readyState === 'loading') {
      // DOM is still loading - wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', runInit, { once: true });
    } else if (document.readyState === 'interactive') {
      // DOM is interactive but not fully complete - use slight delay
      requestAnimationFrame(() => {
        setTimeout(runInit, 50);
      });
    } else {
      // DOM is already complete - run immediately
      runInit();
    }

    // FALLBACK: If DOMContentLoaded hasn't fired yet, ensure init runs anyway
    // This prevents sections from staying hidden if readyState is stuck
    setTimeout(() => {
      if (!window.scrollAnimationsInitialized) {
        window.scrollAnimationsInitialized = true;
        runInit();
      }
    }, 3000);
  }

  // Mark initialization as complete
  function markInitComplete() {
    window.scrollAnimationsInitialized = true;
  }

  // Original init call wrapped to mark complete
  const originalInit = init;
  init = function() {
    originalInit();
    markInitComplete();
  };

  // Start animations
  init();

  // Expose API for external use
  window.scrollAnimations = {
    init,
    initScrollAnimations,
    initStaggeredReveals
  };
})();
