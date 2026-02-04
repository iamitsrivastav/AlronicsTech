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
 */

function initNavbar() {
  // Configuration
  const config = {
    logoDesktop: 'Alronics Tech',
    logoMobile: 'Alronics',
    youtubeUrl: 'https://www.youtube.com/@alronicstech',
    navLinks: [
      { href: './index.html', label: 'Home' },
      { href: './blog.html', label: 'Blog' },
      { href: './projects.html', label: 'Projects' },
      { href: './resources.html', label: 'Resources' },
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
    className: 'bg-gradient-to-r from-indigo-600 to-slate-900 text-white shadow-lg sticky top-0 z-50',
    role: 'navigation',
    'aria-label': 'Main navigation'
  });

  // === DESKTOP MENU ===
  const desktopMenu = createElement('div', {
    className: 'hidden md:flex max-w-7xl mx-auto px-6 lg:px-8 py-4 items-center justify-between'
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
      className: `px-4 py-2 rounded-lg transition-all font-medium ${
        isActive
          ? 'bg-orange-500 text-white shadow-lg'
          : 'text-slate-100 hover:bg-indigo-500 hover:text-white'
      } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`,
      'aria-current': isActive ? 'page' : 'false'
    }, link.label);
    desktopLinks.appendChild(linkEl);
  });
  desktopMenu.appendChild(desktopLinks);

  // YouTube button (desktop)
  const desktopYoutubeBtn = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors font-bold text-white shadow-lg flex-shrink-0 ml-2',
    'aria-label': 'Subscribe to our YouTube channel'
  }, '▶ Subscribe');
  desktopMenu.appendChild(desktopYoutubeBtn);

  navbar.appendChild(desktopMenu);

  // === MOBILE MENU ===
  const mobileContainer = createElement('div', {
    className: 'md:hidden px-4 sm:px-6 py-4 flex justify-between items-center'
  });

  // Logo (mobile)
  const mobileLogo = createElement('a', {
    href: './index.html',
    className: 'text-xl font-bold text-white hover:text-cyan-300 transition-colors',
    'aria-current': isActiveLink('./index.html') ? 'page' : 'false'
  }, config.logoMobile);
  mobileContainer.appendChild(mobileLogo);

  // Hamburger button
  const hamburger = createElement('button', {
    className: 'md:hidden p-2 rounded-lg hover:bg-indigo-500 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400',
    'aria-label': 'Toggle navigation menu',
    'aria-expanded': 'false',
    id: 'menu-toggle',
    innerHTML: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
  });
  mobileContainer.appendChild(hamburger);
  navbar.appendChild(mobileContainer);

  // Mobile menu (hidden by default)
  const mobileMenu = createElement('div', {
    id: 'mobile-menu',
    className: 'md:hidden bg-indigo-700 border-t-2 border-indigo-500 px-4 sm:px-6 py-4 space-y-2 hidden max-h-0 overflow-hidden transition-all duration-300',
    role: 'region',
    'aria-labelledby': 'menu-toggle'
  });

  // Mobile nav links
  config.navLinks.forEach(link => {
    const isActive = isActiveLink(link.href);
    const linkEl = createElement('a', {
      href: link.href,
      className: `block px-4 py-3 rounded-lg transition-all font-semibold ${
        isActive
          ? 'bg-orange-500 text-white shadow-lg'
          : 'text-slate-100 hover:bg-indigo-600 hover:text-white'
      } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`,
      'aria-current': isActive ? 'page' : 'false'
    }, link.label);
    
    // Close menu when link clicked
    linkEl.addEventListener('click', () => {
      toggleMobileMenu(hamburger, mobileMenu, false);
    });
    
    mobileMenu.appendChild(linkEl);
  });

  // Mobile YouTube button
  const mobileYoutubeBtn = createElement('a', {
    href: config.youtubeUrl,
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'block w-full bg-orange-500 hover:bg-orange-600 text-center py-3 rounded-lg transition-colors font-bold text-white mt-4 shadow-lg',
    'aria-label': 'Subscribe to our YouTube channel'
  }, '▶ Subscribe');
  mobileMenu.appendChild(mobileYoutubeBtn);

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
