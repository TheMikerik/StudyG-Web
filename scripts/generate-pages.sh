#!/usr/bin/env bash
# generate-pages.sh — StudyG flashcard page automation
# Invokes Claude Code CLI with the generation prompt.
# Run manually:  bash scripts/generate-pages.sh
# Force run:     bash scripts/generate-pages.sh --force

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT_FILE="$SCRIPT_DIR/generate-pages-prompt.md"
LOG_FILE="$SCRIPT_DIR/generate-pages.log"
TIMESTAMP_FILE="$SCRIPT_DIR/.last-run"
MIN_INTERVAL_SECONDS=21600  # 6 hours — prevents accidental double-runs

# ── Logging ───────────────────────────────────────────────────────────────────
log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }

# ── PATH: launchd has a minimal environment, source Homebrew + nvm manually ──
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

# ── Find Claude CLI ───────────────────────────────────────────────────────────
CLAUDE_BIN="$(command -v claude 2>/dev/null || true)"
if [[ -z "$CLAUDE_BIN" ]]; then
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
  log "ERROR: claude CLI not found. Install: npm install -g @anthropic-ai/claude-code"
  exit 1
fi

log "Using claude at: $CLAUDE_BIN"

# ── 6-hour duplicate guard ─────────────────────────────────────────────────
FORCE=false
[[ "${1:-}" == "--force" ]] && FORCE=true

if [[ "$FORCE" == false && -f "$TIMESTAMP_FILE" ]]; then
  LAST_RUN=$(cat "$TIMESTAMP_FILE")
  NOW=$(date +%s)
  DIFF=$(( NOW - LAST_RUN ))
  if [[ $DIFF -lt $MIN_INTERVAL_SECONDS ]]; then
    MINS=$(( DIFF / 60 ))
    log "Skipping — last run was ${MINS}m ago (threshold: 360m). Use --force to override."
    exit 0
  fi
fi

# ── Run generation ────────────────────────────────────────────────────────────
log "Starting flashcard page generation..."

"$CLAUDE_BIN" \
  --print \
  --allowedTools "mcp__supabase__execute_sql" \
  --max-turns 30 \
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
