import fs from "node:fs";
import path from "node:path";

const repositoryRoot = process.cwd();
const sourcePath = path.join(repositoryRoot, "posicionamiento.md");
const targetPath = path.join(repositoryRoot, "agent", "posicionamiento.md");
const source = fs.readFileSync(sourcePath, "utf8").replace(/\r\n/g, "\n");
const match = source.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);

if (!match) {
  throw new Error("posicionamiento.md must contain YAML front matter.");
}

const playbook = match[1].trim();
const requiredSections = [
  "## Propósito",
  "## Estado vigente",
  "## 1. Activos preferidos",
  "## 2. Activos condicionales o tácticos",
  "## 3. Activos que no deberían formar parte del núcleo",
  "## 6. Reglas de actualización mensual",
];

for (const section of requiredSections) {
  if (!playbook.includes(section)) {
    throw new Error(`Missing Asset Playbook section: ${section}`);
  }
}

fs.writeFileSync(targetPath, `${playbook}\n`, "utf8");
console.log("Built the complete agent Asset Playbook.");
