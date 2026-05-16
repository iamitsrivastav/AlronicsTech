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
   */
  function initScrollAnimations() {
    if (!config.enabled) return;

    // Get all elements with scroll reveal classes
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-stagger'
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

    // Observe all reveal elements
    revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Animate staggered reveals for cards
   */
  function initStaggeredReveals() {
    if (!config.enabled) return;

    const staggerContainers = document.querySelectorAll('.scroll-reveal-stagger');

    staggerContainers.forEach(container => {
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
    });
  }

  /**
   * Auto-add scroll reveal class to common sections
   */
  function initAutoReveal() {
    if (!config.enabled) return;

    // Add scroll-reveal to all sections and main article elements
    const sections = document.querySelectorAll(
      'section:not([class*="sticky"]):not([class*="fixed"]), article, .main-content'
    );

    sections.forEach(section => {
      if (!section.classList.contains('scroll-reveal') && 
          !section.classList.contains('scroll-reveal-scale') &&
          !section.classList.contains('scroll-reveal-stagger')) {
        section.classList.add('scroll-reveal');
      }
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
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initStaggeredReveals();
        initAutoReveal();
        observeDynamicContent();
        initThemeChangeListener();
      });
    } else {
      initScrollAnimations();
      initStaggeredReveals();
      initAutoReveal();
      observeDynamicContent();
      initThemeChangeListener();
    }
  }

  // Start animations
  init();

  // Expose API for external use
  window.scrollAnimations = {
    init,
    initScrollAnimations,
    initStaggeredReveals
  };
})();
