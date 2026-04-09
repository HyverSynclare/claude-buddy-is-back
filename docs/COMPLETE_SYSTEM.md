# Buddy Companion System -- Complete Reference

Extracted from Claude Code v2.1.92 binary.

## Rarity System

| Rarity    | Chance | Stars       |
|-----------|--------|-------------|
| common    | 60%    | *           |
| uncommon  | 25%    | **          |
| rare      | 10%    | ***         |
| epic      | 4%     | ****        |
| legendary | 1%     | ***** |

## Species (18 total)

| #  | Species   |
|----|-----------|
| 1  | duck      |
| 2  | goose     |
| 3  | blob      |
| 4  | cat       |
| 5  | dragon    |
| 6  | octopus   |
| 7  | owl       |
| 8  | penguin   |
| 9  | turtle    |
| 10 | snail     |
| 11 | ghost     |
| 12 | axolotl   |
| 13 | capybara  |
| 14 | cactus    |
| 15 | robot     |
| 16 | rabbit    |
| 17 | mushroom  |
| 18 | chonk     |

## Eye Symbols

```
EYES = ["·", "✦", "×", "◉", "@", "°"]
```

Each companion gets a random eye symbol assigned at generation.

## Hats

| Hat ID    | ASCII          | Description        |
|-----------|----------------|--------------------|
| none      | (empty)        | No hat             |
| crown     | `\^^^/`        | Royal crown        |
| tophat    | `[___]`        | Top hat            |
| propeller | `-+-`          | Propeller beanie   |
| halo      | `(   )`        | Angel halo         |
| wizard    | `/^\`          | Wizard hat         |
| beanie    | `___`          | Knit beanie        |
| tinyduck  | `,>`           | Tiny duck on head  |

## Stats

Each companion has 5 stats, values 1-10:

| Stat      | Description                              |
|-----------|------------------------------------------|
| DEBUGGING | Ability to spot bugs                     |
| PATIENCE  | Tolerance for long builds/processes      |
| CHAOS     | Tendency toward chaotic suggestions      |
| WISDOM    | Quality of coding advice                 |
| SNARK     | Level of sarcastic commentary            |

Stats are rolled randomly, weighted by rarity (higher rarity = higher stat floor).

## Rainbow Color System

7 standard colors + 7 shimmer variants:

```
Standard:  red, orange, yellow, green, blue, indigo, violet
Shimmer:   shimmer_red, shimmer_orange, shimmer_yellow, shimmer_green,
           shimmer_blue, shimmer_indigo, shimmer_violet
```

Shimmer colors are legendary-only. The `rainbowText()` function cycles through standard colors character-by-character for display effects.

## Name Generation

Names are generated via API call to `buddy_companion` endpoint. If the API fails, a fallback pool is used.

### Inspiration Word Pool (150+ words)

Words are drawn from categories:

- **Food**: crumpet, soup, pickle, biscuit, gravy, turnip, waffle, mochi, dumpling, pretzel, noodle, tofu, truffle, pudding, cobbler, brioche, gnocchi, tempura, sorbet, muffin, scone, toffee, fudge, custard, ramen, churro
- **Nature**: moss, pebble, cloud, fern, dew, fog, creek, sprout, acorn, thistle, clover, bramble, lichen, reed, birch, ember, flint, coral, shell, dune, grove, meadow, boulder, creek, brook
- **Cozy**: blanket, button, candle, mitten, pillow, thimble, bobbin, spool, latch, cork, cobble, kindle, nestle, nook, hearth, quilt, stitch, patch, ribbon, locket
- **Whimsy**: wobble, bumble, tumble, fidget, trinket, widget, gizmo, doodle, wiggle, squish, plonk, boop, zonk, fizz, whisk, flutter, muddle, scuttle, waddle, toddle
- **Creatures**: moth, newt, wren, finch, stoat, shrew, dormouse, cricket, beetle, mantis, gecko, puffin, otter, badger, hedgehog, sparrow
- **Abstract**: glimmer, whisper, riddle, wonder, notion, whimsy, paradox, quirk, cipher, echo, muse, reverie, enigma, aurora, zenith

### Fallback Names

If API generation fails entirely:
```
["Crumpet", "Soup", "Pickle", "Biscuit", "Moth", "Gravy"]
```

## Companion Data Model

```json
{
  "name": "Urchin",
  "species": "blob",
  "rarity": "common",
  "stars": 1,
  "eyes": "·",
  "hat": "none",
  "color": "green",
  "stats": {
    "debugging": 5,
    "patience": 7,
    "chaos": 3,
    "wisdom": 6,
    "snark": 8
  },
  "soul": "A gentle blob who quietly observes code and occasionally offers surprisingly deep insights about variable naming.",
  "createdAt": "2026-04-09T17:34:34.328Z",
  "sessionId": "88c4e3a7-9131-40d1-a014-2bf853ccadc3",
  "version": "2.1.92"
}
```

## /buddy Commands

| Command              | Description                                    |
|----------------------|------------------------------------------------|
| `/buddy`             | Show current companion info                    |
| `/buddy stats`       | Display companion stats card                   |
| `/buddy ascii`       | Show full ASCII art with hat and eyes           |
| `/buddy name`        | Show companion name and soul                   |
| `/buddy react`       | Force a reaction (respects cooldown)           |
| `/buddy colors`      | Show rainbow color demo                        |
| `/buddy rare`        | Show rarity info and star rating               |

## Availability Check

```javascript
function isCompanionAvailable() {
  // Requires:
  // 1. firstParty authentication (Anthropic account)
  // 2. Date >= April 2026
  // 3. Feature flag tengu_miraculo_the_bard === true
  // Checked via h_() utility function
  return isFirstPartyAuth() && isDateAfterApril2026() && h_("tengu_miraculo_the_bard");
}
```

The companion system only activates for first-party authenticated users after April 2026, gated behind the `tengu_miraculo_the_bard` feature flag.
