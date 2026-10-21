import { SPECIALS } from '../constants/restaurantData';

export default function Specials({ onOrderOnlineClick }) {
  return (
    <section className="specials-section" id="menu" aria-labelledby="specials-title">
      <div className="container">
        <div className="section-header-row">
          <h2 id="specials-title" className="section-title">
            This weeks specials!
          </h2>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOrderOnlineClick}
            aria-label="View our full online menu"
          >
            Online Menu
          </button>
        </div>

        <div className="specials-grid">
          {SPECIALS.map((item) => (
            <article key={item.id} className="special-card">
              <div className="card-image-wrap">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  width="400"
                  height="220"
                />
              </div>

              <div className="card-body">
                <div className="card-title-row">
                  <h3 className="card-title">{item.title}</h3>
                  <span className="card-price">{item.price}</span>
                </div>

                <p className="card-desc">{item.description}</p>

                <div className="card-footer">
                  <button
                    type="button"
                    className="order-link"
                    onClick={onOrderOnlineClick}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    aria-label={`Order a delivery of ${item.title}`}
                  >
                    <span>Order a delivery</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <circle cx="15" cy="5" r="1" />
                      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
                    </svg>
                  </button>

                  <span className="delivery-badge" aria-label={`Estimated prep time: ${item.deliveryTime}`}>
                    {item.deliveryTime}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
