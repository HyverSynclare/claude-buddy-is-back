You are running `/buddy rename`. Read `.claude/companion_state.md`.

If no companion exists, say: "No buddy to rename! Run `/buddy` to hatch one."

If a companion exists:
1. Check if a new name was provided as argument: $ARGUMENTS
2. If no name provided, ask: "What should your buddy's new name be? (max 12 characters)"
3. If name provided, update the name in `.claude/companion_state.md`
4. Show confirmation:

```
  ╭─── {new_name} ───╮
  │ *responds to      │
  │  new name*        │
  ╰───────────────────╯
     {face_string}
```

Keep the name to max 12 characters, one word.

$ARGUMENTS
