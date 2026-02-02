/**
 * Navbar Component - Reusable Navigation
 * Features:
 * - Mobile-responsive hamburger menu
 * - Keyboard-accessible navigation
 * - No external dependencies
 * - Works on GitHub Pages
 */

(function initNavbar() {
  // Define navigation links
  const navLinks = [
    { href: '/index.html', label: 'Home' },
    { href: '/blog.html', label: 'Blog' },
    { href: '/projects.html', label: 'Projects' },
    { href: '/resources.html', label: 'Resources' },
    { href: '/contact.html', label: 'Contact' }
  ];

  // Create navbar HTML structure
  const navbar = document.createElement('nav');
  navbar.className = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50';
  navbar.setAttribute('role', 'navigation');
  navbar.setAttribute('aria-label', 'Main navigation');

  // Build desktop menu
  const desktopMenu = document.createElement('div');
  desktopMenu.className = 'hidden md:flex max-w-7xl mx-auto px-4 py-4 items-center justify-between';

  // Logo
  const logo = document.createElement('a');
  logo.href = '/index.html';
  logo.className = 'text-2xl font-bold hover:text-blue-100 transition-colors';
  logo.textContent = 'Alronics Tech';
  desktopMenu.appendChild(logo);

  // Desktop nav links
  const desktopLinks = document.createElement('div');
  desktopLinks.className = 'flex gap-8';
  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    a.className = 'hover:text-blue-100 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white';
    desktopLinks.appendChild(a);
  });
  desktopMenu.appendChild(desktopLinks);

  // YouTube subscribe button
  const youtubeBtn = document.createElement('a');
  youtubeBtn.href = 'https://www.youtube.com/@alronicstech';
  youtubeBtn.target = '_blank';
  youtubeBtn.rel = 'noopener noreferrer';
  youtubeBtn.className = 'bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium';
  youtubeBtn.setAttribute('aria-label', 'Subscribe to our YouTube channel');
  youtubeBtn.textContent = '▶ Subscribe';
  desktopMenu.appendChild(youtubeBtn);

  navbar.appendChild(desktopMenu);

  // Build mobile menu
  const mobileContainer = document.createElement('div');
  mobileContainer.className = 'md:hidden px-4 py-4 flex justify-between items-center max-w-7xl mx-auto';

  // Mobile logo
  const mobileLogo = document.createElement('a');
  mobileLogo.href = '/index.html';
  mobileLogo.className = 'text-xl font-bold hover:text-blue-100 transition-colors';
  mobileLogo.textContent = 'Alronics';
  mobileContainer.appendChild(mobileLogo);

  // Hamburger menu button
  const hamburger = document.createElement('button');
  hamburger.className = 'md:hidden p-2 rounded-lg hover:bg-blue-500 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white';
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('id', 'menu-toggle');
  hamburger.innerHTML = '<span class="text-2xl">☰</span>';

  mobileContainer.appendChild(hamburger);
  navbar.appendChild(mobileContainer);

  // Mobile menu (hidden by default)
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'md:hidden bg-blue-700 px-4 py-4 space-y-3 hidden';
  mobileMenu.setAttribute('role', 'region');
  mobileMenu.setAttribute('aria-labelledby', 'menu-toggle');

  navLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    a.className = 'block py-2 hover:text-blue-100 transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-white';
    mobileMenu.appendChild(a);
  });

  // Mobile YouTube button
  const mobileYoutubeBtn = document.createElement('a');
  mobileYoutubeBtn.href = 'https://www.youtube.com/@alronicstech';
  mobileYoutubeBtn.target = '_blank';
  mobileYoutubeBtn.rel = 'noopener noreferrer';
  mobileYoutubeBtn.className = 'block w-full bg-red-600 hover:bg-red-700 text-center py-2 rounded-lg transition-colors font-medium mt-4';
  mobileYoutubeBtn.setAttribute('aria-label', 'Subscribe to our YouTube channel');
  mobileYoutubeBtn.textContent = '▶ Subscribe';
  mobileMenu.appendChild(mobileYoutubeBtn);

  navbar.appendChild(mobileMenu);

  // Toggle mobile menu on button click
  hamburger.addEventListener('click', function () {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && !mobileMenu.classList.contains('hidden')) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    }
  });

  // Inject navbar at the start of body
  document.body.insertBefore(navbar, document.body.firstChild);
})();
