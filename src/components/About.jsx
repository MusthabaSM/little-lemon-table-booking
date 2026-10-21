import { RESTAURANT_INFO } from '../constants/restaurantData';

export default function About() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-content">
          <h2 id="about-title" className="about-title">
            {RESTAURANT_INFO.name}
          </h2>
          <h3 className="about-subtitle">{RESTAURANT_INFO.tagline}</h3>

          <p className="about-text">
            Little Lemon was founded in 1995 by two Italian brothers, Mario and Adrian,
            who grew up surrounded by Mediterranean culinary traditions. After immigrating
            to the United States, they brought their grandmother&apos;s cherished family
            recipes to the vibrant heart of Chicago.
          </p>

          <p className="about-text">
            Mario oversees the kitchen, curating authentic seasonal dishes influenced by
            Greek, Italian, and Turkish coastal flavours. Adrian manages the dining room,
            ensuring every guest feels warmly welcomed like family. Together, they believe
            exceptional dining begins with pure cold-pressed olive oils, fresh local
            produce, and genuine hospitality.
          </p>
        </div>

        <div className="about-image-wrapper">
          <img
            src="./images/mario-adrian.jpg"
            alt="Mario and Adrian, founders and chefs of Little Lemon, smiling together while preparing fresh Mediterranean pasta and herbs in their Chicago kitchen"
            className="about-image"
            width="480"
            height="340"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
