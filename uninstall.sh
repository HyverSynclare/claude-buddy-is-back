#!/bin/bash
# claude-buddy-is-back uninstaller

CLAUDE_DIR="$HOME/.claude"

echo ""
echo "  ╭────────────────────────────────╮"
echo "  │  🦔 claude-buddy uninstaller   │"
echo "  ╰────────────────────────────────╯"
echo ""

read -p "  Remove buddy companion? (y/N) " confirm
[ "$confirm" != "y" ] && [ "$confirm" != "Y" ] && echo "  Cancelled." && exit 0

if [ -f "$CLAUDE_DIR/companion_state.md" ]; then
  mkdir -p "$HOME/urchin-backup"
  cp "$CLAUDE_DIR/companion_state.md" "$HOME/urchin-backup/companion_state_$(date +%Y-%m-%d)_final.md"
  echo "  💾 Final backup saved"
fi

rm -f "$CLAUDE_DIR/commands/buddy.md"
rm -rf "$CLAUDE_DIR/commands/buddy/"
rm -f "$CLAUDE_DIR/companion_state.md"
rm -f "$CLAUDE_DIR/hooks/rainbow.sh" "$CLAUDE_DIR/hooks/hatch_animation.sh" "$CLAUDE_DIR/hooks/backup.sh"

if [ -f "$CLAUDE_DIR/CLAUDE.md" ]; then
  sed -i '' '/<!-- BEGIN BUDDY COMPANION -->/,/<!-- END BUDDY COMPANION -->/d' "$CLAUDE_DIR/CLAUDE.md" 2>/dev/null
fi

echo "  👋 Buddy removed. Backup in ~/urchin-backup/"
echo ""
