import fallback from "@/data/contributions-fallback.json";

export const GITHUB_USER = "veryharsh123";

export type Day = { date: string; count: number; level: number };

// GitHub's public contribution calendar: the same HTML fragment the profile
// page loads, so it needs no token. Refreshed at most once a day. If GitHub
// is down or changes the markup, we fall back to the snapshot in
// data/contributions-fallback.json (taken 2026-10-08).
export async function getContributions(): Promise<Day[]> {
  try {
    const res = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    const days = parse(await res.text());
    if (days.length < 300) throw new Error("Unexpected calendar markup");
    return days;
  } catch {
    return fallback as Day[];
  }
}

function parse(html: string): Day[] {
  const tips = new Map<string, string>();
  for (const [, id, text] of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    tips.set(id, text);
  }
  const days: Day[] = [];
  for (const [td] of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
    const date = td.match(/data-date="([\d-]+)"/)?.[1];
    const id = td.match(/id="([^"]+)"/)?.[1];
    const level = td.match(/data-level="(\d)"/)?.[1];
    if (!date || !id || !level) continue;
    const count = Number(tips.get(id)?.match(/^(\d+) contribution/)?.[1] ?? 0);
    days.push({ date, count, level: Number(level) });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}
