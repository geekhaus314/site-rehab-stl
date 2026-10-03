import Image from "next/image";

import { studio } from "@/lib/studio-data";

export function SiteHeader() {
  return (
    <header className="header">
      <nav className="wrap header-in" aria-label="Primary">
        <a className="brand" href="/" aria-label={`${studio.name} home`}>
          <Image
            className="brand__logo"
            src="/brand/web-rehab-stl.svg"
            alt=""
            width={456}
            height={88}
            priority
          />
        </a>
        <div className="nav">
          <a className="hide-sm" href="#work">What I do</a>
          <a className="hide-sm" href="#price">Price</a>
          <a className="hide-sm" href="#where">Where</a>
          <a className="btn" href={`mailto:${studio.email}`}>Email me</a>
        </div>
      </nav>
    </header>
  );
}
