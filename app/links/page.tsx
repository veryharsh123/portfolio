import type { Metadata } from "next";
import Link from "next/link";
import Lamp from "../Lamp";
import PhoneRow from "./PhoneRow";
import { COLOC, GITHUB, LINKEDIN, NAME } from "@/lib/contact";

// One page to hand people: a QR code or a link in a bio points here.

export const metadata: Metadata = {
  title: `${NAME} · Links`,
  description: "Save my contact, or find me on LinkedIn, GitHub and Coloc.",
  alternates: { canonical: "/links" },
};

const LINKS = [
  { label: "LinkedIn", detail: "in/veryharsh", href: LINKEDIN },
  { label: "GitHub", detail: "veryharsh123", href: GITHUB },
  { label: "Coloc", detail: "colocweb.com", href: COLOC },
];

// Drawn rather than typed: phones turn the arrow characters into emoji.
const ARROWS = {
  down: "M8 3v10M4 9l4 4 4-4",
  out: "M4 12l8-8M5.5 4H12v6.5",
  right: "M3 8h10M9 4l4 4-4 4",
};

function Arrow({ to }: { to: keyof typeof ARROWS }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d={ARROWS[to]} />
    </svg>
  );
}

export default function Links() {
  return (
    <div className="wrap narrow">
      <header className="top">
        <Link className="name" href="/">
          {NAME}
        </Link>
        <Lamp />
      </header>

      <main className="card">
        <p className="bio">Full-stack engineer and MSE student at Johns Hopkins. I build and run Coloc.</p>

        <ul className="link-list">
          <li>
            <a className="link-row primary" href="/contact.vcf">
              <span className="label">Save my contact</span>
              <span className="detail">
                Add to your phone <Arrow to="down" />
              </span>
            </a>
          </li>
          <li>
            <PhoneRow />
          </li>
          {LINKS.map((l) => (
            <li key={l.label}>
              <a className="link-row" href={l.href}>
                <span className="label">{l.label}</span>
                <span className="detail">
                  {l.detail} <Arrow to="out" />
                </span>
              </a>
            </li>
          ))}
          <li>
            <Link className="link-row" href="/">
              <span className="label">Portfolio</span>
              <span className="detail">
                Work and research <Arrow to="right" />
              </span>
            </Link>
          </li>
        </ul>
      </main>

      <footer className="card-end">Baltimore, MD</footer>
    </div>
  );
}
