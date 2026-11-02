import fs from "node:fs";
import path from "node:path";

const repositoryRoot = process.cwd();
const siteRoot = "https://facundocabrera.github.io/plano-global";
const sources = ["plano.md", "estado.md", "tracking.md"];
const reviewsDirectory = path.join(repositoryRoot, "revisiones");

if (fs.existsSync(reviewsDirectory)) {
  sources.push(...fs.readdirSync(reviewsDirectory)
    .filter((name) => name.endsWith(".md"))
    .map((name) => `revisiones/${name}`));
}

for (const source of sources) {
  const markdown = fs.readFileSync(path.join(repositoryRoot, source), "utf8");
  const match = markdown.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${source}`);

  const body = match[1]
    .replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, (_, url) => `${siteRoot}${url}`)
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>|<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n").map((line) => line.trimEnd()).join("\n")
    .replace(/\n{3,}/g, "\n\n").trim();

  if (/\{%|\{\{/.test(body)) throw new Error(`Unresolved Liquid: ${source}`);
  const target = path.join(repositoryRoot, "agent", source);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${body}\n`);
}

console.log(`Built ${sources.length} canonical agent document mirrors.`);
