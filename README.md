# Blinkered dictionary: Basque

The Basque word list, and the evidence for every word in it.

Built by [`blinkered-attestation`](https://github.com/blinkered/blinkered-attestation). The rule,
the evidence format and the reasoning live there; what lives here is Basque.

**3,507 of 6,485 candidates proved, 54.1%**, across 6 independent
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
Internet Archive's Basque shelf, and Basque-language sites fetched directly (`zientzia.eus` and
`armiarma.eus` in this build). There is no Basque Gutenberg shelf and no Basque translation on
eBible. The Archive shelf is thin: 15 of the 119 texts read were legible enough to count, the rest
being Spanish, French or bad OCR stopped by the floor.

**The candidate list used to carry English.** The first build of this repository ran against a
7,417-word list validated partly on eu.wiktionary page titles, which is the `titles(x)` mistake
`SCRIPTS.md` describes, and about 200 ordinary English words shipped attested (THE, YOU, KNOW,
SCHOOL), because Basque text quotes English. The candidates have since been fixed in
`blinkered-attestation` (932 words removed, listed with the reason in `candidates/eu/english.tsv`),
and this build is from scratch against the 6,485 that remain. What is left in common with the top
of the English list is about fifty words, most of them loans that Basque spells the same way
(FILM, INTERNET, PIANO, HOTEL, RADIO) and were kept on purpose.

**Why from scratch rather than reused.** A rebuild that reuses recorded testimony carries every
word in the old evidence, including candidates that are no longer candidates. Rebuilt over the
fixed list with the old record in place, eight removed words still shipped on reused sightings
alone (AND, NEW, BOB, GAY). So every collection was fetched again and re-read. That is a fault in
the shared build and is reported there rather than patched here.

**Where the drop list points.** Of the 1,695 words one family short, 1,456 are attested by the
Archive and Wikipedia and nothing else. More Basque publishers would clear much of that: a
harvest over all seven reached 1,000 pages and raised the old list by six points, and is being
run again against this one.

**Tiles.** Every tile spells some shipped word; Q (once), W and Y (twice each) and Ñ (four times)
are the rarest.

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
