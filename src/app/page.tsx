import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__content">
          <p className="eyebrow">ST. LOUIS • WEB DESIGN • DEVELOPMENT</p>

          <h1 id="hero-heading">
            Your business deserves a website that works as hard as you do.
          </h1>

          <p className="hero__description">
            We build, rebuild, and repair websites for local businesses that
            need to look credible, communicate clearly, and turn attention into
            actual customers.
          </p>

          <div className="hero__actions">
            <a className="button button--primary" href="#contact">
              Start a project
              <span aria-hidden="true">↗</span>
            </a>

            <a className="button button--secondary" href="#services">
              Explore services
            </a>
          </div>
        </div>

        <div className="hero__signal" aria-label="Site Rehab STL project focus">
          <div className="hero__signal-top">
            <span>SR / 001</span>
            <span>STL</span>
          </div>

          <div className="hero__signal-body">
            <span className="hero__signal-line" aria-hidden="true" />
            <p>
              Digital infrastructure for businesses that have outgrown their
              website.
            </p>
          </div>

          <div className="hero__signal-bottom">
            <span>DESIGN</span>
            <span>CODE</span>
            <span>LOCAL</span>
          </div>
        </div>
      </section>

      <section className="outcomes" aria-label="Business outcomes">
        <p className="eyebrow">BUILT FOR BUSINESS</p>

        <div className="outcomes__grid">
          <div className="outcome">
            <strong>Fast</strong>
            <span>Performance-first development.</span>
          </div>

          <div className="outcome">
            <strong>Clear</strong>
            <span>Messaging customers actually understand.</span>
          </div>

          <div className="outcome">
            <strong>Local</strong>
            <span>Built around your market and customers.</span>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="services"
        aria-labelledby="services-heading"
      >
        <div className="section-intro">
          <p className="eyebrow">WHAT WE FIX</p>

          <h2 id="services-heading">
            Your website should solve problems, not create more of them.
          </h2>

          <p className="section-intro__description">
            Whether you are starting from scratch or inheriting a digital
            disaster, we can turn the mess into a system your business can
            actually use.
          </p>
        </div>

        <div className="services__list">
          <article className="service">
            <div className="service__number">01</div>

            <div className="service__main">
              <p className="service__label">REBUILD</p>

              <h3>Website Rehab</h3>

              <p>
                Your existing site is slow, outdated, hard to use, or simply
                embarrassing. We rebuild the experience without throwing away
                what still works.
              </p>
            </div>

            <div className="service__outcome">
              <span>RESULT</span>
              <strong>A site you are proud to send customers to.</strong>
            </div>
          </article>

          <article className="service">
            <div className="service__number">02</div>

            <div className="service__main">
              <p className="service__label">LAUNCH</p>

              <h3>New Websites</h3>

              <p>
                Starting with nothing is better than starting with the wrong
                thing. We build a focused digital home around your business,
                customers, and goals.
              </p>
            </div>

            <div className="service__outcome">
              <span>RESULT</span>
              <strong>A professional first impression that works.</strong>
            </div>
          </article>

          <article className="service">
            <div className="service__number">03</div>

            <div className="service__main">
              <p className="service__label">VISIBILITY</p>

              <h3>Local Presence</h3>

              <p>
                A beautiful website means very little if nobody can find it.
                We build the technical and content foundation for local
                discovery.
              </p>
            </div>

            <div className="service__outcome">
              <span>RESULT</span>
              <strong>A stronger path from local search to your business.</strong>
            </div>
          </article>

          <article className="service">
            <div className="service__number">04</div>

            <div className="service__main">
              <p className="service__label">SYSTEMS</p>

              <h3>Digital Infrastructure</h3>

              <p>
                Need forms, bookings, payments, e-commerce, integrations, or
                something custom? We can turn your website into an actual
                business tool.
              </p>
            </div>

            <div className="service__outcome">
              <span>RESULT</span>
              <strong>Less manual work and a system built around you.</strong>
            </div>
          </article>
        </div>
      </section>

      <section id="work" aria-labelledby="work-heading">
        <p>SELECTED WORK</p>

        <h2 id="work-heading">
          Better design is only useful when it produces better business.
        </h2>

        <p>
          Every project starts with the problem behind the website. We focus on
          clarity, credibility, usability, performance, and the actions you
          actually need customers to take.
        </p>

        <a href="#contact">Discuss your project</a>
      </section>

      <section id="contact" aria-labelledby="contact-heading">
        <p>START A PROJECT</p>

        <h2 id="contact-heading">
          Something on your website isn&apos;t working.
        </h2>

        <p>
          Tell us what is broken, outdated, confusing, or missing. We will help
          turn it into a clear project scope.
        </p>

        <a href="#quote">Get a project estimate</a>
      </section>

      <section id="quote" aria-labelledby="quote-heading">
        <p>PROJECT ESTIMATOR</p>

        <h2 id="quote-heading">Let&apos;s figure out what you actually need.</h2>

        <p>
          The interactive project estimator will help turn your goals into a
          practical starting scope.
        </p>
      </section>
    </main>
  );
}
