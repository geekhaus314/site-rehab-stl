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
            <div>
              <span className="chip">
                <span className="dot" aria-hidden="true" />
                St. Louis metro — both sides of the river
              </span>
              <h1 className="display" id="hero-heading">
                Your website should be getting you work.
              </h1>
              <p className="lede">
                If it is slow, out of date, or you would rather nobody saw it, I
                fix that. If there is no site, I build one — so people find you,
                choose you, and book you. Plumbers, roofers, HVAC.
              </p>
              <div className="hero-actions">
                <a className="btn btn-lg" href="#price">
                  What it costs
                </a>
                <a className="btn btn-lg btn-ghost" href="#work">
                  What I do
                </a>
              </div>
              <p className="form-note">
                From <strong>${studio.price.toLocaleString("en-US")}</strong>.
                Done in a few days. It is yours, and there is no monthly fee.
              </p>
            </div>
            <aside className="card hero-proof" aria-label="How the work starts">
              <p className="eyebrow">How this works</p>
              <h2 className="h3">
                I look at your site first, and tell you what is actually wrong.
              </h2>
              <p className="muted">
                I do not guess or sell you things you do not need. If your site
                is fine I will say so. If it is not, I will tell you which part
                is the problem, and what it costs to fix.
              </p>
              <p className="muted proof-note">
                If you are local I will come out and look at it properly. Happy
                to do the paperwork on paper — nothing to sign on a phone, no
                app, no account. And happy to work entirely remotely if that is
                easier.
              </p>
            </aside>
          </div>
        </section>

        <section className="section band" id="work" aria-labelledby="work-heading">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">What I do</span>
              <h2 className="h2" id="work-heading">
                Four things, and you only need one of them.
              </h2>
              <p className="lede">Most people need the first or the second. I will tell you which.</p>
            </div>
            <div className="svc-rows">
              {studio.services.map((service, index) => (
                <article className="svc-row" key={service.label}>
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
            <div className="sec-head">
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
              <article className="outcome">
                <b>No monthly fee</b>
                <span>
                  One price, once. There is no hosting bill, no domain bill and
                  no call in six months asking for another one.
                </span>
              </article>
              <article className="outcome">
                <b>It is yours</b>
                <span>
                  Yours on your own domain. If you ever want a different person
                  to take it over, they can. That is the point.
                </span>
              </article>
              <article className="outcome">
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
            <div className="sec-head">
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
            <div className="sec-head">
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
                <article className="work-row" key={project.title}>
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
            <div className="sec-head">
              <span className="eyebrow">Where</span>
              <h2 className="h2" id="where-heading">
                Based in Florissant. I come to you.
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
                <div className="area-group" key={area.name}>
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
            <div className="sec-head">
              <span className="eyebrow">Get in touch</span>
              <h2 className="h2" id="contact-heading">
                Send me the address. I will go and look at it.
              </h2>
              <p className="lede">
                You do not need to know what is wrong with it. That is the part
                I am for.
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
            <a className="brand" href="/" aria-label="Web Rehab STL home">
              <span className="brand-mark" aria-hidden="true">
                WR
              </span>
              <span>{studio.name}</span>
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
