<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This repo holds two independent projects:

- Primary: the "Keep Waco Wagging" Next.js 16 web app at the repo root (Node `v22.14.0`, matches `.nvmrc`; package manager is npm). Standard scripts live in `package.json` (`dev`, `build`, `start`, `lint`, `typecheck`, `test`). `npm install` at the root is handled by the startup update script.
- Secondary/optional: the Python merch-launch toolkit in `merch-launch/` (dry-run by default).

Non-obvious notes:

- `npm run dev` / `npm run build` first run `optimize:photos`, which prints `No source photos found — skipping sync` here. That is expected (production/committed assets are used) and not an error. Dev server serves on `http://localhost:3000`.
- `npm test` uses Node's built-in test runner via `tsx` and needs no services/DB. Its glob only covers `src/lib/**/*.test.ts`, so tests elsewhere (e.g. `src/data/*.test.ts`) are not run by the default script.
- Supabase is optional for local dev. Lead-capture forms (newsletter, get-listed, contact, pets, sponsor, directory) call server routes that need `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`; without them, submissions return a graceful user-safe error instead of persisting (see `src/lib/leads.ts`). A dedicated hosted `keep-waco-wagging` Supabase project exists (service-role key is not retrievable via MCP — get it from the Supabase dashboard or a secret to exercise real lead capture). Run `supabase/schema.sql` to create the tables.
- The merch shop cart (`/shop`) is fully client-side (localStorage) and works with no backend — a good way to exercise core functionality without secrets.
- merch-launch setup is NOT in the update script. It needs the `python3.12-venv` system package once (`sudo apt-get install -y python3.12-venv`), then: `cd merch-launch && python3 -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt && cp -n .env.example .env`. Run the offline pipeline with `python scripts/generate_launch_report.py`; "BLOCKED_ARTWORK" and "No Printify token — skipping" are expected without artwork/tokens.
