import { TESTIMONIALS } from '../constants/restaurantData';

export default function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title" className="testimonials-title">
          What our customers say!
        </h2>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((review) => (
            <article key={review.id} className="testimonial-card">
              <div
                className="star-rating"
                role="img"
                aria-label={`${review.rating} out of 5 stars rating`}
              >
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <div className="reviewer-profile">
                <img
                  src={review.avatar}
                  alt={`Profile photo of ${review.name}`}
                  className="reviewer-avatar"
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <div>
                  <h3 className="reviewer-name">{review.name}</h3>
                  <p className="reviewer-role">{review.role}</p>
                </div>
              </div>

              <blockquote className="reviewer-quote">
                &ldquo;{review.comment}&rdquo;
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
