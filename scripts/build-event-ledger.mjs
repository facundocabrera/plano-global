import fs from "node:fs";
import path from "node:path";

const repositoryRoot = process.cwd();
const dailyRoot = path.join(repositoryRoot, "eventos", "dias");
const agentDailyRoot = path.join(repositoryRoot, "agent", "eventos");
const introductionPath = path.join(repositoryRoot, "eventos", "contexto", "introduccion.md");
const tailPath = path.join(repositoryRoot, "eventos", "contexto", "cierre.md");

const dailyFiles = collectMarkdownFiles(dailyRoot)
  .map(readDailyFile)
  .sort((left, right) => right.date.localeCompare(left.date));

if (dailyFiles.length === 0) {
  throw new Error("No canonical daily event files were found.");
}

const duplicateDates = findDuplicates(dailyFiles.map((file) => file.date));
if (duplicateDates.length > 0) {
  throw new Error(`Duplicate daily event dates: ${duplicateDates.join(", ")}`);
}

fs.mkdirSync(agentDailyRoot, { recursive: true });
for (const entry of fs.readdirSync(agentDailyRoot, { withFileTypes: true })) {
  if (entry.isFile() && /^\d{4}-\d{2}-\d{2}\.md$/.test(entry.name)) {
    fs.rmSync(path.join(agentDailyRoot, entry.name));
  }
}

for (const dailyFile of dailyFiles) {
  fs.writeFileSync(
    path.join(agentDailyRoot, `${dailyFile.date}.md`),
    `${dailyFile.body.trim()}\n`,
    "utf8",
  );
}

const introduction = fs.readFileSync(introductionPath, "utf8").trimEnd();
const tail = fs.readFileSync(tailPath, "utf8").trim();
const eventSections = dailyFiles
  .map((dailyFile) => dailyFile.body.slice(dailyFile.body.indexOf("### ")).trim())
  .join("\n\n---\n\n");
const consolidated = [
  introduction,
  "",
  "## Eventos consolidados",
  "",
  eventSections,
  "",
  tail,
  "",
].join("\n");

fs.writeFileSync(path.join(repositoryRoot, "agent", "eventos.md"), consolidated, "utf8");

const eventCount = dailyFiles.reduce((count, file) => count + file.eventTitles.length, 0);
console.log(`Built ${dailyFiles.length} daily agent files and a ledger with ${eventCount} events.`);

function collectMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectMarkdownFiles(fullPath);
    }
    return entry.isFile() && entry.name.endsWith(".md") ? [fullPath] : [];
  });
}

function readDailyFile(filePath) {
  const markdown = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing YAML front matter: ${filePath}`);
  }

  const frontMatter = match[1];
  const body = match[2];
  const date = readScalar(frontMatter, "event_date");
  const titlesValue = readScalar(frontMatter, "event_titles");
  const eventTitles = JSON.parse(titlesValue);
  const expectedFileName = `${date}.md`;

  if (path.basename(filePath) !== expectedFileName) {
    throw new Error(`File name and event_date differ: ${filePath}`);
  }
  if (!Array.isArray(eventTitles) || eventTitles.length === 0) {
    throw new Error(`event_titles must contain at least one title: ${filePath}`);
  }

  const actualTitles = [...body.matchAll(/^### (.+)$/gm)].map((item) => item[1].trim());
  if (JSON.stringify(actualTitles) !== JSON.stringify(eventTitles)) {
    throw new Error(`event_titles does not match the event headings: ${filePath}`);
  }
  if (
    !body.includes("**Fuentes:**") &&
    !body.includes("**Fuente:**") &&
    !body.includes("**Fuente interna:**")
  ) {
    throw new Error(`No source section found: ${filePath}`);
  }

  return { filePath, date, eventTitles, body };
}

function readScalar(frontMatter, key) {
  const match = frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!match) {
    throw new Error(`Missing front matter field: ${key}`);
  }
  return match[1].trim();
}

function findDuplicates(values) {
  const seen = new Set();
  return [...new Set(values.filter((value) => seen.size === seen.add(value).size))];
}
