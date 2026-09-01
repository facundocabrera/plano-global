# Event publishing contract

GitHub is the canonical store for Event Ledger data.

## Daily update

1. Create or update `eventos/dias/YYYY/MM/YYYY-MM-DD.md` using `templates/event-day.md`.
2. Store every material finding from that run in the same daily file. Do not summarize away the causal analysis.
3. Keep `event_date`, the file name, `permalink`, and `event_titles` aligned.
4. Run `node scripts/build-event-ledger.mjs`.
5. Commit the canonical daily file and generated agent outputs together.
6. Push to `main`. GitHub Pages publishes the human index, daily page, and agent Markdown automatically.

Do not manually edit `eventos.md`, `agent/eventos.md`, or files under `agent/eventos/`. They are derived outputs.

The persistent local Ledger is no longer an independent write target. If a snapshot is needed, generate it from `agent/eventos.md` after the GitHub update.

## Asset Playbook

`posicionamiento.md` is the canonical Asset Playbook. Update it directly during a positioning review, then run `node scripts/build-asset-playbook.mjs`.

Do not manually edit `agent/posicionamiento.md`; it is a generated exact-content mirror.
