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
                Add to your phone <span className="arrow">↓</span>
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
                  {l.detail} <span className="arrow">↗</span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <Link className="link-row" href="/">
              <span className="label">Portfolio</span>
              <span className="detail">
                Work and research <span className="arrow">→</span>
              </span>
            </Link>
          </li>
        </ul>
      </main>

      <footer className="card-end">Baltimore, MD</footer>
    </div>
  );
}
