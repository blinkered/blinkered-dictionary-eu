# Blinkered dictionary: Basque

The Basque word list, and the evidence for every word in it.

Built by [`blinkered-attestation`](https://github.com/blinkered/blinkered-attestation). The rule,
the evidence format and the reasoning live there; what lives here is Basque.

**3,535 of 7,417 candidates proved, 47.7%**, across 6 independent
families, 5 of which a stranger could check by fetching.

## What is in this repository

```
sources.mjs        which collections attest Basque, and why those
ATTESTATIONS.tsv   the evidence: every candidate, what saw it, and where
words.txt          what survived, in Blinkered's own format
dropped.tsv        what did not, and how close it came
searched.tsv       publishers fetched directly: per page, which candidates it held and how often
SATURATION.md      what each family was worth, measured from the evidence
COLLECTIONS.md     every collection read, and where to get it again
status.json        the numbers, whether this ships, and what the list is under
```

`.cache/` holds the downloaded collections and is not tracked. Everything here is regenerable
with `pnpm build`.

## Where the words come from

Candidates come from Blinkered's Basque list, which lives in
[`blinkered-attestation/candidates/eu`](https://github.com/blinkered/blinkered-attestation/tree/main/candidates/eu).
The dictionaries that built it are demoted to **proposing words worth looking up**. What earns a
word its place here is evidence that it occurs in the world: three independent collections, each
recorded with a locator somebody else can fetch.

`SATURATION.md` says what each family was worth. `COLLECTIONS.md` names every collection read and
where to get it again, which is what makes the downloads disposable.

## What is particular to Basque

**The families.** Basque Wikipedia and Wikisource (one Wikimedia family), four small Leipzig
packages (a 2012 news crawl, 2019 and 2020 news and a 2011 web crawl, one family), Tatoeba, the
Internet Archive's Basque shelf, and two Basque-language sites fetched directly
(`zientzia.eus` and `armiarma.eus` so far). There is no Basque Gutenberg shelf and no Basque
translation on eBible. The Archive shelf is thin: 6 of the 36 texts read were legible enough to
count, the rest being Spanish, French or bad OCR stopped by the floor.

**The candidate list carries English, and the evidence cannot remove it.** Blinkered's Basque list
was validated partly against _eu.wiktionary page titles_, which is the `titles(x)` mistake
`SCRIPTS.md` describes: a Wiktionary documents every language, so THE, YOU, KNOW, THINK, GOOD and
SCHOOL are candidates here. Attestation then finds them, honestly, because Basque text quotes
English: song lyrics in a music magazine on the Archive shelf, film titles on Wikipedia, English
phrases in a science site's articles. About 200 of the shipped words are ordinary English words
from the top 3,000 of the English list (THE, AND, YOU, ARE, BUT, ALL, LIKE, ONE, TIME, WORLD,
HOUSE). Three collections did contain them; they are still not Basque. The fix belongs in the
candidate list, not here, and until it is made this list should not ship.

**Where the drop list points.** Of the 2,077 words one family short, 1,635 are attested by the
Archive and Wikipedia and nothing else, and 265 by Leipzig and Wikipedia. More Basque publishers
would clear much of both; the harvest reached only two of its seven domains before this build.

**Tiles.** Every tile spells some shipped word; Q (once) and Ñ (four times) are the rarest.

## Rebuilding

```
pnpm install
pnpm build        # reads whatever collections are in .cache/raw, reuses the record for the rest
pnpm conform      # the list says only what the evidence supports
pnpm saturation   # recomputes the curve and status.json
```

A collection that is not on disk is skipped with a warning and its recorded testimony is reused,
so a rebuild after more books arrive is short rather than a re-read of everything.

## Before this ships

`COMMON_CUT` in `sources.mjs` is carried over from Blinkered's old calibration against a
differently sized list. It has to be re-measured before this list reaches the game, and
`status.json` says `"ships": "pending"` until somebody decides otherwise. Nobody has yet played
the boards this list deals.

## Licensing

Three kinds of thing live here and they do not share terms. The distinction is the project: a
licence that claimed more than we can support would undo the argument the evidence is here to
make. [NOTICE](NOTICE) is the authority; this is the summary.

| | terms | what |
| --- | --- | --- |
| **Code and docs** | [Apache-2.0](LICENSE) | `build.mjs`, `sources.mjs`, `harvest.mjs`, `conform.mjs`, `saturation.mjs`, and the Markdown |
| **The list and its evidence** | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `words.txt`, the evidence, `status.json`, `SATURATION.md`, `COLLECTIONS.md`, `searched.tsv` |
| **The words we could not prove** | `CC-BY-SA-4.0` | `dropped.tsv`, which is **not ours to license** |

**Why the list is CC0.** A word ships because three independent collections of text were found to
contain it. The record of which collections, and where in them, is a statement of fact about those
texts rather than a copy of them, and nothing a licence governs was taken from the dictionary that
proposed the candidates.

**Why `dropped.tsv` is not.** It is the candidates that failed, and a candidate that failed is a
word we have nothing to say about except that somebody's dictionary proposed it. That makes the
file a subset of that dictionary and it carries that dictionary's terms, here `CC-BY-SA-4.0`.
