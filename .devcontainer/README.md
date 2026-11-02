# Devcontainer sandbox

Isolated Node 22 container for running Claude Code with `--dangerously-skip-permissions` safely.

## What's in here

- **Dockerfile** — Node 22.17.1 (matches CI), Chromium + chromedriver (for `npm run test:selenium`), Claude Code CLI, `node` user with passwordless sudo scoped to the firewall script only.
- **init-firewall.sh** — default-deny iptables/ipset egress policy. Only allows: Anthropic API, npm registry, GitHub, Debian package mirrors, Web3Forms (contact form), Google Analytics. Runs on container create and every start.
- **devcontainer.json** — mounts the repo at `/workspace`, forwards port 5173 (Vite dev server), adds `NET_ADMIN`/`NET_RAW` capabilities (required for the firewall rules), persists `~/.claude` config in a named volume across rebuilds.

## Usage

1. Open the repo in VS Code / Cursor and "Reopen in Container" (or `devcontainer up --workspace-folder .`).
2. Once inside, run Claude Code with full autonomy since the container's network is locked down:
   ```
   claude --dangerously-skip-permissions
   ```
3. `npm run dev` works as normal; forwarded on `localhost:5173`.

## Notes

- The firewall allowlist is IP-based (resolved at container start), not DNS-based — if a service rotates IPs mid-session, rerun `sudo /usr/local/bin/init-firewall.sh`.
- Add any new external host the project starts depending on to the `ALLOWED_DOMAINS` array in `init-firewall.sh`.
- This sandboxes *network egress*, not the filesystem — Claude Code can still read/write anything under `/workspace` (which is your full repo, bind-mounted). Don't put secrets in the repo tree if you don't want them touched.
