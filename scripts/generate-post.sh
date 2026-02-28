#!/usr/bin/env bash
# generate-post.sh — StudyG blog automation
# Invokes Claude Code CLI with the generation prompt every 3 days.
# Run manually:  bash scripts/generate-post.sh
# Force run:     bash scripts/generate-post.sh --force

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/generate-post-prompt.md"
LOG_FILE="$SCRIPT_DIR/generate-post.log"
TIMESTAMP_FILE="$SCRIPT_DIR/.last-run"
INTERVAL_DAYS=3

# ── Logging ───────────────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

# ── PATH: launchd has a minimal environment, source Homebrew + nvm manually ──
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# ── Find Claude CLI ───────────────────────────────────────────────────────────
# After installing Claude Code (`npm install -g @anthropic-ai/claude-code`),
# update CLAUDE_BIN below if `which claude` returns a different path.
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [[ -z "$CLAUDE_BIN" ]]; then
  # Common fallback locations
  for candidate in \
    "$HOME/.npm-global/bin/claude" \
    "$HOME/.local/bin/claude" \
    "/opt/homebrew/bin/claude" \
    "/usr/local/bin/claude"; do
    if [[ -x "$candidate" ]]; then
      CLAUDE_BIN="$candidate"
      break
    fi
  done
fi

if [[ -z "$CLAUDE_BIN" ]]; then
  log "ERROR: claude CLI not found. Install it with: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

log "Using claude at: $CLAUDE_BIN"

# ── Timestamp guard (skip if last run was less than INTERVAL_DAYS ago) ────────
FORCE=false
[[ "${1:-}" == "--force" ]] && FORCE=true

if [[ "$FORCE" == false && -f "$TIMESTAMP_FILE" ]]; then
  LAST_RUN=$(cat "$TIMESTAMP_FILE")
  NOW=$(date +%s)
  DIFF=$(( (NOW - LAST_RUN) / 86400 ))
  if [[ $DIFF -lt $INTERVAL_DAYS ]]; then
    log "Skipping — last run was $DIFF day(s) ago (threshold: $INTERVAL_DAYS days). Use --force to override."
    exit 0
  fi
fi

# ── Run generation ────────────────────────────────────────────────────────────
log "Starting post generation..."

"$CLAUDE_BIN" \
  --print \
  --allowedTools "mcp__supabase__execute_sql" \
  --max-turns 20 \
  < "$PROMPT_FILE" \
  2>&1 | tee -a "$LOG_FILE"

EXIT_CODE=${PIPESTATUS[0]}

if [[ $EXIT_CODE -eq 0 ]]; then
  date +%s > "$TIMESTAMP_FILE"
  log "Done. Timestamp updated."
else
  log "ERROR: claude exited with code $EXIT_CODE. Timestamp NOT updated (will retry next run)."
  exit $EXIT_CODE
fi
