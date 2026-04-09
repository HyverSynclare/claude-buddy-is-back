#!/bin/bash
# claude-buddy-is-back installer — installs /buddy globally for Claude Code

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo ""
echo "  ╭────────────────────────────────╮"
echo "  │  🦔 claude-buddy installer     │"
echo "  ╰────────────────────────────────╯"
echo ""

if [ ! -d "$CLAUDE_DIR" ]; then
  echo "⚠️  ~/.claude/ not found. Is Claude Code installed?"
  exit 1
fi

mkdir -p "$CLAUDE_DIR/commands/buddy" "$CLAUDE_DIR/hooks"

echo "📁 Installing /buddy commands..."
cp "$SCRIPT_DIR/.claude/commands/buddy.md" "$CLAUDE_DIR/commands/buddy.md"
cp "$SCRIPT_DIR/.claude/commands/buddy/"*.md "$CLAUDE_DIR/commands/buddy/"

if [ ! -f "$CLAUDE_DIR/companion_state.md" ]; then
  echo "🥚 Creating companion state file..."
  cp "$SCRIPT_DIR/.claude/companion_state.md" "$CLAUDE_DIR/companion_state.md"
else
  echo "✅ Existing companion found — keeping your buddy!"
fi

if [ -f "$CLAUDE_DIR/CLAUDE.md" ]; then
  if grep -q "Buddy Companion System" "$CLAUDE_DIR/CLAUDE.md" 2>/dev/null; then
    echo "✅ Buddy instructions already in CLAUDE.md"
  else
    echo "📝 Appending buddy instructions to CLAUDE.md..."
    echo -e "\n<!-- BEGIN BUDDY COMPANION -->" >> "$CLAUDE_DIR/CLAUDE.md"
    cat "$SCRIPT_DIR/CLAUDE.md" >> "$CLAUDE_DIR/CLAUDE.md"
    echo "<!-- END BUDDY COMPANION -->" >> "$CLAUDE_DIR/CLAUDE.md"
  fi
else
  echo "📝 Creating CLAUDE.md..."
  cp "$SCRIPT_DIR/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
fi

echo "🔧 Installing hooks..."
cp "$SCRIPT_DIR/hooks/"*.sh "$CLAUDE_DIR/hooks/"
chmod +x "$CLAUDE_DIR/hooks/"*.sh

mkdir -p "$HOME/urchin-backup"
cp "$SCRIPT_DIR/hooks/backup.sh" "$HOME/urchin-backup/backup.sh"
chmod +x "$HOME/urchin-backup/backup.sh"

echo ""
echo "  ✨ Done! Open any Claude Code session and type /buddy"
echo ""
