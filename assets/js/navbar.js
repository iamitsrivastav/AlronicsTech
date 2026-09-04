/**
 * Navbar Component - Production-Ready Navigation
 *
 * Features:
 * - Mobile-responsive (desktop flex, mobile hamburger)
 * - Active page state highlighting
 * - Full keyboard accessibility (Tab, Enter, Escape)
 * - Smooth animations
 * - No external dependencies
 * - Works on GitHub Pages with subdirectory hosting
 * - Dark/Light theme toggle with localStorage persistence
 */

// ===== EARLY THEME INITIALIZATION (Before DOM Load) =====
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
  } catch (e) {
    // Fallback if localStorage is not available
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

// ===== THEME MANAGEMENT FUNCTIONS =====
function initTheme() {
  // Ensure theme is set (may already be set by early initialization above)
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');

  if (!currentTheme) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(theme);
  } else {
    // Update meta theme-color based on current theme
    updateMetaTheme(currentTheme);
  }
}

function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateMetaTheme(theme);

  // Dispatch custom event so other scripts can react
  window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
}

function updateMetaTheme(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#0b1220' : '#00203F');
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);

}

// Initialize theme on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}


function initNavbar() {
  // Configuration
  const config = {
    logoDesktop: 'Alronics Tech',
    logoMobile: 'Alronics Tech', // Changed from 'Alronics' to full branding
    youtubeUrl: 'https://www.youtube.com/@alronicstech',
    instagramUrl: 'https://www.instagram.com/alronicstech/',
    twitterUrl: 'https://x.com/AlronicsTech',
    email: 'alronicstech@gmail.com',
    navLinks: [
      { href: './index.html', label: 'Home' },
      { href: './blog.html', label: 'Blog' },
      { href: './projects.html', label: 'Projects' },
      { href: './resources.html', label: 'Resources' },
      { href: './schools.html', label: 'For Schools' },
      { href: './contact.html', label: 'Contact' }
    ]
  };

  // Helper: Get current page for active state
  const getCurrentPage = () => {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  };

  const isActiveLink = (href) => {
    const currentPage = getCurrentPage();
    const linkPage = href.split('/').pop();
    return currentPage === linkPage || (currentPage === '' && linkPage === 'index.html');
  };

  // Helper: Create element with attributes
  const createElement = (tag, attrs = {}, content = '') => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'innerHTML') {
        el.innerHTML = value;
      } else {
        el.setAttribute(key, value);
      }
    });
    if (content) el.textContent = content;
    return el;
  };

  const socialIcon = (name) => {
    const icons = {
      youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2c-.3-1.4-1.5-2.4-3-2.4H3.5C2 3.8.8 4.8.5 6.2c-.3 1.4-.5 3.8-.5 3.8s0 2.4.5 3.8c.3 1.4 1.5 2.4 3 2.4h17c1.5 0 2.7-1 3-2.4.5-1.4.5-3.8.5-3.8s0-2.4-.5-3.8zM9.5 8.5l6 3.5-6 3.5V8.5z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
      x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    return icons[name];
  };

  // Helper: Toggle mobile menu
  const toggleMobileMenu = (hamburger, mobileMenu, isOpen) => {
    hamburger.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      }, 0);
    } else {
      mobileMenu.style.maxHeight = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    }
  };

  // Create navbar element
  const navbar = createElement('nav', {
    className: 'navbar-root sticky top-0 z-50 m-0',
    role: 'navigation',
    'aria-label': 'Main navigation'
  });

  // === DESKTOP MENU ===
  const desktopMenu = createElement('div', {
    className: 'hidden md:flex max-w-7xl mx-auto px-6 lg:px-8 py-3 items-center justify-between'
  });

  // Logo (desktop)
  const desktopLogo = createElement('a', {
    href: './index.html',
    className: 'text-2xl font-bold text-white hover:text-cyan-300 transition-colors flex-shrink-0',
    'aria-current': isActiveLink('./index.html') ? 'page' : 'false'
  }, config.logoDesktop);
  desktopMenu.appendChild(desktopLogo);

  // Nav links (desktop)
  const desktopLinks = createElement('div', {
    className: 'flex gap-1 mx-auto'
  });
  config.navLinks.forEach(link => {
    const isActive = isActiveLink(link.href);
    const linkEl = createElement('a', {
      href: link.href,
      className: `px-4 py-2 rounded-lg transition-all font-medium text-sm ${
        isActive
          ? 'btn-primary'
          : 'text-slate-100 hover:text-white'
      } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`,
      'aria-current': isActive ? 'page' : 'false'
    }, link.label);
    desktopLinks.appendChild(linkEl);
  });
  desktopMenu.appendChild(desktopLinks);

  // Social links (desktop)
  const desktopSocial = createElement('div', {
    className: 'flex gap-3 ml-4'
  });

  const youtubeLink = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors',
    'aria-label': 'YouTube',
    innerHTML: socialIcon('youtube')
  });
  desktopSocial.appendChild(youtubeLink);

  const instagramLink = createElement('a', {
    href: config.instagramUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors',
    'aria-label': 'Instagram',
    innerHTML: socialIcon('instagram')
  });
  desktopSocial.appendChild(instagramLink);

  const twitterLink = createElement('a', {
    href: config.twitterUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors',
    'aria-label': 'X (Twitter)',
    innerHTML: socialIcon('x')
  });
  desktopSocial.appendChild(twitterLink);

  desktopMenu.appendChild(desktopSocial);

  // Theme toggle button (desktop) - Enhanced with animated icons
  const desktopThemeBtn = createElement('button', {
    className: 'theme-toggle ml-3',
    'aria-label': 'Toggle dark/light mode',
    id: 'theme-toggle-desktop',
    innerHTML: `
      <span class="theme-toggle-icon theme-toggle-moon">🌙</span>
      <span class="theme-toggle-icon theme-toggle-sun">☀️</span>
    `
  });
  desktopThemeBtn.addEventListener('click', toggleTheme);
  desktopMenu.appendChild(desktopThemeBtn);

  // Subscribe button (desktop)
  const desktopSubscribeBtn = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'btn-base btn-primary flex-shrink-0 ml-3 text-sm',
    'aria-label': 'Subscribe to our YouTube channel'
  }, '▶ Subscribe');
  desktopMenu.appendChild(desktopSubscribeBtn);

  navbar.appendChild(desktopMenu);

  // === MOBILE MENU ===
  const mobileContainer = createElement('div', {
    className: 'md:hidden px-4 sm:px-6 py-3 flex justify-between items-center'
  });

  // Logo (mobile) - Now shows full text
  const mobileLogo = createElement('a', {
    href: './index.html',
    className: 'text-lg font-bold text-white hover:text-cyan-300 transition-colors flex-shrink-0',
    'aria-current': isActiveLink('./index.html') ? 'page' : 'false'
  }, config.logoMobile);
  mobileContainer.appendChild(mobileLogo);

  // Mobile controls container (theme toggle + hamburger)
  const mobileControls = createElement('div', {
    className: 'flex gap-2 items-center'
  });

  // Theme toggle button (mobile) - Enhanced with animated icons
  const mobileThemeBtn = createElement('button', {
    className: 'theme-toggle md:hidden',
    'aria-label': 'Toggle dark/light mode',
    id: 'theme-toggle-mobile',
    innerHTML: `
      <span class="theme-toggle-icon theme-toggle-moon">🌙</span>
      <span class="theme-toggle-icon theme-toggle-sun">☀️</span>
    `
  });
  mobileThemeBtn.addEventListener('click', toggleTheme);
  mobileControls.appendChild(mobileThemeBtn);

  // Hamburger button
  const hamburger = createElement('button', {
    className: 'md:hidden p-2 rounded-lg hover:bg-accent-light transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400',
    'aria-label': 'Toggle navigation menu',
    'aria-expanded': 'false',
    id: 'menu-toggle',
    innerHTML: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
  });
  mobileControls.appendChild(hamburger);
  mobileContainer.appendChild(mobileControls);
  navbar.appendChild(mobileContainer);

  // Mobile menu (hidden by default)
  const mobileMenu = createElement('div', {
    id: 'mobile-menu',
    className: 'md:hidden px-4 sm:px-6 py-4 space-y-2 hidden max-h-0 overflow-hidden transition-all duration-300 mobile-menu-root',
    role: 'region',
    'aria-labelledby': 'menu-toggle'
  });

  // Mobile nav links
  config.navLinks.forEach(link => {
    const isActive = isActiveLink(link.href);
    const linkEl = createElement('a', {
      href: link.href,
      className: `block px-4 py-3 rounded-lg transition-all font-semibold text-sm ${
        isActive
          ? 'btn-primary'
          : 'text-slate-100 hover:text-white'
      } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`,
      'aria-current': isActive ? 'page' : 'false'
    }, link.label);

    // Close menu when link clicked
    linkEl.addEventListener('click', () => {
      toggleMobileMenu(hamburger, mobileMenu, false);
    });

    mobileMenu.appendChild(linkEl);
  });

  // Mobile social section
  const mobileSocialSection = createElement('div', {
    className: 'pt-3 border-t border-indigo-500'
  });

  const mobileSocialLabel = createElement('div', {
    className: 'px-4 py-2 text-xs font-semibold text-slate-300 uppercase'
  }, 'Follow Us');
  mobileSocialSection.appendChild(mobileSocialLabel);

  const mobileSocialLinks = createElement('div', {
    className: 'flex gap-3 px-4 py-2'
  });

  const mobileYoutubeLink = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors text-2xl',
    'aria-label': 'YouTube',
    innerHTML: socialIcon('youtube')
  });
  mobileSocialLinks.appendChild(mobileYoutubeLink);

  const mobileInstagramLink = createElement('a', {
    href: config.instagramUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors text-2xl',
    'aria-label': 'Instagram',
    innerHTML: socialIcon('instagram')
  });
  mobileSocialLinks.appendChild(mobileInstagramLink);

  const mobileTwitterLink = createElement('a', {
    href: config.twitterUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'text-white hover:text-accent-hover transition-colors text-2xl',
    'aria-label': 'X (Twitter)',
    innerHTML: socialIcon('x')
  });
  mobileSocialLinks.appendChild(mobileTwitterLink);

  const mobileEmailLink = createElement('a', {
    href: `mailto:${config.email}`,
    className: 'text-white hover:text-accent-hover transition-colors text-2xl',
    'aria-label': 'Email us'
  }, '✉️');
  mobileSocialLinks.appendChild(mobileEmailLink);

  mobileSocialSection.appendChild(mobileSocialLinks);
  mobileMenu.appendChild(mobileSocialSection);

  // Mobile Subscribe button
  const mobileSubscribeBtn = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'block w-full btn-base btn-primary text-center py-3 rounded-lg font-bold mt-4 text-sm',
    'aria-label': 'Subscribe to our YouTube channel'
  }, '▶ Subscribe');
  mobileMenu.appendChild(mobileSubscribeBtn);

  navbar.appendChild(mobileMenu);

  // === EVENT LISTENERS ===
  // Hamburger toggle
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    toggleMobileMenu(hamburger, mobileMenu, !isExpanded);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu(hamburger, mobileMenu, false);
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && hamburger.getAttribute('aria-expanded') === 'true') {
      toggleMobileMenu(hamburger, mobileMenu, false);
    }
  });

  // Inject navbar at the start of body
  document.body.insertBefore(navbar, document.body.firstChild);
}

// Wait for DOM to be ready before initializing navbar
if (document.body) {
  initNavbar();
} else {
  document.addEventListener('DOMContentLoaded', initNavbar);
}
