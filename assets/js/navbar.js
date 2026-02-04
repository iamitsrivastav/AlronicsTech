/**
 * Navbar Component - Reusable Navigation
 * Features:
 * - Mobile-responsive hamburger menu with animation
 * - Active page highlighting
 * - Keyboard-accessible navigation
 * - No external dependencies
 * - Works on GitHub Pages
 */

function initNavbar() {
  // Define navigation links
  const navLinks = [
    { href: './index.html', label: 'Home' },
    { href: './blog.html', label: 'Blog' },
    { href: './projects.html', label: 'Projects' },
    { href: './resources.html', label: 'Resources' },
    { href: './contact.html', label: 'Contact' }
  ];

  // Get current page for active state
  const getCurrentPage = () => {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  };

  const isActiveLink = (href) => {
    const currentPage = getCurrentPage();
    const linkPage = href.split('/').pop();
    return currentPage === linkPage || (currentPage === '' && linkPage === 'index.html');
  };

  // Create navbar HTML structure
  const navbar = document.createElement('nav');
  navbar.className = 'bg-gradient-to-r from-indigo-600 to-slate-900 text-white shadow-lg sticky top-0 z-50';
  navbar.setAttribute('role', 'navigation');
  navbar.setAttribute('aria-label', 'Main navigation');

  // Build desktop menu
  const desktopMenu = document.createElement('div');
  desktopMenu.className = 'hidden md:flex max-w-7xl mx-auto px-6 lg:px-8 py-4 items-center justify-between';

  // Logo
  const logo = document.createElement('a');
  logo.href = './index.html';
  logo.className = 'text-2xl font-bold text-white hover:text-cyan-300 transition-colors flex-shrink-0';
  logo.textContent = 'Alronics Tech';
  logo.setAttribute('aria-current', isActiveLink('/index.html') ? 'page' : 'false');
  desktopMenu.appendChild(logo);

  // Desktop nav links
  const desktopLinks = document.createElement('div');
  desktopLinks.className = 'flex gap-1 mx-auto';
  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    const isActive = isActiveLink(link.href);
    a.className = `px-4 py-2 rounded-lg transition-all font-medium ${
      isActive
        ? 'bg-orange-500 text-white shadow-lg'
        : 'text-slate-100 hover:bg-indigo-500 hover:text-white'
    } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`;
    if (isActive) {
      a.setAttribute('aria-current', 'page');
    }
    desktopLinks.appendChild(a);
  });
  desktopMenu.appendChild(desktopLinks);

  // YouTube subscribe button
  const youtubeBtn = document.createElement('a');
  youtubeBtn.href = 'https://www.youtube.com/@alronicstech';
  youtubeBtn.target = '_blank';
  youtubeBtn.rel = 'noopener noreferrer';
  youtubeBtn.className = 'bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition-colors font-bold text-white shadow-lg flex-shrink-0 ml-2';
  youtubeBtn.setAttribute('aria-label', 'Subscribe to our YouTube channel');
  youtubeBtn.textContent = '▶ Subscribe';
  desktopMenu.appendChild(youtubeBtn);

  navbar.appendChild(desktopMenu);

  // Build mobile menu
  const mobileContainer = document.createElement('div');
  mobileContainer.className = 'md:hidden px-4 sm:px-6 py-4 flex justify-between items-center';

  // Mobile logo
  const mobileLogo = document.createElement('a');
  mobileLogo.href = './index.html';
  mobileLogo.className = 'text-xl font-bold text-white hover:text-cyan-300 transition-colors';
  mobileLogo.textContent = 'Alronics';
  mobileLogo.setAttribute('aria-current', isActiveLink('/index.html') ? 'page' : 'false');
  mobileContainer.appendChild(mobileLogo);

  // Hamburger menu button
  const hamburger = document.createElement('button');
  hamburger.className = 'md:hidden p-2 rounded-lg hover:bg-indigo-500 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('id', 'menu-toggle');
  hamburger.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';

  mobileContainer.appendChild(hamburger);
  navbar.appendChild(mobileContainer);

  // Mobile menu (hidden by default)
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'md:hidden bg-indigo-700 border-t-2 border-indigo-500 px-4 sm:px-6 py-4 space-y-2 hidden max-h-0 overflow-hidden transition-all duration-300';
  mobileMenu.setAttribute('role', 'region');
  mobileMenu.setAttribute('aria-labelledby', 'menu-toggle');

  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    const isActive = isActiveLink(link.href);
    a.className = `block px-4 py-3 rounded-lg transition-all font-semibold ${
      isActive
        ? 'bg-orange-500 text-white shadow-lg'
        : 'text-slate-100 hover:bg-indigo-600 hover:text-white'
    } focus:outline-2 focus:outline-offset-2 focus:outline-cyan-400`;
    if (isActive) {
      a.setAttribute('aria-current', 'page');
    }
    mobileMenu.appendChild(a);
  });

  // Mobile YouTube button
  const mobileYoutubeBtn = document.createElement('a');
  mobileYoutubeBtn.href = 'https://www.youtube.com/@alronicstech';
  mobileYoutubeBtn.target = '_blank';
  mobileYoutubeBtn.rel = 'noopener noreferrer';
  mobileYoutubeBtn.className = 'block w-full bg-orange-500 hover:bg-orange-600 text-center py-3 rounded-lg transition-colors font-bold text-white mt-4 shadow-lg';
  mobileYoutubeBtn.setAttribute('aria-label', 'Subscribe to our YouTube channel');
  mobileYoutubeBtn.textContent = '▶ Subscribe';
  mobileMenu.appendChild(mobileYoutubeBtn);

  navbar.appendChild(mobileMenu);

  // Toggle mobile menu on button click
  hamburger.addEventListener('click', function () {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
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
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.style.maxHeight = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.style.maxHeight = '0';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
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
