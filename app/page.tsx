import Image from "next/image";
import ContributionGraph from "./ContributionGraph";

const EMAIL = "harshahuja1179@gmail.com";
const GITHUB = "https://github.com/veryharsh123";
const LINKEDIN = "https://linkedin.com/in/veryharsh";

// Real commit subjects from the Coloc repo, lightly reworded for people who
// have never seen the codebase.
const SHIPPED = [
  { date: "Oct 2", text: "Made chat feel instant: messages show the moment you send them" },
  { date: "Aug 21", text: "Images are served at the size they are displayed, not the size they were uploaded" },
  { date: "Aug 21", text: "Search and category filters on the marketplace" },
  { date: "Aug 6", text: "People choose who they see on Discover" },
  { date: "Jul 16", text: "Fixed a Safari crash by shrinking profile photos before moderation" },
];

const EXPERIENCE = [
  {
    when: "Jan 2026 to now",
    role: "Graduate Research Assistant",
    org: "Sports Analytics Research Group, Johns Hopkins",
    text: "Built Python pipelines that turn game footage and stats into model-ready datasets, and trained a YOLOv8 detection model with transfer learning. My analysis of pitcher mechanics became scouting reports the JHU varsity coaches use.",
  },
  {
    when: "Jul to Sep 2025",
    role: "Software Engineer Intern",
    org: "Stratzi.ai (Vidarbha Infotech)",
    text: "Led the frontend of the MTDC government tourism platform in Next.js and TypeScript, used by 200+ agents for 500+ bookings a month. Built multi-level approvals with role-based access, which cut manual admin work by 60%.",
  },
  {
    when: "Jan to Apr 2025",
    role: "Full Stack Developer",
    org: "Botgo by Globtier Infotech",
    text: "Built the API layer for a production React and Node app with TypeScript, Prisma and MySQL, cutting response time by 35%. Set up CI/CD with GitHub Actions, cutting deploy time by 30%.",
  },
  {
    when: "Jul to Sep 2023",
    role: "Software Engineer Intern",
    org: "Vensysco Technologies",
    text: "Built backend services for an OTT streaming platform, including payments and a CMS, plus map features on the ArcGIS and Google Maps APIs.",
  },
];

const OTHER = [
  {
    when: "2026",
    title: "Health policy RAG system",
    text: "Answers questions over global health policy documents, with every claim cited to a source passage and a refusal when retrieval is weak. An evaluation harness measures retrieval quality and groundedness, which I used to pick the chunking and retrieval setup.",
  },
  {
    when: "2026",
    title: "SMILE Job Watcher",
    href: "https://github.com/veryharsh123/smile-job-watcher",
    text: "A Chrome extension that watches the Johns Hopkins student job portal, scores each new posting against your résumé with Gemini, and alerts you to the good ones. The portal has no notifications, so I made some.",
  },
];

const PUBLICATIONS = [
  {
    when: "Dec 2024",
    title: "Multimodal Dataset of Breast Cancer Diagnosis Using Deep Learning Techniques",
    text: "International Conference on AI and IoT in Management, Science and Technology.",
  },
  {
    when: "Dec 2023",
    title: "Enhancing Twitter Tweet Topic Understanding through Ensemble Learning",
    text: "IJITEE.",
  },
];

const EDUCATION = [
  {
    when: "Expected Dec 2027",
    title: "MSE, Computer Science, Johns Hopkins University",
    text: "Coursework in Machine Learning, Artificial Intelligence, Software System Design, Object-Oriented Software Engineering and Human-Computer Interaction. Won the Data Visualization track at HopHacks.",
  },
  {
    when: "2020 to 2024",
    title: "B.Tech, Computer Science and Engineering, Dr. A.P.J. Abdul Kalam Technical University",
  },
];

type Entry = { when: string; title: string; text?: string; href?: string };

function Entries({ items }: { items: Entry[] }) {
  return (
    <ul className="body rows entries">
      {items.map((e) => (
        <li key={e.title}>
          <span className="when">{e.when}</span>
          <div>
            <h3>{e.href ? <a href={e.href}>{e.title}</a> : e.title}</h3>
            {e.text && <p>{e.text}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

// Re-render at most once a day, so the contribution graph stays current.
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="wrap">
      <header className="top">
        <h1 className="name">Harsh Ahuja</h1>
        <nav aria-label="Contact">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={GITHUB}>GitHub</a>
          <a href={LINKEDIN}>LinkedIn</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="bio">
            Full-stack engineer and MSE student in Computer Science at Johns Hopkins, interested in ML research. I build
            and run Coloc, a campus app used by thousands of students.
          </p>
          <ContributionGraph />
        </section>

        <section className="block" aria-labelledby="coloc">
          <div className="label">
            <h2 id="coloc">Coloc</h2>
            <p>2024 to now</p>
          </div>
          <div className="body">
            <a className="shot" href="https://www.colocweb.com">
              <Image
                src="/coloc.jpg"
                alt="The Coloc home page: Swipe into campus life."
                width={2880}
                height={1800}
                sizes="(max-width: 760px) 100vw, 760px"
                priority
              />
            </a>
            <p>
              A verified network for college students. Every account belongs to one campus, a university email verifies
              you on the spot, and everyone you see goes to your school. Students use it to find roommates, buy and sell,
              split rides, and find people to do things with. It runs on the web and on iPhone.
            </p>
            <p>
              I built it and I run it: the React web app, the React Native iOS app, a Postgres backend on Supabase with
              row-level security and edge functions, image moderation, push notifications, email digests and product
              analytics.
            </p>
            <p>
              It launched at O.P. Jindal Global University in May 2026, and thousands of students have signed up since.
            </p>

            <h3>Recently shipped</h3>
            <ul className="rows">
              {SHIPPED.map((s) => (
                <li key={s.text}>
                  <span className="when">{s.date}</span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>

            <p className="links">
              <a href="https://www.colocweb.com">colocweb.com</a>
              <a href="https://www.colocweb.com/about">Why I started it</a>
            </p>
          </div>
        </section>

        <section className="block" aria-labelledby="experience">
          <div className="label">
            <h2 id="experience">Experience</h2>
          </div>
          <Entries items={EXPERIENCE.map((e) => ({ when: e.when, title: `${e.role}, ${e.org}`, text: e.text }))} />
        </section>

        <section className="block" aria-labelledby="other">
          <div className="label">
            <h2 id="other">Other work</h2>
          </div>
          <Entries items={OTHER} />
        </section>

        <section className="block" aria-labelledby="publications">
          <div className="label">
            <h2 id="publications">Publications</h2>
          </div>
          <Entries items={PUBLICATIONS} />
        </section>

        <section className="block" aria-labelledby="education">
          <div className="label">
            <h2 id="education">Education</h2>
          </div>
          <Entries items={EDUCATION} />
        </section>
      </main>

      <footer className="end">
        <p>
          The fastest way to reach me is <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
        <p className="small">Baltimore, MD</p>
      </footer>
    </div>
  );
}
