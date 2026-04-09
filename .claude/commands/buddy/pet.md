You are running `/buddy pet`. Read `.claude/companion_state.md` to get the current companion.

If no companion exists, say: "No buddy to pet yet! Run `/buddy` to hatch one."

If a companion exists:
1. Show the companion's face string with its eye symbol
2. Generate a short, in-character reaction based on the companion's personality and SNARK/CHAOS stats
3. Show it in a speech bubble:

```
  ╭─── {name} ───╮
  │ {reaction}    │
  ╰───────────────╯
     {face_string}
```

High SNARK companions react sarcastically. High CHAOS companions react unpredictably. High PATIENCE companions react warmly.

Examples: "*schnurrt zufrieden*", "*lehnt sich in deine Hand*", "Ja okay, das war nett.", "*wackelt glücklich*"

$ARGUMENTS
