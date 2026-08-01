import fs from "fs";
import path from "path";

export interface Sponsor {
  name: string;
  phrase?: string;
  href?: string;
  order?: number;
  eyebrow?: string;
}

export async function getSponsors(): Promise<Sponsor[]> {
  const dir = path.join(process.cwd(), "src", "content", "sponsors");
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    const sponsors: Sponsor[] = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      try {
        return JSON.parse(raw) as Sponsor;
      } catch (e) {
        return { name: file.replace(/\.json$/, ""), order: 999 } as Sponsor;
      }
    });
    sponsors.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return sponsors;
  } catch (e) {
    return [];
  }
}
