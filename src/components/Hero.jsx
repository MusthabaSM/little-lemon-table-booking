import { RESTAURANT_INFO } from '../constants/restaurantData';

export default function Hero({ onReserveClick }) {
  const handleReserve = (e) => {
    if (onReserveClick) {
      e.preventDefault();
      onReserveClick();
    }
  };

  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 id="hero-title" className="hero-title">
            {RESTAURANT_INFO.name}
          </h1>
          <h2 className="hero-subtitle">{RESTAURANT_INFO.tagline}</h2>
          <p className="hero-description">{RESTAURANT_INFO.shortDescription}</p>

          <div className="hero-cta-group">
            <a
              href="#reservations"
              className="btn btn-primary"
              onClick={handleReserve}
              aria-label="Reserve a table at Little Lemon"
            >
              Reserve a Table
            </a>
            <a href="#menu" className="btn btn-outline" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
              Explore Menu
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="./images/hero-platter.jpg"
            alt="Overhead presentation of Mediterranean dishes including grilled skewers, hummus, warm pita bread, and kalamata olives at Little Lemon"
            className="hero-image"
            width="460"
            height="380"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
