You are running the `/buddy` companion command. Read the companion state file at `.claude/companion_state.md` first.

**If no companion exists yet (state file says `status: none`):**

Run the HATCHING sequence:

1. Pick a random species from: duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk
2. Pick a random eye symbol from: · ✦ × ◉ @ °
3. Pick a random hat from: none, crown, tophat, propeller, halo, wizard, beanie, tinyduck (70% chance of none)
4. Roll rarity with weights: common (60%), uncommon (25%), rare (10%), epic (4%), legendary (1%)
5. Roll shiny: 5% chance
6. Generate 5 stats (DEBUGGING, PATIENCE, CHAOS, WISDOM, SNARK) each 1-6
7. Pick 5 random inspiration words from the pool in CLAUDE.md
8. Generate a name: ONE word, max 12 chars, memorable, slightly absurd
9. Generate a personality: one sentence, specific, funny, a quirk about how they comment on code

Display the hatching animation as text:
```
    _____
   /     \
  /  . .  \
 |   ___   |
  \ /   \ /
   \_____/

  *crack*... *crack*...
```

Then reveal the companion with its ASCII art, name, rarity stars, species, hat, stats, and personality. Use the species ASCII art templates from CLAUDE.md.

If shiny, add sparkle markers around the name.

**Save the companion** by updating `.claude/companion_state.md` with all the data.

**If a companion already exists:**
Show the companion's status — ASCII art, name, rarity, personality, stats. Say "Your buddy is here! Use `/buddy pet`, `/buddy off`, `/buddy status`, `/buddy rename`, or `/buddy hatch` for a new one."

$ARGUMENTS
