#!/bin/bash
# Daily backup of companion state
# Add to crontab: 0 9 * * * /path/to/hooks/backup.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
STATE_FILE="$PROJECT_DIR/.claude/companion_state.md"
BACKUP_DIR="$HOME/urchin-backup"
DATE=$(date +%Y-%m-%d)

if [ ! -f "$STATE_FILE" ]; then
  echo "No companion state to back up."
  exit 0
fi

mkdir -p "$BACKUP_DIR"
cp "$STATE_FILE" "$BACKUP_DIR/companion_state_${DATE}.md"
ls -t "$BACKUP_DIR"/companion_state_*.md 2>/dev/null | tail -n +31 | xargs rm -f 2>/dev/null

cat > "$BACKUP_DIR/RESTORE.md" << 'RESTORE'
# Urchin Companion — Backup Restore

## Quick Restore
```bash
ls -t ~/urchin-backup/companion_state_*.md | head -1
cp ~/urchin-backup/companion_state_YYYY-MM-DD.md /path/to/project/.claude/companion_state.md
```

## Full Restore
1. Clone the repo again: `git clone <repo-url>`
2. Copy the backup state into `.claude/companion_state.md`
3. Open Claude Code in the project directory
4. Run `/buddy status` to verify your companion is back
RESTORE

echo "Backup saved to $BACKUP_DIR/companion_state_${DATE}.md"
