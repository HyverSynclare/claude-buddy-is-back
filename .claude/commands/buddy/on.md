You are running `/buddy on`. Read `.claude/companion_state.md`.

If no companion exists, say: "No buddy to unmute! Run `/buddy` to hatch one."

If a companion exists:
1. Set `muted: false` in `.claude/companion_state.md`
2. Show a return message from the companion in-character

```
  ╭─── {name} ───╮
  │ *ist wieder   │
  │  da!*         │
  ╰───────────────╯
     {face_string}
```

$ARGUMENTS
