You are running `/buddy hatch` to hatch a NEW companion, replacing the current one.

Read `.claude/companion_state.md`.

If a companion already exists:
1. Show a farewell message from the current companion
2. Say: "Releasing {name} into the wild..."

Then run the full hatching sequence (same as `/buddy` with no companion):

1. Pick random species, eye, hat, rarity (weighted), shiny (5%), stats (1-6 each)
2. Generate name and personality using the generation rules in CLAUDE.md
3. Display the egg cracking animation
4. Reveal the new companion with full ASCII art, stats, personality

Save the new companion to `.claude/companion_state.md`.

If the user provided arguments, try to honor them:
- Species name → use that species
- "shiny" → force shiny
- "legendary" → force legendary rarity

$ARGUMENTS
