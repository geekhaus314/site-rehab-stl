import Image from "next/image";

import { ProjectEstimator } from "@/components/project-estimator";
import { SiteHeader } from "@/components/site-header";
import { studio } from "@/lib/studio-data";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: studio.name,
  description: studio.description,
  url: studio.site,
  email: studio.email,
  founder: { "@type": "Person", name: studio.founder },
  address: {
    "@type": "PostalAddress",
    addressLocality: studio.city,
    addressRegion: "MO",
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "St. Louis" },
    { "@type": "City", name: "Florissant" },
    { "@type": "City", name: "St. Charles" },
    { "@type": "City", name: "O'Fallon" },
    { "@type": "City", name: "Belleville" },
    { "@type": "City", name: "Edwardsville" },
    { "@type": "AdministrativeArea", name: "St. Louis County" },
    { "@type": "AdministrativeArea", name: "St. Charles County" },
    { "@type": "AdministrativeArea", name: "Metro East Illinois" },
  ],
  priceRange: "$1,200+",
  makesOffer: [
    "New website build",
    "Website repair and speed work",
    "Local search setup",
    "Bookings, quotes and payments",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="chip">
                <span className="dot" aria-hidden="true" />
                Independent web help · St. Louis metro
              </span>
              <h1 className="display" id="hero-heading">
                Your local business deserves a website that{" "}
                <span className="display-accent">works as hard as you do.</span>
              </h1>
              <p className="lede">
                You work directly with me—not an agency or a rotating cast of
                account managers. I build and fix websites for the locally owned
                businesses that keep St. Louis moving, so the right customers
                can find you, trust you, and get in touch.
              </p>
              <div className="hero-actions">
                <a className="btn btn-lg" href="#contact">
                  Talk it through
                </a>
                <a className="btn btn-lg btn-ghost" href="#work">
                  See what I do
                </a>
              </div>
              <p className="form-note">
                From <strong>${studio.price.toLocaleString("en-US")}</strong>.
                Clear scope. One person to call. No agency retainer.
              </p>
            </div>
            <aside className="card hero-proof" aria-label="Working together">
              <p className="eyebrow">Local work. Direct contact.</p>
              <h2 className="h3">
                You talk to the person doing the work.
              </h2>
              <p className="muted">
                I will look at what you have, explain what is worth fixing, and
                give you a clear price before we start. If your site is fine,
                I will tell you that too.
              </p>
              <p className="muted proof-note">
                Around St. Louis, I can come meet you in person. Prefer to keep
                it simple? We can do the whole thing by phone and email—no app,
                account, or sales presentation.
              </p>
              <figure className="hero-proof__art">
                <Image
                  src="/brand/field-notes.svg"
                  alt=""
                  width={640}
                  height={440}
                  priority
                />
                <figcaption>A clear plan starts with a proper look.</figcaption>
              </figure>
            </aside>
          </div>
        </section>

        <section className="section band" id="work" aria-labelledby="work-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">What I do</span>
              <h2 className="h2" id="work-heading">
                Four things, and you only need one of them.
              </h2>
              <p className="lede">Most people need the first or the second. I will tell you which.</p>
            </div>
            <div className="svc-rows">
              {studio.services.map((service, index) => (
                <article className="svc-row" key={service.label} data-reveal>
                  <div className="svc-row__n">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <p className="svc-row__label">{service.label}</p>
                    <h3>{service.title}</h3>
                    <p className="svc-row__body">{service.body}</p>
                  </div>
                  <div className="svc-row__outcome">
                    <b>What changes</b>
                    <span>{service.outcome}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="price" aria-labelledby="price-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">Price</span>
              <h2 className="h2" id="price-heading">
                One price, up front, and it does not go up afterwards.
              </h2>
              <p className="lede">
                A new site is ${studio.price.toLocaleString("en-US")}. Fixing
                one that already exists is $900–$1,600, depending on how much
                of it is worth keeping. Bookings, quotes and payments are
                quoted separately, because that depends on what you already
                use.
              </p>
            </div>
            <div className="outcomes">
              <article className="outcome" data-reveal>
                <b>No agency retainer</b>
                <span>
                  The build is a one-time project price, not a monthly design
                  retainer. Any domain or hosting costs stay in your name and
                  are discussed up front.
                </span>
              </article>
              <article className="outcome" data-reveal>
                <b>It is yours</b>
                <span>
                  Your domain, content, and accounts stay in your name. If you
                  ever want another developer, they can take it over.
                </span>
              </article>
              <article className="outcome" data-reveal>
                <b>Days, not months</b>
                <span>
                  Most are done in a few days. I only start once I have your
                  details, and I will tell you if I am waiting on you.
                </span>
              </article>
            </div>
          </div>
        </section>

        <section className="section band" id="estimate" aria-labelledby="estimate-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">What would this cost you</span>
              <h2 className="h2" id="estimate-heading">
                Four questions and I will tell you roughly where you land.
              </h2>
              <p className="lede">
                No email, no phone number, nothing saved. It just tells you
                roughly what this costs.
              </p>
            </div>
            <ProjectEstimator />
            <p className="form-note estimator-note">
              The estimate is for the work, not for made-up revenue, traffic or
              conversions. The real number comes after I have looked at your
              site.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="done-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">Built and live</span>
              <h2 className="h2" id="done-heading">
                Three things I can show you.
              </h2>
              <p className="lede">
                Real sites, real screenshots, and links you can open yourself.
                Two are work for family — I would rather say that than let you
                assume they are paying clients.
              </p>
            </div>
            <div className="work-rows">
              {studio.projects.map((project) => (
                <article className="work-row" key={project.title} data-reveal>
                  <div className="work-row__shots">
                    {project.shots.map((shot, index) => (
                      <picture className="work-row__pic" key={shot.name}>
                        <source
                          type="image/avif"
                          srcSet={`/shots/${shot.name}.avif`}
                        />
                        <img
                          className="work-row__shot"
                          src={`/shots/${shot.name}.webp`}
                          alt={shot.alt}
                          width="1000"
                          height="625"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </picture>
                    ))}
                  </div>
                  <div className="stack">
                    <h3>{project.title}</h3>
                    <p>{project.body}</p>
                    <a
                      className="work-row__link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.link} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section band" id="where" aria-labelledby="where-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">Where</span>
              <h2 className="h2" id="where-heading">
                Based in Florissant. Here for local businesses.
              </h2>
              <p className="lede">
                Both sides of the river — the counties around St. Louis, out
                past Warrenton, and over into Illinois. If you are local I will
                come out and sit down and talk it through, in person, before
                you spend anything. If you are further away we do it the way
                that suits you — phone, email, or a video call.
              </p>
            </div>
            <div className="area-groups">
              {studio.areas.map((area) => (
                <div className="area-group" key={area.name} data-reveal>
                  <h3 className="area-group__label">{area.name}</h3>
                  <div className="areas">
                    {area.places.map((place) => (
                      <span className="area" key={place}>
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-heading">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="eyebrow">Get in touch</span>
              <h2 className="h2" id="contact-heading">
                Talk directly to the person who will do the work.
              </h2>
              <p className="lede">
                Send me your website or tell me what you are trying to get done.
                I will give you a straight answer—no pitch, no pressure.
              </p>
              <div className="hero-actions">
                <a className="btn btn-lg" href={`mailto:${studio.email}`}>
                  Email {studio.email}
                </a>
              </div>
              <p className="form-note">
                {studio.founder} ·{" "}
                <a href={studio.site}>{studio.site.replace(/^https:\/\//, "")}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="stack">
            <a className="brand" href="/" aria-label={`${studio.name} home`}>
              <Image
                className="brand__logo"
                src="/brand/web-rehab-stl.svg"
                alt=""
                width={456}
                height={88}
              />
            </a>
            <p>
              {studio.founder} — {studio.city}, Missouri
            </p>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
          </div>
          <nav className="stack" aria-label="Services">
            <strong>What I do</strong>
            <a href="#work">Fix a site that does not work</a>
            <a href="#work">Build a new site</a>
            <a href="#work">Get found when people search</a>
            <a href="#work">Bookings, quotes, payments</a>
          </nav>
          <div className="stack">
            <strong>About this page</strong>
            <p>
              Everything on it is true or it is not there. No made-up numbers,
              no testimonials I have not been given, no “clients” who were
              really just examples. If a figure on here is wrong, tell me and I
              will fix it.
            </p>
            <p className="footer-aside">
              A few more things I build:{" "}
              <a href="https://pwn4g3.pages.dev">pwn4g3.pages.dev</a>
            </p>
          </div>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
