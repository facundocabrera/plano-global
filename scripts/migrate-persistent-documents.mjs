import fs from "node:fs";
import path from "node:path";

const sourceDirectory = process.argv[2];

if (!sourceDirectory) {
  throw new Error("Usage: node scripts/migrate-persistent-documents.mjs <source-directory>");
}

const repositoryRoot = process.cwd();
const assetPlaybookPath = path.join(sourceDirectory, "Plano Global - Asset Playbook.md");
const assetPlaybook = fs.readFileSync(assetPlaybookPath, "utf8").replace(/\r\n/g, "\n").trim();
const positioningFrontMatter = [
  "---",
  "layout: default",
  "title: Posicionamiento",
  "description: Activos preferidos, condicionales y fuera del núcleo según el Plano Global.",
  "eyebrow: Asset Playbook",
  "agent_url: /agent/posicionamiento.md",
  "permalink: /posicionamiento/",
  "---",
  "",
].join("\n");

fs.writeFileSync(
  path.join(repositoryRoot, "posicionamiento.md"),
  `${positioningFrontMatter}${assetPlaybook}\n`,
  "utf8",
);

const archiveDirectory = path.join(repositoryRoot, "archivo", "fuentes", "2026-07");
const historicalFiles = [
  "23-07-2026-el-mapa.txt",
  "PLANO_2026-2027_actualizado_2026-07-23.txt",
  "PLANO_2026-2027_con_dashboard_metricas.txt",
];

fs.mkdirSync(archiveDirectory, { recursive: true });
for (const fileName of historicalFiles) {
  fs.copyFileSync(path.join(sourceDirectory, fileName), path.join(archiveDirectory, fileName));
}

console.log(`Migrated the Asset Playbook and archived ${historicalFiles.length} historical sources.`);
