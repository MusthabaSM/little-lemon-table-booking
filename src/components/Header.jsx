import { useState } from 'react';
import { NAV_LINKS, RESTAURANT_INFO } from '../constants/restaurantData';

export default function Header({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (e, href) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <header className="site-header" role="banner">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container header-container">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="brand-link"
          onClick={(e) => handleLinkClick(e, '#home')}
          aria-label={`${RESTAURANT_INFO.name} Home`}
        >
          <svg
            className="brand-logo-img"
            viewBox="0 0 64 64"
            width="44"
            height="44"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M38 14 C48 6, 58 10, 58 10 C58 10, 56 22, 44 24 Z"
              fill="#495E57"
            />
            <path
              d="M14 44 C8 32, 14 16, 28 12 C36 10, 48 16, 52 26 C56 36, 50 50, 36 54 C24 57, 18 52, 14 44 Z"
              fill="#F4CE14"
            />
          </svg>
          <span className="brand-text">Little Lemon</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => {
              const isReservation = link.id === 'nav-reservations';
              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={link.href}
                    className={isReservation ? 'nav-cta' : ''}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="mobile-menu-drawer"
          role="region"
          aria-label="Mobile Navigation Menu"
        >
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={`mobile-${link.id}`} className="mobile-nav-item">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
