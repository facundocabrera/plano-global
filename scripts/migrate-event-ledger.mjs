import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];

if (!sourcePath) {
  throw new Error("Usage: node scripts/migrate-event-ledger.mjs <event-ledger.md>");
}

const repositoryRoot = process.cwd();
const ledger = fs.readFileSync(path.resolve(sourcePath), "utf8").replace(/\r\n/g, "\n");
const eventsMarker = "## Eventos consolidados";
const tailMarker = "## Lectura conjunta provisional";
const eventsStart = ledger.indexOf(eventsMarker);
const tailStart = ledger.indexOf(tailMarker);

if (eventsStart < 0 || tailStart < 0 || tailStart <= eventsStart) {
  throw new Error("The source ledger does not contain the expected event boundaries.");
}

const introduction = ledger.slice(0, eventsStart).trimEnd();
const eventBlock = ledger.slice(eventsStart + eventsMarker.length, tailStart).trim();
const tail = ledger.slice(tailStart).trimEnd();
const headingPattern = /^### (.+)$/gm;
const matches = [...eventBlock.matchAll(headingPattern)];

if (matches.length === 0) {
  throw new Error("No event headings were found in the source ledger.");
}

const events = matches.map((match, index) => {
  const start = match.index;
  const end = matches[index + 1]?.index ?? eventBlock.length;
  let markdown = eventBlock.slice(start, end).trim().replace(/\n---\s*$/, "").trimEnd();
  const title = match[1].trim();
  const dates = [...title.matchAll(/\d{4}-\d{2}-\d{2}/g)].map((item) => item[0]);
  const recordDate = dates.at(-1) ?? inferStructuralRecordDate(title);

  if (!markdown.includes("**Fuentes:**") && !markdown.includes("**Fuente:**")) {
    markdown += "\n\n**Fuente interna:** actualización conceptual registrada en el Plano Global.";
  }

  return { title, recordDate, markdown };
});

const groupedEvents = Map.groupBy(events, (event) => event.recordDate);
const dailyRoot = path.join(repositoryRoot, "eventos", "dias");
fs.mkdirSync(dailyRoot, { recursive: true });

for (const [recordDate, dailyEvents] of groupedEvents) {
  const [year, month] = recordDate.split("-");
  const directory = path.join(dailyRoot, year, month);
  const filePath = path.join(directory, `${recordDate}.md`);
  const titles = dailyEvents.map((event) => event.title);
  const frontMatter = [
    "---",
    "layout: default",
    `title: \"Event Ledger — ${recordDate}\"`,
    `description: \"Eventos macroeconómicos registrados el ${recordDate}.\"`,
    `eyebrow: \"Event Ledger · ${recordDate}\"`,
    `permalink: /eventos/${recordDate}/`,
    "event_day: true",
    `event_date: ${recordDate}`,
    `event_titles: ${JSON.stringify(titles)}`,
    "---",
    "",
  ].join("\n");
  const body = [
    `# Eventos registrados el ${recordDate}`,
    "",
    `<p class=\"lead\">${dailyEvents.length} ${dailyEvents.length === 1 ? "evento consolidado" : "eventos consolidados"}. Fuente canónica del Event Ledger.</p>`,
    "",
    dailyEvents.map((event) => event.markdown).join("\n\n---\n\n"),
    "",
  ].join("\n");

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, frontMatter + body, "utf8");
}

const contextDirectory = path.join(repositoryRoot, "eventos", "contexto");
fs.mkdirSync(contextDirectory, { recursive: true });
fs.writeFileSync(path.join(contextDirectory, "introduccion.md"), `${introduction}\n`, "utf8");
fs.writeFileSync(path.join(contextDirectory, "cierre.md"), `${tail}\n`, "utf8");

console.log(`Migrated ${events.length} events into ${groupedEvents.size} daily files.`);

function inferStructuralRecordDate(title) {
  if (title.includes("2022–2026") && title.includes("oro")) {
    return "2026-08-20";
  }

  throw new Error(`Cannot infer a record date for event: ${title}`);
}
