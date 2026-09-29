const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">Care made simple</p>
        <h1>Healthy skin starts with the right routine.</h1>
        <p>
          AugEcommerce makes it easier to discover thoughtful skincare and
          beauty products for every step of your daily routine.
        </p>
      </section>

      <section className="about-story">
        <div>
          <p className="about-eyebrow">About AugEcommerce</p>
          <h2>Skincare you can feel good about.</h2>
          <p>
            We believe skincare should be easy to understand, enjoyable to
            use, and suited to real everyday needs. Our collection brings
            together gentle cleansers, nourishing oils, sun protection, and
            simple beauty essentials in one convenient place.
          </p>
          <p>
            Whether you are building your first routine or refreshing the one
            you already love, we are here to help you choose products that
            support clean, comfortable, and confident-looking skin.
          </p>
        </div>

        <div className="about-highlight">
          <span className="about-highlight-icon">+</span>
          <h3>Small steps, lasting habits</h3>
          <p>
            Consistency matters more than complexity. Start with the basics:
            cleanse, moisturize, and protect your skin from the sun.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <p className="about-eyebrow">What guides us</p>
          <h2>Our skincare values</h2>
        </div>

        <div className="about-value-grid">
          <article>
            <h3>Gentle by design</h3>
            <p>
              We look for products that help support the skin barrier and fit
              comfortably into everyday routines.
            </p>
          </article>
          <article>
            <h3>Simple choices</h3>
            <p>
              Clear product information helps you choose what works for your
              skin goals without feeling overwhelmed.
            </p>
          </article>
          <article>
            <h3>Everyday confidence</h3>
            <p>
              Skincare is personal. Our goal is to help you feel comfortable,
              cared for, and confident in your own skin.
            </p>
          </article>
        </div>
      </section>

      <section className="about-routine">
        <h2>Build a routine that works for you</h2>
        <p>
          Start with a gentle cleanser, follow with a moisturizer that suits
          your skin, and finish your morning routine with broad-spectrum
          sunscreen. Add targeted products gradually and give your routine
          time to work.
        </p>
      </section>
    </main>
  );
};

export default About;
