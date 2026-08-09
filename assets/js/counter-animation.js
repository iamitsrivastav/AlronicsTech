/**
 * Animated Counter Animation
 * Counts from 0 to target value when element becomes visible
 * Uses IntersectionObserver for performance
 */

(function() {
  // Configuration
  const config = {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0,
  };

  /**
   * Animate counter from 0 to target value
   * @param {HTMLElement} element - The element containing the counter
   * @param {number} target - Target number to count to
   * @param {number} duration - Animation duration in milliseconds
   */
  function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Initialize counter animations
   */
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counting')) {
          const target = parseInt(entry.target.dataset.counter);
          const duration = parseInt(entry.target.dataset.duration) || 2000;

          // Mark as counting to prevent re-animation
          entry.target.classList.add('counting');

          // Start animation
          animateCounter(entry.target, target, duration);

          // Stop observing
          observer.unobserve(entry.target);
        }
      });
    }, config);

    counters.forEach(counter => observer.observe(counter));
  }

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    requestAnimationFrame(initCounters);
  }

  // Expose API for manual triggering
  window.counterAnimation = {
    initCounters,
    animateCounter
  };
})();
