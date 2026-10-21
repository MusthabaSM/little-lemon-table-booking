import { RESTAURANT_INFO, NAV_LINKS } from '../constants/restaurantData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                viewBox="0 0 64 64"
                width="36"
                height="36"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M38 14 C48 6, 58 10, 58 10 C58 10, 56 22, 44 24 Z"
                  fill="#F4CE14"
                />
                <path
                  d="M14 44 C8 32, 14 16, 28 12 C36 10, 48 16, 52 26 C56 36, 50 50, 36 54 C24 57, 18 52, 14 44 Z"
                  fill="#F4CE14"
                />
              </svg>
              <span className="brand-text" style={{ color: '#F4CE14', fontSize: '1.8rem' }}>
                Little Lemon
              </span>
            </div>
            <p style={{ color: '#edefee', fontSize: '0.95rem', marginTop: '8px' }}>
              Traditional family Mediterranean recipes served with a modern twist
              in Chicago.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Navigation</h3>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={`footer-${link.id}`}>
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

          {/* Col 3: Contact & Hours */}
          <div className="footer-col">
            <h3 className="footer-heading">Contact</h3>
            <address className="footer-address">
              <span>{RESTAURANT_INFO.address.street}</span>
              <span>
                {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state}{' '}
                {RESTAURANT_INFO.address.zip}
              </span>
              <span style={{ marginTop: '6px' }}>
                <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: '#f4ce14' }}>
                  {RESTAURANT_INFO.phone}
                </a>
              </span>
              <span>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  style={{ color: '#f4ce14' }}
                >
                  {RESTAURANT_INFO.email}
                </a>
              </span>
            </address>

            <h3 className="footer-heading" style={{ marginTop: '16px' }}>
              Hours
            </h3>
            <div className="footer-hours-list">
              {RESTAURANT_INFO.hours.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                  <span>{item.days}:</span>
                  <span style={{ fontWeight: '600' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Social Media */}
          <div className="footer-col">
            <h3 className="footer-heading">Connect With Us</h3>
            <ul className="footer-links">
              {RESTAURANT_INFO.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} (opens in a new window)`}
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {CURRENT_YEAR} Little Lemon Restaurant. All rights
            reserved.
          </p>
          <p>
            Developed for the Meta Front-End Developer Capstone Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
