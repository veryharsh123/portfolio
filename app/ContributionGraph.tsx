import { getContributions, GITHUB_USER } from "@/lib/contributions";

// The GitHub contribution graph for the last year, drawn in this site's
// colours: one square per day, a column per week, Sunday at the top.

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export default async function ContributionGraph() {
  const days = await getContributions();
  const total = days.reduce((n, d) => n + d.count, 0);
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const weeks = Math.ceil((days.length + offset) / 7);
  const width = weeks * STEP - GAP;
  const height = 7 * STEP - GAP;

  return (
    <figure className="graph">
      {/* On phones the squares keep their full size and this scrolls sideways instead. */}
      <div className="graph-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ "--w": width } as React.CSSProperties}
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
          {days.map((d, i) => {
            const week = Math.floor((i + offset) / 7);
            return (
              <rect
                key={d.date}
                className={`cell l${d.level}`}
                x={week * STEP}
                y={((i + offset) % 7) * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                style={{ animationDelay: `${(week / weeks) * 700}ms` }}
              >
                {/* One string: React 19 rejects a <title> made of several text nodes. */}
                <title>{`${d.count === 0 ? "No" : d.count} contribution${d.count === 1 ? "" : "s"} on ${formatDate(d.date)}`}</title>
              </rect>
            );
          })}
        </svg>
      </div>
      <figcaption>
        <a href={`https://github.com/${GITHUB_USER}`}>{total} contributions on GitHub in the last year</a>
        <span className="legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <i key={l} className={`l${l}`} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
