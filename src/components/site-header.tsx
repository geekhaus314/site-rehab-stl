export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-header__nav" aria-label="Main navigation">
        <a className="site-header__brand" href="/" aria-label="Site Rehab STL home">
          <span className="site-header__mark" aria-hidden="true">
            SR
          </span>

          <span>Site Rehab STL</span>
        </a>

        <div className="site-header__links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Start a project</a>
        </div>
      </nav>
    </header>
  );
}
